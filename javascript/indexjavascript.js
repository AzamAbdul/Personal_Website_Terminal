var showText = function (target, message, curr_index, interval,callback) {   
	if(curr_index == 0){
		$(target).append("<p>")
	}
	if (curr_index < message.length) {

		$(target).append(message[curr_index]);
		curr_index= curr_index+1
		setTimeout(function () { showText(target, message, curr_index, interval,callback); }, interval);
	}else{
		$(target).append("\n</p>");
		callback()
	}
}
var check_enter= function(){
	$(document).keydown(function(evt) {

		if (evt.keyCode === 13) {
			$("authentication").hide();
			$('.term').show();
			blink(".cursor",true)

		}
	});

}
var blink = function(element,check){

	function blinker() {
		$(element).fadeOut(500);
		$(element).fadeIn(500);
	}

	setInterval(blinker, 1000);
	
	
}
var driver = function(){

	var f =function (check_enter_f){		
		showText("#authentication", " Hi, you've reached my website!", 0, 30,
			setTimeout(function (){
				showText("#authentication", "But. Wait. ", 0, 30, 
					setTimeout(function(){
						showText("#authentication", "Something is missing?!? Can you help me rebuild it?", 0, 30, 
							function(){
								showText("#authentication", "Take this! It might help ", 0, 30, function (){});
							
							});
				}
				,3000));
		}
		,1500));


check_enter_f()
}
f(check_enter)

}

$(document).ready(driver())

