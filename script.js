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
    } // change to buttons
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
                calendar += `<th><button class="date">${day}</button></th>`;
                day++;
            }
        }
        calendar+=`</tr>`;
    }
    calendar += `</table>
    <!-- weather widget start -->
    <div id="m-booked-bl-simple-week-vertical-87488"> 
    <div class="booked-wzs-160-275 weather-customize" style="background-color:#137AE9; width:160px;" id="width1 " > 
    <a target="_blank" class="booked-wzs-top-160-275" href="https://www.booked.net/">
    <img src="//s.bookcdn.com/images/letter/s5.gif" alt="booked net" /></a> <div class="booked-wzs-160-275_in"> 
    <div class="booked-wzs-160-275-data"> <div class="booked-wzs-160-275-left-img wrz-01"></div> <div class="booked-wzs-160-275-right"> 
    <div class="booked-wzs-day-deck"> <div class="booked-wzs-day-val"> <div class="booked-wzs-day-number"><span class="plus">+</span>5</div> 
    <div class="booked-wzs-day-dergee"> <div class="booked-wzs-day-dergee-val">&deg;</div> <div class="booked-wzs-day-dergee-name">C</div> 
    </div> </div> <div class="booked-wzs-day"> <div class="booked-wzs-day-d"><span class="plus">+</span>5&deg;</div> 
    <div class="booked-wzs-day-n"><span class="plus">+</span>2&deg;</div> </div> </div> <div class="booked-wzs-160-275-info"> 
    <div class="booked-wzs-160-275-city smolest">Chapel Hill</div> <div class="booked-wzs-160-275-date">Saturday, 07</div> </div> 
    </div> </div> <a target="_blank" href="https://www.booked.net/weather/chapel-hill-3975" class="booked-wzs-bottom-160-275" > 
    <table cellpadding="0" cellspacing="0" class="booked-wzs-table-160"> <tr> <td class="week-day"> <span class="week-day-txt">Sunday</span></td> 
    <td class="week-day-ico"><div class="wrz-sml wrzs-06"></div></td> <td class="week-day-val"><span class="plus">+</span>10&deg;</td> <td class="week-day-val">-1&deg;</td> 
    </tr> <tr> <td class="week-day"> <span class="week-day-txt">Monday</span></td> <td class="week-day-ico"><div class="wrz-sml wrzs-18"></div></td> 
    <td class="week-day-val"><span class="plus">+</span>17&deg;</td> <td class="week-day-val"><span class="plus">+</span>8&deg;</td> </tr> <tr> <td class="week-day"> 
    <span class="week-day-txt">Tuesday</span></td> <td class="week-day-ico"><div class="wrz-sml wrzs-18"></div></td> <td class="week-day-val"><span class="plus">+</span>20&deg;</td> 
    <td class="week-day-val"><span class="plus">+</span>6&deg;</td> </tr> <tr> <td class="week-day"> <span class="week-day-txt">Wednesday</span></td> <td class="week-day-ico">
    <div class="wrz-sml wrzs-18"></div></td> <td class="week-day-val"><span class="plus">+</span>9&deg;</td> <td class="week-day-val"><span class="plus">+</span>4&deg;</td> </tr> <tr> <td class="week-day"> 
    <span class="week-day-txt">Thursday</span></td> <td class="week-day-ico"><div class="wrz-sml wrzs-22"></div></td> <td class="week-day-val"><span class="plus">+</span>2&deg;</td> <td class="week-day-val">-3&deg;</td> </tr> <tr> 
    <td class="week-day"> <span class="week-day-txt">Friday</span></td> <td class="week-day-ico"><div class="wrz-sml wrzs-18"></div></td> <td class="week-day-val">
    <span class="plus">+</span>3&deg;</td> <td class="week-day-val"><span class="plus">+</span>1&deg;</td> </tr> </table> <div class="booked-wzs-center"> <span class="booked-wzs-bottom-l">See 7-Day Forecast</span> </div> </a> </div> </div><script type="text/javascript"> var css_file=document.createElement("link"); css_file.setAttribute("rel","stylesheet"); css_file.setAttribute("type","text/css"); css_file.setAttribute("href",'https://s.bookcdn.com/css/w/booked-wzs-widget-160x275.css?v=0.0.1'); document.getElementsByTagName("head")[0].appendChild(css_file); function setWidgetData(data) { if(typeof(data) != 'undefined' && data.results.length > 0) { for(var i = 0; i < data.results.length; ++i) { var objMainBlock = document.getElementById('m-booked-bl-simple-week-vertical-87488'); if(objMainBlock !== null) { var copyBlock = document.getElementById('m-bookew-weather-copy-'+data.results[i].widget_type); objMainBlock.innerHTML = data.results[i].html_code; if(copyBlock !== null) objMainBlock.appendChild(copyBlock); } } } else { alert('data=undefined||data.results is empty'); } } </script> <script type="text/javascript" charset="UTF-8" src="https://widgets.booked.net/weather/info?action=get_weather_info&ver=6&cityID=3975&type=4&scode=124&ltid=3458&domid=w209&anc_id=38584&cmetric=1&wlangID=1&color=137AE9&wwidth=160&header_color=ffffff&text_color=333333&link_color=08488D&border_form=1&footer_color=ffffff&footer_text_color=333333&transparent=0"></script></div>`;
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
    dayView += `<h>${day}</h>`;

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
            <th><button>Edit Event</button>
            <button>Delete Event</button></th>
            </tr>`;
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
    text += `<button class="eventButton">Add Event</button>`;
    text += `<div id="eventForm"></div>`;
    text += `</div>`;
    return text;
}

export function addEventsForm() {
    // button handler ability to create new events to give to axios/server
    let today = new Date();
    let form = `<div id="eventForm"><form class="eventSubmit">
    <label>Title:</label>
    <input placeholder="Enter Title Here" id="title"></input>
    <label>Enter The Date:</label>
    <input placeholder=${today} id="date"></input>
    <label>Enter Description:</label>
    <textarea id="description"></textarea>
    <label>Enter Location:</label>
    <input id="location" placeholder="Genome G0100"></input>
    <label>Select the Type of Event:</label>
    <input id="type" placeholder="Homework"></input>
    <button type="submit"> Create </button></form></div>`;
    $('div#eventForm').replaceWith(form);


}

export async function addEvent(event) {
    // submits form info to axios
    event.preventDefault();
    
    let title = "" +$('input#title').val();
    let date = new Date($('input#date').val()); // typing mm/dd/yyyy work at the moment
    let description = "" + $('textarea#description').val();
    let location = "" + $('input#location').val();
    let type = "" + $('input#type').val();
    $('div#eventForm').replaceWith(`<div id="eventForm"></div>`);
     
    alert(title + date + description + location + type);


}


export async function renderSite() {
    //renders the calendar and forms and views
    const $root = $('#root');
    $root.append(renderCal());
    $root.append(renderDay());
    $root.append(renderWeek());

    $root.on("click", ".eventButton", addEventsForm);
    $root.on("submit", ".eventSubmit", addEvent);

}

$(function() {
    renderSite();
  });