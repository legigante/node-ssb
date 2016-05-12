/* ------------------------------------------------------------------------------------------------------------------------------- */
/* ------------------------------------------------------------------------------------------------------------------------------- */
/* FONCTIONS UTILES */
/* ------------------------------------------------------------------------------------------------------------------------------- */
/* ------------------------------------------------------------------------------------------------------------------------------- */

module.exports = Utils;

/**
 * Misc utility functions
 * @class Utils
 * @constructor
 */
function Utils(){}

/**
 * supprimer un élément d'un array
 *
 * @method arrayRemove
 * @param {array} array
 * @param {object} element
 *
 * @example
 *
 */
Utils.arrayRemove = function(array, element) {
    var idx = array.indexOf(element);
    if(idx!==-1){
		for (var i=idx, len=array.length-1; i < len; i++){
			array[i] = array[i + 1];
		}
		array.length = len;
    }
};

/**
 * Return current time hh:ii:ss
 *
 * @method getTimer
 *
 * @example
 *
 */
Utils.getTime = function () {
    var a = new Date();
    var str = (a.getHours()<10?'0':'')+a.getHours();
    str += ':'+(a.getMinutes()<10?'0':'')+a.getMinutes();
    str += ':'+(a.getSeconds()<10?'0':'')+a.getSeconds();
    return str;
};

/**
 * Return current date dd/mm/yyyy
 *
 * @method getDate
 *
 * @example
 *
 */
Utils.getDate = function () {
    var a = new Date();
    var str = a.getFullYear();
	str += '-'+(a.getMonth()<11?'0':'')+parseInt(a.getMonth()+1);
    str += '-'+(a.getDate()<10?'0':'')+a.getDate();
    return str;
};

/**
 * Return current date and time dd/mm/yyyy hh:ii:ss
 *
 * @method getDateTimer
 *
 * @example
 *
 */
Utils.getDateTime = function () {
    return this.getDate()+' '+this.getTime();
};







/**
 * console.log hh:ii:ss + msg
 *
 * @method printLog
 * @param {string} msg
 *
 * @example
 *
 */
Utils.printLog = function (msg) {
    console.log(this.getTime() + " " + msg);
};