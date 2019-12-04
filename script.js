// script for main app
export function renderCal() {
    let today = new Date();
    let month = today.getMonth();
    switch(month) {
        case 1:
            month = "January";
        case 2:
            month = "February";
        case 3:
            month = "March";
        case 4: 
            month = "April";
        case 5: 
            month = "May";
        case 6:
            month = "June";
        case 7: 
            month = "July";
        case 8: 
            month = "August";
        case 9:
            month = "September";
        case 10:
            month = "October";
        case 11:
            month = "November";
        case 12:
            month = "December";        
    }
    let year = today.getFullYear();
    let calendar = `<div id="calendar">
    <table id=calendar>
    <tr class="month">
      <th>${month}  <span class="year">${year}</span></th>
    </tr>
  <tr class="weekdays">
    <th>Mo</th>
    <th>Tu</th>
    <th>We</th>
    <th>Th</th>
    <th>Fr</th>
    <th>Sa</th>
    <th>Su</th>
  </tr>`;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 7; j++) {

        }
    }
    calendar += `</table></div>`;
    return calendar;
    //renders a monthly view of everything event you have on what days
}

export function renderDay() {
    //renders what you have due today
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