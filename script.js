// script for main app
import {setToken} from "../../Config/Token.js";
import {getToken} from "../../Config/Token.js";

let globalArr = [];
let eventCount = 0;

const pubRoot = new axios.create({
    baseURL: "http://localhost:3000"
});

export function renderCal() {
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let first = new Date(year,month,1).getDay();
    let prev;
    let next;
    if (month == 0) {
        prev = new Date(year-1, 11, 1);
        next = new Date(year, 1, 1);
    } else if (month == 11) {
        prev = new Date(year, 10, 1);
        next = new Date(year+1, 0,1);
    } else {
        prev = new Date(year, month-1, 1);
        next = new Date(year, month+1, 1);
    }

    let days;
    let remonth;
    switch(month) {
        case 0:
            remonth = "January";
            days = 31;
            break;
        case 1:
            remonth = "February";
            days = 28;
            break;
        case 2:
            remonth = "March";
            days = 31;
            break;
        case 3: 
            remonth = "April";
            days = 30;
            break;
        case 4: 
            remonth = "May";
            days = 31;
            break;
        case 5:
            remonth = "June";
            days = 30;
            break;
        case 6: 
            remonth = "July";
            days = 31;
        case 7: 
            remonth = "August";
            days = 31;
            break;
        case 8:
            remonth = "September";
            days = 30;
            break;
        case 9:
            remonth = "October";
            days = 31;
        case 10:
            remonth = "November";
            days = 30;
            break;
        case 11:
            remonth = "December";    
            days = 31;  
            break;  
    }
    if (month == 1) {
    for (let i = 0; i < year+100; i=i+4) { // accounts for leap years
        if (year == i) {
            days++;
        }
    }
    } // change to buttons
    let calendar = `<div id="calendar">
    <table align="center" style="padding-top: 225px;">
    <tr>
      <th colspan="7"><button class="shift" value="${prev}"> < </button>  ${remonth}  ${year}  <button class="shift" value="${next}"> > </button></th>
    </tr>
    <tr class="weekdays">
      <th>Su</th>
      <th>Mo</th>
      <th>Tu</th>
      <th>We</th>
      <th>Th</th>
      <th>Fr</th>
      <th>Sa</th>
    </tr>`;
    let day = 1; //generation of calendar
    for(let j = 0; j <= 4; j++) {
        calendar+=`<tr>`;
        for (let i = 0; i < 7; i++) {
            if ((day == 1 && i != first) || day > days) {
                calendar += `<th></th>`;
            } else {
                if (day == today.getDate()) {
                    calendar += `<th><button value="${new Date(year, month, day)}" style="color: red;" class="date">${day}</button></th>`
                } else {
                    calendar += `<th><button value="${new Date(year, month, day)}" class="date ">${day}</button></th>`;
                }
                day++;
            }
        }
        calendar+=`</tr>`;
    }
    calendar += `</table>`;
    // above is a weather API script and html thats why it looks a hot mess
    calendar += `</div>`;
    
    return calendar;
    //renders a monthly view of everything event you have on what days
}

export function renderDay() {
    //renders what you have due today
    let dayView = `<div id="dayView">`;
    let today = new Date();
    let theday = today.getDay();
    let day = "";
    switch(theday) {
        case 0:
            day = "Sunday";
            break;
        case 1:
            day = "Monday";
            break;
        case 2:
            day = "Tuesday";
            break;
        case 3:
            day = "Wednesday";
            break;
        case 4:
            day = "Thursday";
            break;
        case 5:
            day = "Friday";
            break;
        case 6:
            day = "Saturday";
            break;
    }

    dayView += `<h>${day}  ${today.getMonth()+1}/${today.getDate()}/${today.getFullYear()}</h>`;

    // list of events by time and give them lengths over the new table
    // shade in 30 min interval if there is 
        dayView += `<table>`;
        //add for loop for shading in events column
        let hour = 12;
        let min = 0;
        let time = "am";
        let minutes;
        for (let i = 0; i < 48; i++) {
            if (i >= 24) {
                time = "pm";
            }
            if (min == 0) {
                minutes = "00";
            } else {
                minutes = "30";
            }
            dayView += `<tr>
            <th>${hour + ":" + minutes + time}</th>`;
            for (let i = 0; i < globalArr.length; i++) { // how we generate events into calendar (hard coded currently)
                let me = "MajoretteKay";
                if (globalArr[i].user == me) {
                    dayView += `<th><button>${globalArr[i].title}<br>${globalArr[i].begins} - ${globalArr[i].ends}<br>${globalArr[i].description}<br>${globalArr[i].location}</button></th>`
                }
            }
            dayView += `</tr>`;
            // event goes in empty th above
            if (min == 30 && hour == 12) {
                hour = 1;
                min = 0;
            } else {
                min+=30;
            }
            if (min == 60) {
                min = 0;
                hour++;
            }
            
        }
        dayView += `</table>`;
        dayView += `</div>`;
        return dayView;
    }



export function renderWeek() {
    let text = `<div id="weekly">`;
    // put when the next stuff due, class, homework, quiz, test, interview, work, study, other
    text += `<p>Your next Homework is due in:</p>`;
    text += `<p>Your next Quiz is due in:</p>`;
    text += `<p>Your next Test is due in:</p>`;
    text += `<p>Your next Class is:</p>`;
    text += `<p>Your next Project is due in:</p>`;
    text += `<p><button class="eventButton">Add Event</button></p>`;
    text += `<div id="eventForm"></div>`;
    text += `<a class="weatherwidget-io" href="https://forecast7.com/en/35d91n79d06/chapel-hill/?unit=us" data-label_1="CHAPEL HILL" data-label_2="WEATHER" data-days="3" data-theme="beige" >CHAPEL HILL WEATHER</a>
    <script>
    !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src='https://weatherwidget.io/js/widget.min.js';fjs.parentNode.insertBefore(js,fjs);}}(document,'script','weatherwidget-io-js');
    </script>`;
    text += `</div>`;
    return text;
}

export function addEventsForm() {
    // button handler ability to create new events to give to axios/server
    let form = `<div id="eventForm"><form class="eventSubmit">
    <div><label>Title:</label>
    <input placeholder="Enter Title Here" id="title"></input></div>
    <div><label>Enter The Date:</label>
    <input placeholder="mm/dd/yyyy" id="date"></input></div>
    <div><label>Beginning Time:</label>
    <input id="begin" type="time"></input></div>
    <div><label>Ending Time:</label>
    <input id="end" type="time"></input></div>
    <div><label>Enter Description:</label>
    <textarea id="description"></textarea></div>
    <div><label>Enter Location:</label>
    <input id="location" placeholder="Genome G0100"></input></div>
    <div><label>Select the Type of Event:</label>
    <input id="type" placeholder="Homework"></input></div>
    <button type="submit"> Create </button></form></div>`;
    $('div#eventForm').replaceWith(form);


}

export async function addEvent(event) {
    // submits form info to axios
    event.preventDefault();
    
    let title = $('input#title').val();
    let date = new Date($('input#date').val()) // typing mm/dd/yyyy work for day at the moment'
    let begins = $('input#begin').val()
    let ends = $('input#end').val();
    let description = "" + $('textarea#description').val();
    let location = "" + $('input#location').val();
    let type = "" + $('input#type').val();
    $('div#eventForm').replaceWith(`<div id="eventForm"></div>`);

    let user = "MajoretteKay"
    globalArr.push(new Event(eventCount, user, title, date, begins, ends, type, description, location)); //puts into backend with axios
    eventCount++; //increment new events
    // id like to do an isMine element instead of user but im not sure how???
    $('div#dayView').replaceWith(renderDay());

}

export function changeView(event) {
    let dayView = `<div id="dayView">`;
    let newdate = new Date(event.target.value);
    let newday = newdate.getDay();
    let day = "";
    if (newday == 0) { //switch case wasn't working for some reason
        day = "Sunday";
    }
    if (newday == 1) { //switch case wasn't working for some reason
        day = "Monday";
    }
    if (newday == 2) { //switch case wasn't working for some reason
        day = "Tuesday";
    }
    if (newday == 3) { //switch case wasn't working for some reason
        day = "Wednesday";
    }
    if (newday == 4) { //switch case wasn't working for some reason
        day = "Thursday";
    }
    if (newday == 5) { //switch case wasn't working for some reason
        day = "Friday";
    }
    if (newday == 6) { //switch case wasn't working for some reason
        day = "Saturday";
    }
    dayView += `<h>${day}  ${newdate.getMonth()+1}/${newdate.getDate()}/${newdate.getFullYear()}</h>`;

    // list of events by time and give them lengths over the new table
    // shade in 30 min interval if there is 
        dayView += `<table>`;
        //add for loop for shading in events column
        let hour = 12;
        let min = 0;
        let time = "am";
        let minutes;
        for (let i = 0; i < 48; i++) {
            if (i >= 24) {
                time = "pm";
            }
            if (min == 0) {
                minutes = "00";
            } else {
                minutes = "30";
            }
            dayView += `<tr>
            <th>${hour + ":" + minutes + time}</th>`;
            for (let i = 0; i < globalArr.length; i++) { // how we generate events into calendar (hard coded currently)
                let me = "MajoretteKay";
                if (globalArr[i].user == me) {
                    dayView += `<th><button>${globalArr[i].title}<br>${globalArr[i].begins} - ${globalArr[i].ends}<br>${globalArr[i].description}<br>${globalArr[i].location}</button></th>`
                }
            }
            dayView += `</tr>`;
            // event goes in empty th above
            if (min == 30 && hour == 12) {
                hour = 1;
                min = 0;
            } else {
                min+=30;
            }
            if (min == 60) {
                min = 0;
                hour++;
            }
            
        }
        dayView += `</table>`;
        dayView += `</div>`;

        $('div#dayView').replaceWith(dayView);


}

export function newCalendar(event) {
    let today = new Date();
    let newMonth = new Date(event.target.value);
    let month = newMonth.getMonth();
    let year = newMonth.getFullYear();
    let first = newMonth.getDay();
    
    let prev;
    let next;
    if (month == 0) {
        prev = new Date(year-1, 11, 1);
        next = new Date(year, 1, 1);
    } else if (month == 11) {
        prev = new Date(year, 10, 1);
        next = new Date(year+1, 0, 1);
    } else {
        prev = new Date(year, month-1, 1);
        next = new Date(year, month+1, 1);
    }

    let days;
    let remonth;
    switch(month) {
        case 0:
            remonth = "January";
            days = 31;
            break;
        case 1:
            remonth = "February";
            days = 28;
            break;
        case 2:
            remonth = "March";
            days = 31;
            break;
        case 3: 
            remonth = "April";
            days = 30;
            break;
        case 4: 
            remonth = "May";
            days = 31;
            break;
        case 5:
            remonth = "June";
            days = 30;
            break;
        case 6: 
            remonth = "July";
            days = 31;
            break;
        case 7: 
            remonth = "August";
            days = 31;
            break;
        case 8:
            remonth = "September";
            days = 30;
            break;
        case 9:
            remonth = "October";
            days = 31;
            break;
        case 10:
            remonth = "November";
            days = 30;
            break;
        case 11:
            remonth = "December";    
            days = 31;  
            break;  
    }
    if (month == 1) {
    for (let i = 0; i < year+100; i=i+4) { // accounts for leap years
        if (year == i) {
            days++;
        }
    }
    } // change to buttons
    let calendar = `<div id="calendar">
    <table>
    <tr>
      <th colspan="7"><button class="shift" value="${prev}"> < </button>  ${remonth}  ${year}  <button class="shift" value="${next}"> > </button></th>
    </tr>
    <tr class="weekdays">
      <th>Su</th>
      <th>Mo</th>
      <th>Tu</th>
      <th>We</th>
      <th>Th</th>
      <th>Fr</th>
      <th>Sa</th>
    </tr>`;
    let day = 1; //generation of calendar
    for(let j = 0; j <= 4; j++) {
        calendar+=`<tr>`;
        for (let i = 0; i < 7; i++) {
            if ((day == 1 && i != first) || day > days) {
                calendar += `<th></th>`;
            } else {
                
                if (day == today.getDate() && month == today.getMonth() && year == today.getFullYear()) {
                    calendar += `<th><button value="${new Date(year, month, day)}" style="color: red;" class="date">${day}</button></th>`
                } else {
                    calendar += `<th><button value="${new Date(year, month, day)}" class="date">${day}</button></th>`;
                }
                day++;
            }
        }
        calendar+=`</tr>`;
    }
    calendar += `</table>`;
    // above is a weather API script and html thats why it looks a hot mess
    calendar += `</div>`;

    $('div#calendar').replaceWith(calendar);
    
}

async function statusCheck() {
    try {
        const res = await pubRoot.get(("/account/status"), {headers: {Authorization: `Bearer ${getToken()}`}});
        const data = res.data;
        return data;
    } catch(error) {
        logout();
    }

}

export function logout() {
    window.location.href = "http://localhost:3001/index.html";
}


export async function renderSite() {
    //renders the calendar and forms and views
    const $root = $('#root');

    //window.setInterval(function(){
    //   const loggedIn = statusCheck();
    //}, 5000);

    $root.append(renderCal());
    $root.append(renderDay());
    $root.append(renderWeek());

    $root.on("click", ".eventButton", addEventsForm);
    $root.on("submit", ".eventSubmit", addEvent);
    $root.on("click", ".logout", logout);
    $root.on("click", ".shift", newCalendar);
    $root.on("click", ".date", changeView);
    
}

$(function() {
    renderSite();
  });