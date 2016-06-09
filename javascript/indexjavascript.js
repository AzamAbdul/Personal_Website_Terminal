var glob_c= 1
var showText = function (target, message, curr_index, interval,cb) {   

	if (curr_index < message.length) {

		$(target).append(message[curr_index]);
		curr_index= curr_index+1
		setTimeout(function () { showText(target, message, curr_index, interval,cb); }, interval);
	}else{
		console.log(message)
	

		cb();
		
	}
}
var check_enter= function(){
			$("authentication").hide();
			$('.term').show();
			$('.term').addClass('animated slideInUp')
			

		
	

}
var blink = function(element,check){

	function blinker() {
		$(element).fadeOut(500);
		$(element).fadeIn(500);
	}

	setInterval(blinker, 1000);
	
	
}
var driver = function(){

	
		showText("#authentication", " Hi, you've reached my website! ", 0, 30,
			function() {setTimeout(function (){
				showText("#authentication", "But. Wait. ", 0, 30, 
					function(){setTimeout(function(){
						showText("#authentication", " Something is missing?!? Can you help me rebuild it?", 0, 30, 
							function(){
								showText("#authentication", " Take this! It might help ", 0, 30, check_enter());
							
							});
				},3000);});
		},1500);});





}
var is_valid_cmd = function(command){
	return command ==="help" || command ==="ls"
}
var run_cmd = function(command){
	if(command ==="help")
		return "Supported commands include help,ls,echo fdsafdsafdsafdsafsdafsdafdsafd "
}
var print_to_shell = function(text,target){

	var result_row = document.createElement("div")
	result_row.className="row"

	var result_col =document.createElement("div")
	result_col.className="col-sm-12"
	result_col.innerHTML = text
	result_row.appendChild(result_col)
	$("#term").append(result_row)
}
var freeze_prev_command =function(command){
	document.getElementById("command"+glob_c).readOnly = true
}
var command_driver = function(target){
	 $(target).keypress(function(e){
      if(e.keyCode==13){
      		var cmd_value = $(target).val();
      		if(is_valid_cmd(cmd_value)){
				var result = run_cmd(cmd_value)
				print_to_shell(result,target)       			
				
      		}else{

      			print_to_shell(cmd_value +" is not a valid command")
      		}
      		freeze_prev_command(cmd_value)
      }
    });
}
$(document).ready(function(){
   command_driver('#command1')
});
$(document).ready(driver())

