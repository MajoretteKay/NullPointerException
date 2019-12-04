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

export async function signInHandler() {
 //handler for submit button using axios to confirm 
 //or deny user access, if WithCredentials true then 
 //grant access to main website.

    
}

export async function signUpForm() {
    // renders the sign up form
    $('#signin').replaceWith(`<div id="signup">
    <h> Sign Up </h>
    <form class="">
    <label>Username:</label>
    <input></input>
    <label>Password:</label>
    <input></input>
    <label>Birthday:</label>
    <input></input>
    <label>First Name:</label>
    <input></input>
    <label>Last Name:</label>
    <input></input>
    </form>
    </div>`);
}

export async function signUpHandler() {
    //handler for submit button
}

export async function signInSwitch() {
    // switches the sign up form with sign in
    $('#signin').replaceWith(signInForm());
}

export async function renderSite() {
    const $root = $('#root');
    $root.append(signInForm());

    $root.on("submit", ".signInForm", signInHandler);
    $root.on("click", ".signUpButton", signUpForm);
    $root.on("submit", ".signupForm", signUpHandler);
    $root.on("click", ".signInButton", signInSwitch);

}

$(function() {
    renderSite();
  });