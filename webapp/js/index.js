// Define relative globals
var notes = [];
var timer = null;

// Prepare the textarea singleton
var textarea = {

//Data about different states of the textarea
    value : {
        current: null,
        old: null,
        difference: null
    },

//  Function that begins monitoring the textarea for keystrokes
    divKeyStrokeWatcher : function(){
        document.getElementById('notes-being-taken').onkeydown = function(){
            countdown()
        }

    },

//  Updates the states of the textarea based on most recent returned value
    updateValues : function(){
        this.value.old = this.value.current;
        this.value.current = $('textarea').val();
    },

//  Returns a boolean indicating whether or not there is a difference between the old and current values
    valueDifferenceBool : function (){
        return this.value.old === this.value.current;
    },

// Will append the value of the textarea to a div if there is a difference between the last appended text and the current text
    sendToDiv : function(){

        this.updateValues();
        if(this.valueDifferenceBool() === false){

            // Get the current audio time, parse it to human
            var timeStamp = audio.getCurrentTime();
            var seconds = Math.floor(timeStamp);
            var minutes = Math.floor(seconds/60);
            seconds = seconds%60;
            var readableTimeStamp = minutes + ':' + seconds + ' ';

            // Then create a new note object
            var newNote = new Note(this.value.current, timeStamp, readableTimeStamp );

            // And push it onto the notesArray for record
            notes.push(newNote);
//            console.log(newNote);

            // And append it to the div for visualization
//          Create a link showing the time the note was taken
            var noteP = $('<p/>').addClass('note'),
                timeA = '<a id="'+newNote.timeStamp +'">'+newNote.readableTimeStamp + '</a>';
            noteP.html(timeA + newNote.actualNotes)
            $("#notes-taken").append(noteP);
            $('textarea').val('');
            audio.addClickListeners();
        }
    }



};

//Prepare the audio singleton
var audio = {

    getElement: function(){
        return document.getElementById("current-audio")
    },

    getCurrentTime : function (){
    //Gets the current time of the notes audio file
        return this.getElement().currentTime;
    },
    setCurrentTime : function(timeToSetAudio){
       this.getElement().currentTime = timeToSetAudio;
        console.log(timeToSetAudio)
    },


//    gets all notes (class of note in the DOM) and adds an on click listener to the element
//        which calls a functin to send a new currenttime to the global audio
    addClickListeners : function(){
        $(".note").click(function(){
            audio.setCurrentTime(this.firstChild.id)})
    }

};

//Holds data and methods that work with both the notes and the audio
var application = {
//    For editing, I need to get

};

//The constructor for a Note that is after a few seconds after a keystroke
function Note(actualNotes, timeStamp, readableTimeStamp){
	this.actualNotes = actualNotes;
	this.timeStamp = timeStamp;
	this.readableTimeStamp = readableTimeStamp;
}

//Begins the countdown to posting notes to the DOM, called by divKeyStrokeWatcher
function countdown(){
	clearTimeout(timer);
	timer = setTimeout(function(){
		textarea.sendToDiv();
	},2000)
}



$(document).ready(function(){
//    alert("Last edited function: addClickListeners")
    textarea.divKeyStrokeWatcher()
});
