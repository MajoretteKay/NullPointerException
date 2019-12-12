// script for main app
import {setToken} from "../../Config/Token.js";
import {getToken} from "../../Config/Token.js";
import { getUser } from "../../Config/User.js";
import { setUser } from "./Config/User.js";

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
    <table align="center">
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
                    calendar += `<th><button value="${new Date(year, month, day)}" style="color: #E6E9C0;" class="date">${day}</button></th>`
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
    
    var dayView = `<div id="dayView">`;
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
            <th>${hour + ":" + minutes + time}</th>
            <th><div id="${i}"></div></th></tr>`;

            
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

        $('#root').append(dayView);

        const response = getEvents(today).then(function(promise){
            let length = promise.length;
            let j;
            let dayView = ``;
            for(let i = 0; i < 48; i++) {
            for(j = 0; j < length; j++) {
                let timeString;
                if (i >= 20) {
                    if (i % 2 == 0) {
                        timeString = i/2+":00";
                    } else {
                        timeString = (i-1)/2+":30";
                    }
                } else if (i < 20) {
                    if (i == 0) {
                       timeString = "00:00";
                    } else if (i == 1) {
                        timeString = "00:30";
                    } else if (i % 2 == 0) {
                        timeString = "0"+i/2+":00";
                    } else {
                        timeString = "0"+(i-1)/2+":30";
                    }
                } 
                if (promise[j].begins == timeString) { 
                    switch(promise[j].type) {
                        case "Homework":
                                $('div#'+i).html(`<button id="${i}" value="${promise[j].date}" class="event" style="background-color: #FFFF71;">${promise[j].title}: ${promise[j].description}. ${promise[j].begins} - ${promise[j].ends}. Location: ${promise[j].location}</button>`);
                                break;
                        case "Class":
                                $('div#'+i).html(`<button id="${i}" value="${promise[j].date}" class="event" style="background-color: #FFCF56;">${promise[j].title}: ${promise[j].description}. ${promise[j].begins} - ${promise[j].ends}. Location: ${promise[j].location}</button>`);
                                break;
                        case "Quiz":
                                $('div#'+i).html(`<button id="${i}" value="${promise[j].date}" class="event" style="background-color: #FF9B64;">${promise[j].title}: ${promise[j].description}. ${promise[j].begins} - ${promise[j].ends}. Location: ${promise[j].location}</button>`);
                                break;
                        case "Test":
                                $('div#'+i).html(`<button id="${i}" value="${promise[j].date}" class="event" style="background-color: #F84EAB;">${promise[j].title}: ${promise[j].description}. ${promise[j].begins} - ${promise[j].ends}. Location: ${promise[j].location}</button>`);
                                break;
                        case "Interview":
                                $('div#'+i).html(`<button id="${i}" value="${promise[j].date}" class="event" style="background-color: #AF4FCB;">${promise[j].title}: ${promise[j].description}. ${promise[j].begins} - ${promise[j].ends}. Location: ${promise[j].location}</button>`);
                                break;
                        case "Study":
                                $('div#'+i).html(`<button id="${i}" value="${promise[j].date}" class="event" style="background-color: #0059D7;">${promise[j].title}: ${promise[j].description}. ${promise[j].begins} - ${promise[j].ends}. Location: ${promise[j].location}</button>`);
                                break;
                        case "Project":
                                $('div#'+i).html(`<button id="${i}" value="${promise[j].date}" class="event" style="background-color: #FF6B85">${promise[j].title}: ${promise[j].description}. ${promise[j].begins} - ${promise[j].ends}. Location: ${promise[j].location}</button>`);
                                break;
                        
                    }                 
                    
                }

            }
        }
        });
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
    //weather api above
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
    let suggestions = ["Homework", "Class", "Test", "Quiz", "Project", "Interview", "Study"];
    $("#type").autocomplete({
        source: suggestions
    });
    


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

    // id like to do an isMine element instead of user but im not sure how???
    addEventRequest(title, date, begins, ends, description, location, type);
    $('div#dayView').replaceWith(renderDay());

}

async function addEventRequest(title, date, begins, ends, description, location, type) {
    try {
        if(type == "Class"){
            const res = await pubRoot.post(`public/${date.getFullYear()}/${date.getMonth()}/${date.getDate()}/Events`, 
                {data: [{
                    "title": title,
                    "date": date,
                    "begins": begins,
                    "ends": ends,
                    "description": description,
                    "location": location,
                    "type": type}],
                type: "merge"},
                {headers: {Authorization: `Bearer ${getToken()}`}}
            );
        }
        const res = await pubRoot.post(`user/${date.getFullYear()}/${date.getMonth()}/${date.getDate()}/Events`, 
            {data: [{
                "title": title,
                "date": date,
                "begins": begins,
                "ends": ends,
                "description": description,
                "location": location,
                "type": type}],
             type: "merge"},
            {headers: {Authorization: `Bearer ${getToken()}`}}
        );
        return true;
    } catch (error) {
        console.log(error.response.data);
        return false;
    }
}


export function changeView(event) {
    let dayView = `<div id="dayView">`;
    let newdate = new Date(event.target.value);
    let newday = newdate.getDay();
    let day = "";
    switch(newday) {
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
            <th>${hour + ":" + minutes + time}</th>
            <th><div id="${i}"></div></th></tr>`;
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

        const response = getEvents(newdate).then(function(promise){
            let length = promise.length;
            let j;
            let dayView = ``;
            for(let i = 0; i < 48; i++) {
            for(j = 0; j < length; j++) {
                let timeString;
                if (i >= 20) {
                    if (i % 2 == 0) {
                        timeString = i/2+":00";
                    } else {
                        timeString = (i-1)/2+":30";
                    }
                } else if (i < 20) {
                    if (i == 0) {
                       timeString = "00:00";
                    } else if (i == 1) {
                        timeString = "00:30";
                    } else if (i % 2 == 0) {
                        timeString = "0"+i/2+":00";
                    } else {
                        timeString = "0"+(i-1)/2+":30";
                    }
                }                   
                    if (promise[j].begins == timeString) { 
                        switch(promise[j].type) {
                            case "Homework":
                                    $('div#'+i).html(`<button id="${i}" value="${promise[j].date}" class="event" style="background-color: #FFFF71;">${promise[j].title}: ${promise[j].description}. ${promise[j].begins} - ${promise[j].ends}. Location: ${promise[j].location}</button>`);
                                    break;
                            case "Class":
                                    $('div#'+i).html(`<button id="${i}" value="${promise[j].date}" class="event" style="background-color: #FFCF56;">${promise[j].title}: ${promise[j].description}. ${promise[j].begins} - ${promise[j].ends}. Location: ${promise[j].location}</button>`);
                                    break;
                            case "Quiz":
                                    $('div#'+i).html(`<button id="${i}" value="${promise[j].date}" class="event" style="background-color: #FF9B64;">${promise[j].title}: ${promise[j].description}. ${promise[j].begins} - ${promise[j].ends}. Location: ${promise[j].location}</button>`);
                                    break;
                            case "Test":
                                    $('div#'+i).html(`<button id="${i}" value="${promise[j].date}" class="event" style="background-color: #F84EAB;">${promise[j].title}: ${promise[j].description}. ${promise[j].begins} - ${promise[j].ends}. Location: ${promise[j].location}</button>`);
                                    break;
                            case "Interview":
                                    $('div#'+i).html(`<button id="${i}" value="${promise[j].date}" class="event" style="background-color: #AF4FCB;">${promise[j].title}: ${promise[j].description}. ${promise[j].begins} - ${promise[j].ends}. Location: ${promise[j].location}</button>`);
                                    break;
                            case "Study":
                                    $('div#'+i).html(`<button id="${i}" value="${promise[j].date}" class="event" style="background-color: #0059D7;">${promise[j].title}: ${promise[j].description}. ${promise[j].begins} - ${promise[j].ends}. Location: ${promise[j].location}</button>`);
                                    break;
                            case "Project":
                                    $('div#'+i).html(`<button id="${i}" value="${promise[j].date}" class="event" style="background-color: #FF6B85">${promise[j].title}: ${promise[j].description}. ${promise[j].begins} - ${promise[j].ends}. Location: ${promise[j].location}</button>`);
                                    break;
                            
                        } 
                }

            }
        }
        }).catch(function(error) {
            // no promsises
        });
    

        


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
    <table align="center">
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
                    calendar += `<th><button value="${new Date(year, month, day)}" style="color: #E6E9C0;" class="date">${day}</button></th>`
                } else {
                    calendar += `<th><button value="${new Date(year, month, day)}" class="date">${day}</button></th>`;
                }
                day++;
            }
        }
        calendar+=`</tr>`;
    }
    calendar += `</table>`;

    calendar += `</div>`;

    $('div#calendar').replaceWith(calendar);
    
}


export async function statusCheck() {
    try {
        const res = await pubRoot.get("/account/status", {headers: {Authorization: `Bearer ${getToken()}`}});
        const data = res.data;
        return data;
    } catch(error) {
        logout();
    }

}

export function logout(event) {
    setToken("");
    setUser("");
    window.location.href = "http://localhost:3001/index.html";
}

export function goTo() {

    window.location.href = "http://localhost:3001/profile.html";
}

export function editDel(event) {
    $('div#'+event.target.id).html(`<p id="${event.target.id}">Edit or Delete Event?</p><button id="${event.target.id}" value="${event.target.value}" class="edit">Edit</button><button id="${event.target.id}" value="${event.target.value}" class="delete">Delete</button><button class="cancel">Cancel</button>`);
}

export function editEvent(event) {
    let form = `<div><form class="form">
    <div><label>Title:</label>
    <input placeholder="Enter Title Here" id="title2"></input></div>
    <div><label>Enter The Date:</label>
    <input placeholder="mm/dd/yyyy" id="date2"></input></div>
    <div><label>Beginning Time:</label>
    <input id="begin2" type="time"></input></div>
    <div><label>Ending Time:</label>
    <input id="end2" type="time"></input></div>
    <div><label>Enter Description:</label>
    <textarea id="description2"></textarea></div>
    <div><label>Enter Location:</label>
    <input id="location2" placeholder="Genome G0100"></input></div>
    <div><label>Select the Type of Event:</label>
    <input id="type2" placeholder="Homework"></input></div>
    <button type="submit" value="${event.target.value}"> Edit </button></form></div>`;
    $('div#'+event.target.id).replaceWith(form);
    let suggestions = ["Homework", "Class", "Test", "Quiz", "Project", "Interview", "Study"];
    $("#type").autocomplete({
        source: suggestions
    });
    
}

export function editEventForm(event) {
    event.preventDefault();
    
    let title = $('input#title2').val();
    let date = new Date($('input#date2').val()) // typing mm/dd/yyyy work for day at the moment'
    let begins = $('input#begin2').val()
    let ends = $('input#end2').val();
    let description = "" + $('textarea#description2').val();
    let location = "" + $('input#location2').val();
    let type = "" + $('input#type2').val();
    $('div#eventForm').replaceWith(`<div id="eventForm"></div>`);

    // request to delete the event here
    addEventRequest(title, date, begins, ends, description, location, type);
    $('div#dayView').replaceWith(renderDay());

}

export async function deleteEvent(event) {
    // request to edit the event here
    let today = new Date(event.target.value);
    let i = event.target.id;
    let timeString;
    if (i >= 20) {
        if (i % 2 == 0) {
            timeString = i/2+":00";
        } else {
            timeString = (i-1)/2+":30";
        }
    } else if (i < 20) {
        if (i == 0) {
            timeString = "00:00";
        } else if (i == 1) {
            timeString = "00:30";
        } else if (i % 2 == 0) {
            timeString = "0"+i/2+":00";
        } else {
            timeString = "0"+(i-1)/2+":30";
        }
    } 
    getEvents(today).then(async function(promise){
        let length = promise.length;
        let i;
        for(i = 0; i < length; i++) {
            if(promise[i].begins == timeString){
                promise.splice(i, 1);
            }
        }
        try {
            const res = await pubRoot.delete(`user/${today.getFullYear()}/${today.getMonth()}/${today.getDate()}/Events`, 
                {headers: {Authorization: `Bearer ${getToken()}`}}
            );
            const addNew = await pubRoot.post(`user/${today.getFullYear()}/${today.getMonth()}/${today.getDate()}/Events`, 
                {data: promise,
                    type: "merge"},
                {headers: {Authorization: `Bearer ${getToken()}`}}
            );
        } catch (error) {
            console.log(error);
        }
    });


}

export function cancelbutton(event) {
    $('div#dayView').replaceWith(renderDay());
}

export async function renderSite() {
    //renders the calendar and forms and views
    const $banner = $('#banner');
    const $root = $('#root');

    

    window.setInterval(function(){
      const loggedIn = statusCheck();
    }, 5000);

    $root.append(renderCal());
    $root.append(renderDay());
    $root.append(renderWeek());

    $root.on("click", ".eventButton", addEventsForm);
    $root.on("submit", ".eventSubmit", addEvent);
    $root.on("click", ".shift", newCalendar);
    $root.on("click", ".date", changeView);
    $banner.on("click", ".profile", goTo);
    $root.on("click", ".event", editDel);
    $banner.on("click", ".logout", logout);
    $root.on("click", ".cancel", cancelbutton);
    $root.on("click", ".edit", editEvent);
    $root.on("submit", ".form", editEventForm);
    $root.on("click", ".delete", deleteEvent);
}

async function getEvents(today) {
    try {
        const response = await pubRoot.get(`/user/${today.getFullYear()}/${today.getMonth()}/${today.getDate()}/Events`, 
            {headers: {Authorization: `Bearer ${getToken()}`}}
        );
        return response.data.result;
    } catch (error) {
        console.log(error);
        return false;
    }
}

$(function() {
    renderSite();
  });