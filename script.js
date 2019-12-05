// script for main app
export function renderCal() {
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let first = new Date(year,month,1).getDay();
    let days;
    switch(month) {
        case 1:
            month = "January";
            days = 31;
        case 2:
            month = "February";
            days = 28;
        case 3:
            month = "March";
            days = 31
        case 4: 
            month = "April";
            days = 30;
        case 5: 
            month = "May";
            days = 31;
        case 6:
            month = "June";
            days = 30;
        case 7: 
            month = "July";
            days = 31;
        case 8: 
            month = "August";
            days = 31;
        case 9:
            month = "September";
            days = 30;
        case 10:
            month = "October";
            days = 31;
        case 11:
            month = "November";
            days = 30;
        case 12:
            month = "December";    
            days = 31;    
    }
    if (month == 2) {
    for (let i = 2020; i < year+100; i=i+4) { // accounts for leap years
        if (year == i) {
            days++;
        }
    }
    }
    let calendar = `<div id="calendar">
    <table>
    <tr>
      <th colspan="7">${month}  ${year}</th>
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
            if ((day == 0 && i != first) || day > days) {
                calendar += `<th></th>`;
            } else {
                calendar += `<th>${day}</th>`;
                day++;
            }
        }
        calendar+=`</tr>`;
    }
    calendar += `</table></div>`;
    return calendar;
    //renders a monthly view of everything event you have on what days
}

export function renderDay() {
    //renders what you have due today
    let dayView = `<div id="dayView">`;
    let today = new Date();
    today = today.getDay();
    let day = "";
    if (today == 0) { //switch case wasn't working for some reason
        day = "Sunday";
    }
    if (today == 1) { //switch case wasn't working for some reason
        day = "Monday";
    }
    if (today == 2) { //switch case wasn't working for some reason
        day = "Tuesday";
    }
    if (today == 3) { //switch case wasn't working for some reason
        day = "Wednesday";
    }
    if (today == 4) { //switch case wasn't working for some reason
        day = "Thursday";
    }
    if (today == 5) { //switch case wasn't working for some reason
        day = "Friday";
    }
    if (today == 6) { //switch case wasn't working for some reason
        day = "Saturday";
    }
    dayView += `<header>${day}</header>`;

    dayView += `</div>`;
    return dayView;
}

export function renderWeek() {
    //renders whats due soon
}

export async function addEvents() {
    // button handler ability to create new events to give to axios/server
}


export async function renderSite() {
    //renders the calendar and forms and views
    const $root = $('#root');
    $root.append(renderCal());
    $root.append(renderDay());
    $root.append(renderWeek());
}

$(function() {
    renderSite();
  });