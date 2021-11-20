let form = document.getElementById("myForm");
let loginDiv = document.getElementById("LOGINDIV");
let registerDiv = document.getElementById("REGISTERDIV");
let registerButton = document.getElementById('registerButton');

function handleForm() {
    if(form.style.display === "block")
    {
        form.style.display = 'none';
    }
    else if (form.style.display === "")
    {
        form.style.display = 'block';
    }
    else if (form.style.display === "none")
    {
        form.style.display = 'block';
    }
}


function changeRegisterLogin() {
    console.log("REGISTER LOGIN SWITCH")
    if(loginDiv.style.display === 'block') {
        registerDiv.style.display = 'block';
        loginDiv.style.display = 'none';
        registerButton.textContent = 'Login';
    }
    else if(registerDiv.style.display === 'block') {
        loginDiv.style.display = 'block';
        registerDiv.style.display = 'none';
        registerButton.textContent = 'Register';
    }

}


function unsaveCredentials() {
    console.log("UNSAVING CREDENTIALS")
    localStorage.removeItem('storedUsername')
    localStorage.removeItem('storedPassword')

    console.log(localStorage.getItem('storedUsername'))
    console.log(localStorage.getItem('storedPassword'))
    window.location.href='/home'
    handleLoginLogoutSwitch()
}