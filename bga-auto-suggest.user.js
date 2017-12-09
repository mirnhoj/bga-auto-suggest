// ==UserScript==
// @name         bga-auto-suggest
// @namespace    https://github.com/mirnhoj/bga-auto-suggest
// @version      0.1
// @description  add keyboard shortcuts that will increase/decrease the playback rate for video elements.
// @include      https://*.boardgamearena.com/#!table?table=*
// @grant        none
// ==/UserScript==
// 
// if you want to extend the functionality of this script to other sites
// besides youtube, add additional @include keys to the metadata block.
//
// if you want to change the default playback rate from 1x, change the line
// "var currentPlaybackRate = 1;" to equal something other than 1, like 1.3 to
// have all videos start playing at an increased speed, or 0.7 to have all
// videos start playing at a decreased speed.
//
// if you want change the granularity of the playback rate adjustment, change
// the line "var speedStep = 0.1;" to equal something other than 0.1, like 0.01
// for more granular adjustments, or 0.25 for less granular adjustments. 


var currentPlaybackRate = 1;  // default playback rate.
var speedStep = 0.1;


var infobox = document.createElement("h1");
infobox.setAttribute("id", "playbackrate-indicator");
infobox.style.position = "absolute";
infobox.style.top = "10%";
infobox.style.right = "10%";
infobox.style.color = "rgba(255, 0, 0, 1)";
infobox.style.zIndex = "99999";  // ensures that it shows above other elements.
infobox.style.visibility = "hidden";
infobox.style.marginTop = "3%";


var timeoutID;


function setPlaybackRate() {
	// grab the suggest buttons.
	var suggestButtons = document.getElementsByClassName("suggestbutton");
    
	infobox.innerHTML = suggestButtons.length + " suggest buttons.";
	infobox.style.visibility = "visible";
}


// mimic vlc keyboard shortcuts
window.addEventListener('keydown', function(event) {
    var keycode = event.charCode || event.keyCode;

    // decrease playback rate if '[' is pressed
    if (keycode === 91 || keycode === 123 || keycode === 219) {
        currentPlaybackRate -= speedStep;
    }

    // increase playback rate if ']' is pressed
    if (keycode === 93 || keycode === 125 || keycode === 221) {
        currentPlaybackRate += speedStep;
    }

    // need to set playback rate for all keydown events since it seems like the
    // standard youtube keyboard shortcuts--like the arrow keys to skip forward
    // and backwards--are set to reset the playback rate to 1.
    setPlaybackRate();
});
