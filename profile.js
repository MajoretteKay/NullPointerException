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
        <h>${getUser()}</h>

        <form class="updateBirthday">
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
        logout();
    }

}

export async function updateCalendar(event) {
    event.preventDefault();
    let birthday = new Date($('#birthday').val());

    try {
        const res = await pubRoot.delete(`/private/${getUser()}/birthday`, 
            {headers: {Authorization: `Bearer ${getToken()}`}}
        );
    }catch (error) {

    }
    const res = await pubRoot.post(`/private/${getUser()}`, 
        {data:{ birthday: birthday }},
        {headers: {Authorization: `Bearer ${getToken()}`}}
    );
}

function calendarSwitch() {
    window.location.href = "http://localhost:3001/main.html";
}

export async function renderSite() {
    const $root = $(`#root`);
    const $banner = $('#banner');

    window.setInterval(function() {
        const loggedIn = statusCheck();
    }, 5000);

    $root.append(renderUserAccountEditForm());
    $root.on("submit", ".updateBirthday", updateCalendar);
    $banner.on("click", ".logout", logout);
    $banner.on("click", ".calendar", calendarSwitch);
}

$(function() {
    renderSite();
})