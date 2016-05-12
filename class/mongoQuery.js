var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/test');

var Utils = require('./Utils');

module.exports = mongoQuery;


/*
Collection lemmas = liste des mots correspondant à un lemma
{
	_id: id,
	lemma: string,
	words: array
}

Collection users = user infos + count de lemmas
{
	_id: id,
	nickname: string,
	lemmas: [
		lemma: string,
		count: int
	]
}

Collection historic = histo des conversations
{
	_id: id,
	nickname: string,
	datetime: date,
	msg: string,
	direction: string: IN|OUT,
	lemmas: [string]
}

















/**
 * interface mongo query functions
 * @class mongoQuery
 * @constructor
 */
function mongoQuery(){}



	/**
	 * return histo
	 *
	 * @method getHisto
	 * @param {string} user nickname
	 * @param {function} callback
	 *
	 */
	mongoQuery.getHisto = function(user, cb){
		var collection = db.get('historic');
		var jsonR = {};
		collection.find({nickname: user}, ['datetime', 'msg', 'direction'], function(err,docs){
			cb(docs);
		});
	}




	/**
	 * return lemma with max count in a specific user document + all msg that contain this lemma
	 *
	 * @method getWhat
	 * @param {string} user nickname
	 * @param {function} callback
	 *
	 */
	mongoQuery.getWhat = function(user, cb){
		var collection = db.get('users');
		var jsonR = {};
		collection.col.aggregate([{$match: {nickname: user}}, {$project: {'lemmas.lemma':1}}, {$unwind:'$lemmas'}, {$sort:{'lemmas.count':-1}}, {$limit:1}], function(err,result) {
			jsonR.lemma = result[0].lemmas.lemma;
			collection = db.get('historic');
			collection.find({nickname: user, 'lemmas': jsonR.lemma}, ['datetime', 'msg'], function(err,docs){
				jsonR.histo = docs;
				cb(jsonR);
			});
		});
	}

	
	/**
	 * return user with max lemma occurence + histo
	 *
	 * @method getWho
	 * @param {string} lemma
	 * @param {function} callback
	 *
	 */
	mongoQuery.getWho = function(lemma, cb){
		var collection = db.get('users');
		var jsonR = {};

		collection.col.aggregate([{$match: {'lemmas.lemma': lemma}}, {$project: {nickname:1}}, {$sort:{'lemmas.count':-1}}, {$limit:1}], function(err,result) {
			if(typeof(result[0])=="undefined"){
				cb(false);
			}else{
				jsonR.nickname = result[0].nickname;
				collection = db.get('historic');
				collection.find({nickname: jsonR.nickname, 'lemmas': lemma}, {'datetime':1, 'msg':1}, function(err,docs){
					jsonR.histo = docs;
					cb(jsonR);
				});
			}

		});
	}


	/**
	 * return nb of found documents
	 *
	 * @method userExists
	 * @param {string} user's nickname
	 * @param {function} callback
	 *
	 */
	mongoQuery.userExists = function(user, cb){
		var collection = db.get('users');
		collection.find({nickname: user},function(e,docs){
			cb(docs.length);
		});
	}

	/**
	 * insert a user
	 *
	 * @method insertUser
	 * @param {string} user nickname
	 * @param {function} callback
	 *
	 */
	mongoQuery.insertUser = function(user, cb){
		var collection = db.get('users');
		collection.insert({nickname: user, lemmas: []});
		cb(null,null);
	}

	/**
	 * insert an histo and count lemmas if needed
	 *
	 * @method insertMsg
	 * @param {string} user nickname
	 * @param {"IN"|"OUT"} flux direction
	 * @param {string} txt
	 * @param {function} callback
	 *
	 */
	mongoQuery.insertMsg = function(user, direction, msg, cb){
		if(direction=='IN'){
			var arr = msg.split(' ');
			var json = [];
			var i = 0;
			var j = 0;
			while(i<arr.length){
				mongoQuery.getLemmaFromWord(arr[i], function(lemma){
					j++;
					if(!lemma==''){
						if(json.indexOf(lemma)<0){
							json.push(lemma);
						}
						// lemma in msg
						if(j==arr.length){
							var collection = db.get('historic');
							collection.insert({nickname: user, datetime: Utils.getDateTime(), direction: direction, msg: msg, lemmas: json});
							cb(null,null);
						}
						// count lemma user
						var collection = db.get('users');
						collection.find({nickname: user, 'lemmas.lemma': lemma}, function (err, docs){
							if(!docs.length){
								collection.update({nickname: user},{$push: {lemmas: {lemma: lemma, count: 1}}});
							}else{
								docs = docs[0];
								collection.update({'lemmas.lemma': lemma}, {$inc: {'lemmas.$.count': 1}});
							}
						});
					}
				});
				i++;
			}
		}else{
			var collection = db.get('historic');
			collection.insert({nickname: user, datetime: Utils.getDateTime(), direction: direction, msg: msg, lemmas: []});
			cb(null,null);
		}
	}

	/**
	 * get lemma from word (ignore un missing words)
	 *
	 * @method getLemmaFromWord
	 * @param {string} word
	 * @param {function} callback
	 * @return  lemma || ''
	 *
	 */
	mongoQuery.getLemmaFromWord = function(word,cb){
		var collection = db.get('lemmas');
		collection.find({"words": word}, function (err, docs){
			if(typeof(docs[0])=="undefined"){
				cb(word);
			}else{
				cb(docs[0].lemma);
			}
		});
	}


















/**
 * insert a lemma
 *
 * @method insertLemma
 * @param {string} lemma
 * @param {array} words
 *
 *//* // marche pas ?
mongoQuery.insertLemma = function(lemma, words, cb){
	var collection = db.get('lemmas');
	//collection.insert({'lemma': lemma, 'words': words});
	cb;
}*/

/**
 * Import un fichier de deux colonnes lemma / words
 * Créé un log des insertions taguées OK ou KO
 *
 * @param  sInputFile  input file path
 * @param  sDb  db name to load
 * @param  sCol  collection name to load
 * @param  sep1  column separator
 * @param  sep2  words separator
 * @param  sLogFile  log file path
 * @return  number of succesfully loaded rows
 */
mongoQuery.importLemmaFile = function(sInputFile,sDb,sCol,sep1,sep2){
	var fs = require("fs");
	
	var i = 1; // row counter
	var nRow = 0;
	
	fs.exists(sInputFile, onExists);
	
	function onExists(b){
		if(!b){
			console.log('File not found : ' + sInputFile);
			return 0;
		}
		fs.readFile(sInputFile, 'utf8', onReadFile);
	}
	
	function onReadFile(err,data,onFinish){
		if(err){
			console.log('File is not readable : ' + sInputFile);
			return 0;	
		}
		var bufferStringSplit;
		bufferStringSplit = data.toString().split('\r\n');

		// for each row
		while(nRow<bufferStringSplit.length){
			var input = bufferStringSplit[nRow];
			console.log(nRow + ' : ' + input);
			//convert json
			var lemma = input.split(sep1)[0];
			var words = input.split(sep1)[1].split(sep2);
			words.unshift(lemma);
			// insert
			insertLemma({"lemma":lemma,"words":words});
			nRow++;
		}
		onFinish;
	}
	
	function insertLemma(data, cb){
		var collection = db.get('lemmas');
		collection.insert(data);
		cb;
	}
}
