/*
	Date and Time
*/

updateTime(); // start the function after the website loads
updateDate(); // same as above
setInterval(updateTime, 1000); // repeat this function every 1 second
setInterval(updateDate, 1000); // same as above

function updateTime() {
	// get time
	let now = new Date();
	let m = now.getMinutes().toString();
	let h = now.getHours().toString();

	//conditions
	// if hour is only 1 digit long, put '0' in front of it (8:40 -> 08:40)
	if (h.length === 1) {
		h = '0' + h;
	}
	// if minute is only 1 digit long, put '0' in front of it (08:2 -> 08:02)
	if (m.length === 1) {
		m = '0' + m;
	}

	/*
	  for 12 hours am/pm time format enable the code below
	*/

	/*var dd = 'am';
	var hh = h;
	
	// conditions
	// if minute is only 1 digit long, put '0' in front of it
	if (m.length === 1) {
		m = '0'+m;
	}
	// use 12 hours am/pm time format
	if (h >= 12) {
		h = hh - 12;
		dd = 'pm';
	}
	if (h == 0) {
		h = 12;
	}*/

	/* end 12 hours am/pm */

	// output format (for 12 hours am/pm use 'let output = h + ':' + m + ' ' + dd;')
	let output = h + ':' + m;

	// use #current-time in the HTML to display the clock
	document.getElementById('current-time').innerHTML = output;
}

function updateDate() {
	// get date
	let now = new Date();
	let d = now.getDate();
	let m = now.getMonth() + 1;
	let y = now.getFullYear();

	// output format
	let output = d + '/' + m + '/' + y;

	// use #date in the HTML to display the date
	document.getElementById('date').innerHTML = output;
}

/*
	Custom caret (_) in search field
*/

function handleInputEvent(event) {

	var el = event.target

	var caretIndex = el.selectionStart;
	var textBeforeCarret = el.value.substring(0, caretIndex);
	var bgr = getBackgroundStyle(el, textBeforeCarret);

	el.style.background = bgr

	clearInterval(window.blinkInterval);
	el.style["background-blend-mode"] = "normal";
	window.blinkInterval = setInterval(blink, 900);
}

var inputElement = document.getElementById("search")
inputElement.onchange = handleInputEvent
inputElement.onblur = handleInputEvent
inputElement.onmouseup = handleInputEvent
inputElement.onfocus = handleInputEvent
inputElement.onkeydown = handleInputEvent
inputElement.onkeyup = handleInputEvent

function blink() {

	var inputElement = document.getElementById("search")
	if (inputElement.style["background-blend-mode"] != "normal") {
		inputElement.style["background-blend-mode"] = "normal";
	} else {
		inputElement.style["background-blend-mode"] = "color";
	}
}

var canvas = null


function getBackgroundStyle(el, text) {

	var elStyle = window.getComputedStyle(el);

	var fontSize = parseInt(elStyle.fontSize.slice(0, -2));
	var fontFamily = elStyle.fontFamily;
	var font = elStyle.fontSize + " " + fontFamily;

	if (canvas == null) {
		canvas = document.createElement("canvas");

		var ctx = canvas.getContext("2d");

		ctx.font = font;
		ctx.strokeStyle = elStyle.color;
		// ctx.lineWidth = Math.ceil(parseInt(fontSize) / 5);
		// ctx.beginPath();
		ctx.moveTo(0, 0);
		// ctx.lineTo(parseInt(fontSize) / 1.5, 0);
		// ctx.stroke();
		ctx.fillStyle = elStyle.color;
		ctx.fillRect(0, 0, fontSize / 2, fontSize);
		// ctx.stroke();

	}
	var offsetLeft = canvas.getContext("2d").measureText(text).width + parseInt(elStyle.paddingLeft);

	return "rgba(7, 29, 34) url(" + canvas.toDataURL() + ") no-repeat " +
		(offsetLeft - el.scrollLeft) + "px " +
		// (parseInt(elStyle.height.slice(0, -2)) + parseInt(elStyle.paddingTop)) + "px";
		(parseInt(elStyle.paddingTop)) + "px";

}
