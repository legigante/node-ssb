$(function() {
	
	var socket = io.connect('http://51.254.98.195:8080');
	
	function Utils(){
		
	}
	
	Utils.prototype.getDate = function(){
		var a = new Date();
		var str = a.getFullYear();
		str += '-'+(a.getMonth()<11?'0':'')+parseInt(a.getMonth()+1);
		str += '-'+(a.getDate()<10?'0':'')+a.getDate();
		return str;
	}

	Utils.prototype.getTime = function () {
		var a = new Date();
		var str = (a.getHours()<10?'0':'')+a.getHours();
		str += ':'+(a.getMinutes()<10?'0':'')+a.getMinutes();
		str += ':'+(a.getSeconds()<10?'0':'')+a.getSeconds();
		return str;
	};

	Utils.prototype.getDateTime = function(){
		return this.getDate()+' '+this.getTime();
	}

	Utils = new Utils();
	
	
	chatHandler = function() {
		this.sendMsg = function(msg){
			this.cont.append('<li class="IN">'+msg.txt+'<br>'+Utils.getDateTime()+'</li>');
			$("#form_msg p").html('');
		}
		
		this.getMsg = function(msg){
			$("#form_msg p").html('writing...');
			var tempo = 500 + Math.random() * 200 * msg.txt.length;
			var that = this;
			setTimeout(function(){	
				that.cont.append('<li class="OUT">'+msg.txt+'<br>'+Utils.getDateTime()+'</li>');
				$("#form_msg p").html('');
			}, tempo);
		}
		
		this.appendChat = function(d, direction, msg){
			this.cont.append('<li class="'+direction+'">'+msg+'<br>'+d+'</li>');
		}
	}
	chatHandler.prototype.cont = $("#msg ul");
	
	// Interface mobile
	oChat = new chatHandler();

	
	
	
	
	
	
	
	
	
	var G_user = prompt('User:');
	if(!G_user==''){
		msgTransmitter = {user: G_user}
		socket.emit('new-identification', msgTransmitter);
		
		$("#form_msg span.btn").click(function(){
			var el = $("#form_msg textarea");
			var txt = el.val();
			el.val('');
			if(txt!=''){
				msgTransmitter = {txt: txt};
				socket.emit('new-msg', msgTransmitter);
				oChat.sendMsg(msgTransmitter);
			}
		});
		
		socket.on('new-msg', function(msg) {
			oChat.getMsg(msg);
		});
		
		socket.on('new-histo', function(histo) {
			var i = 0;
			while(i<histo.length){
				oChat.appendChat(histo[i].datetime, histo[i].direction, histo[i].msg)
				i++;
			}
		});
	}
	

	
	
	
	
	
	
	
	
});