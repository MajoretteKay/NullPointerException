// script for signing up and in

export function signInForm() {
    // renders the sign in form
    return `<div id="signin">
    <label>Don't Have An Account?</label>
    <button>Sign Up</button>
    <form id="signInForm">
    <label>Userame</label>
    <input></input>
    <label>Password</label>
    <input></input>
    <button type="submit">Sign In</button>
    </form> 
    <div>`;
}

export async function signInHandler() {
 //cant be blank
}

export async function signUpForm() {
    // renders the sign up form
    $('#signin').replaceWith(`
    `);
}

export async function renderSite() {
    const $root = $('#root');
    $root.append(signInForm());

    $root.on("submit", "#signInForm", signInHandler);
    $root.on("click", "#signupForm", signUpForm);
    $root.on("submit", "", signInHandler);
    $root.on("click", "", signInForm);

}

$(function() {
    renderSite();
  });