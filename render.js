// script for signing up and in

export function signInForm() {
    // renders the sign in form
    return `<div id="signin">
    <h> Sign In </h>
    <label>Don't Have An Account?</label>
    <button class="signUpButton">Sign Up</button>
    <form class="signInForm">
    <label>Userame:</label>
    <input></input>
    <label>Password:</label>
    <input type="password"></input>
    <button type="submit">Sign In</button>
    </form> 
    <div>`;
}

export async function signInHandler(event) {
 //handler for submit button using axios to confirm 
 //or deny user access, if WithCredentials true then 
 //grant access to main website. For now just grants access
    event.preventDefault();
    window.location.href = "http://localhost:3000/main.html";
     
}

export function signUpForm() {
    // renders the sign up form
    $('#signin').replaceWith(`<div id="signup">
    <h> Sign Up </h>
    <label>Have An Account Already?</label>
    <button class="signInButton">Sign In</button>
    <form class="signUpForm">
    <label>Username:</label>
    <input id="user"></input>
    <label>Password:</label>
    <input id="password"></input>
    <label>Birthday:</label>
    <input id="birthday"></input>
    <label>Your Name:</label>
    <input id="name"></input>
    <button type="submit">Create Account</button>
    </form>
    </div>`);
}

export async function signUpHandler(event) {
    event.preventDefault();
    //handler for submit button
    let user = new User($('#name').val(), $('#user').val(), $('#password').val(), $('#birthday'));
    //then submit to server using axios 'create' method
    
    //upon creating new account will switch back to sign in
    signInSwitch();
}

export function signInSwitch() {
    // switches the sign up form with sign in
    $('#signup').replaceWith(signInForm());
}

export function renderSite() {
    const $root = $('#root');
    $root.append(signInForm());

    $root.on("submit", ".signInForm", signInHandler);
    $root.on("click", ".signUpButton", signUpForm);
    $root.on("submit", ".signUpForm", signUpHandler);
    $root.on("click", ".signInButton", signInSwitch);

}

$(function() {
    renderSite();
  });