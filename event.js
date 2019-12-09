const Event = class {
    //An event is what we will store in the backend to retrieve for users with the same author. 
    //This is an outline of the object we will be using and can be called with new Event().
    constructor(id, name, title, date, ends, type, description, location) {
        this.id = id; //unique id of an event
        this.user = name; //the username of the event creator.(also unique)
        this.title = title; //the name of the event
        this.date = date; // may need more work depending on form used (this includes date and time), start time of event
        this.ends = ends; //ending time of event
        this.type = type; //type of event: homework, quiz, test, interview, etc.
        this.info = description; //custom description of the event with user input
        this.location = location; //location 
    }

}