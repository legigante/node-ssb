$(function() {
	
	var socket = io.connect('http://51.254.98.195:8080');
	
	$("#form_msg span.btn").click(function(){
		var el = $("#form_msg textarea");
		var txt = el.val();
		el.val('');
		if(txt!=''){
			msgTransmitter = {query: txt}
			socket.emit('new-query', msgTransmitter);
		}
	});
	
	socket.on('new-queryResError', function(res) {
		$("#log").html(JSON.stringify(res));
	});
	
	socket.on('new-queryResWho', function(res) {
		//$("#log").html(JSON.stringify(res));
		$("#queryres").html('<p>' + res.lemma + ' is liked by ' + res.nickname + '<br>How do I know that ? Let\'s see : </p>' + displayHisto(res.histo));
	});
	
	socket.on('new-queryResWhat', function(res) {
		//$("#log").html(JSON.stringify(res));
		$("#queryres").html('<p>' + res.nickname + ' likes ' + res.lemma + '<br>How do I know that ? Let\'s see : </p>' + displayHisto(res.histo));
	});
	
	function razRes(){
		$("#log").html('');
		$("#queryres").html('');
	}
	
	function displayHisto(histo){
		var i = 0;
		var arr = [];
		while(i<histo.length){
			arr.push('<span>' + histo[i].datetime + '</span><p>' + histo[i].msg + '</p>');
			i++;
		}
		return '<ul id="resWhatHisto"><li>' + arr.join('</li><li>') + '</li></ul>';
	}
	
});