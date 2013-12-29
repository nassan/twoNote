// Prepare the audio to be manipulated
var audio = null;
// Prepare notes array
var notesArray = [];
// Prepare the textarea information
var textareaData = {

	currentValue: null,
		oldValue: null
}

function note(actualNotes, timeStamp){
	this.actualNotes = actualNotes;
	this.timeStamp = timeStamp;
	console.log(this.timeStamp)
}

getCurrentTime = function(){
	audio = document.getElementById("current-audio");
	return audio.currentTime;
}
	
	
textareaData.updateMyValues = function(){

// Get the difference between the current and old textarea values

	this.oldValue = this.currentValue;
	this.currentValue = $('textarea').val();
}


textareaData.checkMyValueDifferences = function(){

// Returns a boolean indicating whether or not there is a difference
// between the old and current textarea values

	if (this.oldValue === this.currentValue){
		return true;
	};
	return false;
}

function sendTextToDiv(){

// Will append the value of the textarea to a div if there is a
// difference between the last appended text and the current text 
	
	textareaData.updateMyValues();
	changed = textareaData.checkMyValueDifferences();
	console.log(textareaData.currentValue)
	if(changed === false){
		// Then create a new note object
		newNote = new note(textareaData.currentValue, getCurrentTime())
		
		// And push it onto the notesArray for record
		notesArray.push(newNote)

		// And append it to the div for visualization
		$("#notes-taken").append('<p class = "note">'+textareaData.currentValue+ newNote.timeStamp+'</p>');	
	}
}
	
$(document).ready(


	
	setInterval(function(){
		sendTextToDiv()
	}, 2000)
	

	
	

);

	// console.log(audio.currentTime())
