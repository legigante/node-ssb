var mongoQuery = require('./mongoQuery');

module.exports = UserInputHandler;

/**
 * Misc mongo query functions
 * @class UserInputHandler
 * @constructor
 */
function UserInputHandler(){}


/**
 * stock le nombre d'occurence de chaque lemme contenu dans l'input
 *
 * @method commentToJSON
 * @param {sring} user input
 *
 * @example
 *
 */

UserInputHandler.commentToJSON = function(str) {
    var newJSON = {};
    arr = str.split(" ").reduce(function(acc,word){
        return getLemma(word).then(function(output){
            if(output){
				console.log(output);
                if (typeof(newJSON[output])=="undefined") {
                    newJSON[output]=1;
                }else{
                    newJSON[output]+=1;
                }
            }
        });
    },Promise.resolve()).then(function(){
		console.log(JSON.stringify(newJSON));
			mongoQuery.insertStorage(newJSON);
    });

	function getLemma(input){
		return new Promise(function(resolve, reject){
		// call bdd
		mongoQuery.getLemmaFromWord(input,function(result){
			resolve(result);
		});
	  });
	}
}

 
 
