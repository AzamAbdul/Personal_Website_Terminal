var showText = function (target, message, curr_index, interval,cb) {   
	if(curr_index == 0){
		$(target).append("<p>")
	}
	if (curr_index < message.length) {

		$(target).append(message[curr_index]);
		alert($(target))
		curr_index= curr_index+1
		setTimeout(function () { showText(target, message, curr_index, interval,cb); }, interval);
	}else{
		console.log(message)
		$(target).append("\n</p>");

		cb();
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

	
		showText("#authentication", " Hi, you've reached my website!", 0, 30,
			function() {setTimeout(function (){
				showText("#authentication", "But. Wait. ", 0, 30, 
					function(){setTimeout(function(){
						showText("#authentication", "Something is missing?!? Can you help me rebuild it?", 0, 30, 
							function(){
								showText("#authentication", "Take this! It might help ", 0, 30, function (){});
							
							});
				},3000);});
		},1500);});


check_enter()


}

$(document).ready(driver())

