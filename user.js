const User = class { // basic outline of user object
    constructor(name, user, password, birthday) {
        this.name = name;
        this.username = user; //unique name for people, cannot match any others
        this.password = password;
        this.birthday = birthday; // dealt with the same way as date, first event added to calendar.
    }
}