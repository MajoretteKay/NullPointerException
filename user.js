const User = class {
    constructor(name, user, email, password, birthday) {
        this.name = name;
        this.username = user; //unique name for people
        this.email = email;
        this.password = password;
        this.birthday = birthday; // dealt with the same way as date, first event added to calendar.
    }
}