// ==UserScript==
// @name         Week2
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Week 2 assignment - improve user experience on UHM class availability page
// @author       ICS 465 Group 4
// @match        http://tampermonkey.net/index.php?version=4.5&ext=dhdg&updated=true
// @grant        none
// @require      https://code.jquery.com/jquery-2.1.3.min.js
// @include      https://www.sis.hawaii.edu/uhdad/avail.classes?i=MAN&t=201830&s=ICS
// ==/UserScript==

// body padding
document.body.style.paddingLeft = '30px';
document.body.style.paddingRight = '30px';
document.body.style.paddingTop = '30px';

// table padding
var wholeTable = document.getElementsByClassName('divListOfClasses').item(0);
wholeTable.style.paddingLeft = '20px';
wholeTable.style.paddingRight = '20px';

// length of table rows, array of multiple section rows
let rowLength = 0;
let rows = [];

// when the page loads, do below
window.onload = function() {

    /*
    $(".listOfClasses tr th:nth-child(4)").remove();
    $(".listOfClasses tr td:nth-child(4)").remove();

    $(".listOfClasses tr th:nth-child(12)").remove();
    $(".listOfClasses tr td:nth-child(12)").remove();
    */

    // call showAbbr() to add title for cells
    showAbbr();

    // deleter the infotext: class meeting day, focus requirement...
    var del = document.getElementsByClassName('infotext').item(0);
    del.parentNode.removeChild(del);

    // get the node that is the footer
    var footer = document.getElementsByClassName('footer').item(0);

    // create a line break
    var breaker = document.createElement('hr');
    breaker.style.width = "100%";
    breaker.style.size = 1;

    // create the notes that is deleted along with infotext
    var notes = document.createElement('p');
    notes.innerHTML = "NOTE:  Courses numbered 600 and above are restricted to classified" +
                      "graduate students only. All unclassified students must obtain approval" +
                      "from the department to register.";
    notes.style.padding = "4px";
    notes.style.margin = "4px";
    notes.style.fontSize = "80%";

    // add the line break
    document.body.insertBefore(breaker, footer);
    // add back the notes
    document.body.insertBefore(notes, footer);
};

// create button
var btn = document.createElement('button');

// add style of button
btn.innerHTML = "Back to top";
btn.id = 'btn';
btn.style.display = 'none';
btn.style.position = 'fixed';
btn.style.right = 5;
btn.style.bottom = 15;
btn.style.color = 'green';
btn.style.background = 'transparent';
btn.style.height = 50;
btn.style.cursor = 'pointer';
btn.style.borderRadius = '10px';
btn.style.borderColor = 'green';

// append button to body
document.body.appendChild(btn);

// update botton when scroll, not show at the top
window.onscroll = function() {
  var current = document.documentElement.scrollTop || document.body.scrollTop;
  if(current > 0) {
    btn.style.display = 'block';
  } else {
    btn.style.display = 'none';
  }
};

// Click back to top button, and ...^
var timer = null;
btn.onclick = function() {
  timer = setInterval(function() {
    var osTop = document.documentElement.scrollTop || document.body.scrollTop;
    var ispeed = Math.floor(-osTop / 5);
    isTop = true;
    document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;
    if(osTop == 0) {
      clearInterval(timer);
    }
  }, 30);
};

// event when mouse enter Back To Top botton
// change color and background
btn.onmouseenter = function() {
  btn.style.background = 'green';
  btn.style.color = 'white';
};

// event when mouse leave Back To Top botton
// change color and background
btn.onmouseleave = function() {
  btn.style.background = 'transparent';
  btn.style.color = 'green';
};

/*
 * Function to add the title attribute according to the content of Gen. Ed/Focus and Days column
 *
 * Hard coded, did not cover all the cases, only cases on the ICS class availability page
 * Maybe implements in the future
 */
function showAbbr() {
    // get all td
    var table = document.getElementsByClassName("listOfClasses").item(0).getElementsByTagName('td');
    var colnum = table.length;

    // loop through all and add titile
    for(var i = 0; i < colnum; i++) {
        // console.log(table[i].innerHTML);
        if(table[i].innerHTML == "T") {
            table[i].title = "Tuesday";
        }
        else if(table[i].innerHTML == "W") {
            table[i].title = "Wednesday";
        }
        else if(table[i].innerHTML == "R") {
            table[i].title = "Thursday";
        }
        else if(table[i].innerHTML == "F") {
            table[i].title = "Friday";
        }
        else if(table[i].innerHTML == "MW") {
            table[i].title = "Monday Wednesday";
        }
        else if(table[i].innerHTML == "WF") {
            table[i].title = "Wednesday Friday";
        }
        else if(table[i].innerHTML == "TR") {
            table[i].title = "Tuesday Thursday";
        }
        else if(table[i].innerHTML == "W") {
            table[i].title = "Wednesday";
        }
        else if(table[i].innerHTML == "TBA") {
            table[i].title = "To Be Announced/Arranged";
        }
        else if(table[i].innerHTML == "WI") {
            table[i].title = "Writing Intensive";
        }
        else if(table[i].innerHTML == "ETH,OC,WI") {
            table[i].title = "Contemporary Ethical Issues, Oral Communication, Writing Intensive";
        }
        else if(table[i].innerHTML == "FS") {
            table[i].title = "Foundation Symbolic Reasoning";
        }
        else if(table[i].innerHTML == "NI") {
            table[i].title = "Non-introductory Course";
        }
        else if(table[i].innerHTML == "FS,NI") {
            table[i].title = "Foundation Symbolic Reasoning, Non-introductory Course";
        }
    }

    /*
     * Eliminates redundant date and credit columns
     */
    if(document.querySelectorAll('table.listOfClasses')) {

        [].forEach.call(document.querySelectorAll('tr'), tr => {
            rowLength = tr.cells.length;
            if(rowLength > 11) {
                // The date column
                tr.cells[rowLength-1].remove();
                // The credit column
                tr.cells[rowLength-6].remove();
            }
       });
    }
}
