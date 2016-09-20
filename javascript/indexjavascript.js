var glob_c= 1
var prev_cmds = ["blah"]
var offset =0
prev_cmds.length =0
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
/* Set the width of the side navigation to 250px */
function openNav() {
    $('#nav').show()
}

/* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
var check_enter= function(){

			$('.term').show();
			$('.term').addClass('animated slideInUp')
			$("#skip_text").show();
			$('#skip_text').addClass('animated slideInUp')
			$('#command1').focus()

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
var show_social = function()
{
	$('#social').addClass('animated tada')
	$("#social").show();

}
var is_valid_cmd = function(command){
	return command ==="help" || command ==="ls"
}
var clear_term = function(){
	$('#term_body').empty()

}
var build_nav = function(){
	openNav()
}

var skip = function(){
	show_social()
	build_nav()
}
var run_cmd = function(command){
	if(command ==="help"){
		print_to_shell( "Supported commands include help,ls,echo",false)
		return true
	}else if(command==="ls"){
		print_to_shell("./build_nav.sh ./social.sh", true)
		return true
	}else if(command==="clear"){
		clear_term()
		return false
	}else if(command=="./social.sh"){
		show_social()
		return false;
	}else if(command=="./build_nav.sh"){
		build_nav();
		return false;
	}else{
		print_to_shell(command + " is not a recognized command")   
		return true
	}

}
var print_to_shell = function(text,is_executable){

	var result_row = document.createElement("div")
	result_row.className="row"

	var result_col =document.createElement("div")
	result_col.className="col-sm-12"
	if(is_executable){
		
		result_col.classList.add("executable");
	}
	result_col.innerHTML = text
	result_row.appendChild(result_col)
	
	$("#term_body").append(result_row)
}
var freeze_prev_command =function(command){
	document.getElementById("command"+glob_c).readOnly = true
}
var add_cmd_line = function(){
	
	var result_row = document.createElement("div")
	result_row.className="row"
	
	var user_col = document.createElement("div")
	user_col.className= "col-sm-3" 
	user_col.classList.add("col-md-2")
	user_col.innerHTML ="user:~$"
	
	result_row.appendChild(user_col)
	
	var cmd_col = document.createElement("div")
	cmd_col.className = "col-sm-9"
	cmd_col.classList.add("col-md-10")
	var cmd_in = document.createElement("input")
	cmd_in.className="cmd_box"
	glob_c  = glob_c +1
	cmd_in.id="command"+glob_c
	cmd_col.appendChild(cmd_in)

	result_row.appendChild(cmd_col)

	$("#term_body").append(result_row)
	$("#command"+glob_c).focus();

}
var command_driver = function(target){
	 $(target).keydown(function(e){
      if(e.keyCode==13){
      		var cmd_value = $(target).val();

      		var not_clear = run_cmd(cmd_value)
      		if(not_clear)
      			freeze_prev_command(cmd_value)
      		add_cmd_line()
      		command_driver("#command"+glob_c)
      		prev_cmds.push(cmd_value)
      		offset =0
      }else if(e.keyCode==38){
      	if(glob_c != 1){
      
      		      	$(target).val( prev_cmds[glob_c - 2-offset])
      		      	if(glob_c-(2+offset )>=0)
      		      		offset = offset+1
      	}

      }else if(e.keyCode==40)
      	if(glob_c != 1){
      				if(glob_c-(2+offset )<prev_cmds.length)
      		      		offset = offset-1
      		      	$(target).val( prev_cmds[glob_c - 2-offset])
      		      	
      	}

    });
}
$(document).ready(function(){
   command_driver('#command1')
});
$(document).ready(driver())

