// script for signing up and in
import {setToken} from "../../Config/Token.js";
import { setUser } from "../../Config/User.js";

const pubRoot = new axios.create({
    baseURL: "http://localhost:3000"
});

export function signInForm() {
    // renders the sign in form
    return `
    <div id="signin">
        <h> Sign In </h>

        <label>Don't Have An Account?</label>
        <button class="signUpButton">Sign Up</button>

        <form class="signInForm">
            <label>Username:</label> <input id="user" ></input>
            <label>Password:</label> <input id="password" type="password"></input>
            <button type="submit">Sign In</button>
        </form> 
    <div>`;
}

async function signInRequest(username, password) {
    try {
        const res = await pubRoot.post(`/account/login`, {
            "name": username,
            "pass": password 
        });

        const jwt = res.data.jwt;
        setToken(jwt)
        setUser(username);
        return true;
    } catch (error) {
        alert(error.response.data["msg"]);
        return false;
    }
}

export async function signInHandler(event) {
 //handler for submit button using axios to confirm 
 //or deny user access, if WithCredentials true then 
 //grant access to main website. For now just grants access
    event.preventDefault();

    let userName = $('#user').val();
    let password = $('#password').val();

    signInRequest(userName, password).then(function(loggedIn) {
        if(loggedIn) {
            window.location.href = "http://localhost:3001/main.html";
        } 
    });

}

export function signUpForm() {
    // renders the sign up form
    $('#signin').replaceWith(`
    <div id="signup">
        <h> Sign Up </h>

        <label> Have An Account Already? </label>
        <button class="signInButton">Sign In</button>

        <form class="signUpForm">
            <label>Username:</label> <input id="user"></input>
            <label>Password:</label> <input id="password"></input>
            <label>Birthday:</label> <input id="birthday"></input>
            <label>Name:</label>     <input id="name"></input>

            <button type="submit">Create Account</button>
        </form>
    </div>`);
}

async function createUserAccount(name, pass, username, birthday) {
    try {
        const res = await pubRoot.post(`/account/create`, {
            "name": username,
            "pass": pass,
            "data": {
                "firstName": name,
                "birthday": birthday
            } 
        })
        return false;
    } catch (error) {
        console.log(error.response.data);
        alert(error.response.data["msg"]);
        return true;
    }
}

export async function signUpHandler(event) {
    event.preventDefault();
    let userName = $('#user').val();
    let name = $('#name').val();
    let password = $('#password').val();
    let birthday = $('#birthday').val();

    // handler for submit button
    // then submit to server using axios 'create' method
    var existing = createUserAccount(name, password, userName, birthday);
    
    // upon creating new account will switch back to sign in
    if(existing){
        signUpForm();
    } else {
        signInForm();
    }
}

export function signInSwitch() {
    // switches the sign up form with sign in
    $('#signup').replaceWith(signInForm());
}

export function renderSite() {
    const $root = $('#root');
    $root.append(signInForm());

    $root.on("submit", ".signInForm", signInHandler);
    $root.on("click", ".signInButton", signInSwitch);
    $root.on("click", ".signUpButton", signUpForm);
    $root.on("submit", ".signUpForm", signUpHandler);

}

$(function() {
    renderSite();
  });



