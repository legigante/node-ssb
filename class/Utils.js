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
 * supprimer un Ã©lÃ©ment d'un array
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







Utils.getPrez = function(){
	return [
		{title: 'Un bac Ã  sable social',
		txt: "SSB, c'est un projet pour démocratiser l'accÃ¨s Ã  l'Intelligence Artificielle. SSB part d'un constat: l'intelligence artificielle est aujourd'hui en plein essor, mais trÃ¨s peu d'outils sont disponibles.<br> SSB, c'est un framework pour dÃ©velopper plus vite des applications plus pratiques. SSB propose de dÃ©velopper ces outils non seulement d'une maniÃ¨re performante, mais aussi pratique.<br> SSB, c'est l'infini des possibles Ã  la portÃ©e de tous. SSB veut donner les clefs Ã  n'importe qui pour crÃ©er facilement sa propre IA."},
		{title: 'Une petite page d\'histoire',
		txt: "SSB met Ã  contribution les mÃ©thodes du TAL pour construire une IA. Cette idÃ©e est ancienne:  en 1970 ca., le domaine de l'IA dÃ©chante: simuler un Ãªtre humain est bien plus complexe que prÃ©vu. Le TAL se distingue clairement de l'IA.<br> SSB a pour but de reprendre le problÃ¨me de l'IA fort des avancÃ©es du TAL: crÃ©ation pratique de ce qui ne pouvait Ãªtre que thÃ©orique. Voir l'IA de l'extÃ©rieur - selon la langue.<br> SSB est le descendant lointain d'Elisa (Stanford, 1960 ca.) : un projet qui mÃªmle l'IA et le TAL rendu pensable par un horizon des possibles qui s'Ã©largit."},
		{title: 'Un univers qui s\'aggrandit',
		txt: "De nombreuses firmes ont dÃ©jÃ  investi le secteur : Google (N-grams, Tensorflow, Alphago), Microsoft (TAY, Cortana), IBM (Watson) Viv (Siri), Aldebaran, wit.ai, Akinator...<br> Le domaine continue de grandir (citations) et est perÃ§u comme l'un des plus porteur du marchÃ© actuel.<br> Les produits actuellements commercialisÃ©s sont mon-tÃ¢ches: SSB propose de prendre le contrÃ´le en simplifiant l'accÃ¨s Ã  la technologie de pointe."},
		{title: 'Le modÃ¨le SSB',
		txt: "SSB s'articule en deux composants Ã©lÃ©mentaires: une librairie compilÃ©e, performante, mettant Ã  dispositions les algorithmes les plus efficaces et une API haut niveau pour faciliter le travail des dÃ©veloppeurs et simplifier la crÃ©ation et la gestion d'AI<br> La librairie comporte dÃ©jÃ  la chaÃ®ne d'outils nÃ©cessaire aux fonctionalitÃ©s minimales: on dispose d'algorithmes pour reprÃ©senter un texte en langue naturelle sous forme vectorielle<br> L'API haut niveau permettra de dÃ©velopper aisÃ©ment une multitude d'applications allant du text-reactive social gaming (B2C) Ã  l'assistance personnalisÃ©e (B2B).<br> Ces applications permettront de rÃ©cupÃ©rer de l'information (Data Crawling), et donneront un cadre prÃ©cis pour un sponsoring ciblÃ©, interactif, et Ã©volutif"},
		{title: 'Un avant goÃ»t plus concret',
		txt: "Lifeline, un jeu utilisant le mÃªme concept d'interactivitÃ© par texte, a Ã©tÃ© tÃ©lÃ©chargÃ© 6 millions de fois en un an. SSB donne les outils pour que l'interaction ne se limite pas Ã  un choix parmi quelques options.<br> Un proof of concept minimaliste sur l'utilisation des modÃ¨le TAL (B.o.W.) dans une tÃ¢che d'IR/data crawling"}
	]
}







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