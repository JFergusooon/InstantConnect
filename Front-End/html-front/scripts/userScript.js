let username;
let password;
/*

var someVarName = "value";
localStorage.setItem("someVarKey", someVarName);

var someVarName = localStorage.getItem("someVarKey");


*/
function registerUser() {
    let f_firstname = document.getElementById('i_firstname').value;
    let f_lastname = document.getElementById('i_lastname').value;
    let f_username = document.getElementById('i_username').value;
    let f_email = document.getElementById('i_email').value;
    let f_password = document.getElementById('i_password').value;

    let xhr = new XMLHttpRequest();
    let url = "http://localhost:4006/user/register/" + f_username + "/" + f_firstname + "/" + f_lastname + "/" + f_email + "/" + f_password
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader( 'Access-Control-Allow-Origin', '*');
    xhr.send();
    handleForm()
    console.log("REGISTERED USER" + f_username);
}

function login(){
    localStorage.removeItem("storedUsername");
    localStorage.removeItem("storedPassword");

    username = document.getElementById("ii_username").value;
    password = document.getElementById("ii_password").value;
    console.log("Login Executed: " + username + ":" + password);
    document.getElementById("ii_username").value = "";
    document.getElementById("ii_password").value = "";


    localStorage.setItem("storedUsername", username);
    localStorage.setItem("storedPassword", password);
}


async function loginUser() {
    login()
    handleForm()
    handleLoginLogoutSwitch()
    window.location.href='/home'
}





function createPost() {
    let u = localStorage.getItem("storedUsername");
    let p = localStorage.getItem("storedPassword");
    let auth = u + ":" + p;
    let encode = window.btoa(auth);

    let postData = document.getElementById('postBody').value;

    let privacyData = document.getElementById('isPrivateBox').checked;



    let xhr = new XMLHttpRequest();

    let url = "http://localhost:4006/post/create/" + u + "/" + postData + "/" + privacyData;
    console.log("URL : " + url)
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader( 'Access-Control-Allow-Origin', '*');
    xhr.setRequestHeader('Authorization', 'Basic ' + encode);
    xhr.send();

    document.getElementById('newPostForm').style.display = 'none';

    console.log("POST CREATED BY : " + u);
}

function finishAddFriend(sender, receiver) {
    let u = localStorage.getItem("storedUsername");
    let p = localStorage.getItem("storedPassword");
    let auth = u + ":" + p;
    let encode = window.btoa(auth);

    let xhr = new XMLHttpRequest();

    let url = "http://localhost:4006/user/addFriend/" + sender + "/" + receiver;
    console.log("URL : " + url)
    xhr.open("PUT", url, true);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader( 'Access-Control-Allow-Origin', '*');
    xhr.setRequestHeader('Authorization', 'Basic ' + encode);
    xhr.send();
}