import {setToken} from "../../Config/Token.js";
import {getToken} from "../../Config/Token.js";
import { getUser } from "../../Config/User.js";
import { setUser } from "./Config/User.js";

const pubRoot = new axios.create({
    baseURL: "http://localhost:3000"
});

export function renderUserAccountEditForm() {
    return `
    <div id="signup">
        <h>Account Information</h>

        <div><label>${getUser()}</label>
        <button class="backButton">Back</button></div>

        <form class="signUpForm">
            <div><label>Birthday:</label> <input id="birthday" placeholder="mm/dd/yyyy"></input></div>

            <button type="submit">Update Birthday</button>
        </form>
    </div>`;
}

export function logout(event) {
    setToken("");
    setUser("");
    window.location.href = "http://localhost:3001/index.html";
}

export async function statusCheck() {
    try {
        const res = await pubRoot.get("/account/status", {headers: {Authorization: `Bearer ${getToken()}`}});
        const data = res.data;
        return data;
    } catch(error) {
        alert(getToken());
        logout();
    }

}

export async function renderSite() {
    const $root = $(`#root`);


    window.setInterval(function() {
        const loggedIn = statusCheck();
    }, 5000);

    $root.append(renderUserAccountEditForm());
}

$(function() {
    renderSite();
})