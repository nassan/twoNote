
var textareaValue = null;
var textareaOldValue = null;
//After 6 seconds setTimeout will check to see what is inside 
// of the text area 
$(document).ready(

	setInterval(function(){
		textareaOldValue = textareaValue;
		textareaValue = $("textarea").val()
		console.log(textareaValue);
		

		if (textareaValue!=textareaOldValue){
			$("#notes-taken").append('<p>'+textareaValue+'</p>');
		};
	},5000)



);