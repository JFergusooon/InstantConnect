import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './componentStyling/popupStyle.css'

const Popup = ({text, closePopup}) => {
    const [curFunc, setCurFunc] = useState("login");

    const [inputUser, setInputUser] = useState("");
    const [inputPass, setInputPass] = useState("");


    const [regUser, setRegUser] = useState("");
    const [regPass, setRegPass] = useState("");
    const [regFirst, setRegFirst] = useState("");
    const [regLast, setRegLast] = useState("");
    const [regEmail, setRegEmail] = useState("");


    const [searUser, setSearUser] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const [allUsers, setAllUsers] = useState();


    useEffect(() => {
        let url = 'http://localhost:4006/user/'
        let encode = window.btoa("admin:admin");
        fetch(url, {
            headers: {
                'Authorization':  'Basic ' + encode }}
        )
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setAllUsers(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    function changeForm() {
        if(curFunc === "login")
            setCurFunc("register")
        if(curFunc === "register")
            setCurFunc("login")
    }

    function checkIfUser() {
        let match;



        console.log("LOGIN ATTEMPT : " + allUsers)
        for(let i = 0; i < allUsers.length; i++)
        {
            console.log(i + ":  " + allUsers[i].username)
            if(inputUser === allUsers[i].username)
            {
                // STILL NEED TO CHECK FOR PASSWORD CORRECTION
                match = true;
            }
        }



        return match;
    }


    function loginUser() {
        function check() { checkIfUser(); return checkIfUser();}

        if(check() === true) {
            localStorage.setItem('username', inputUser)
            localStorage.setItem('password', inputPass)
            console.log("cur Username : " + localStorage.getItem("username"))
            console.log("cur Password : " + localStorage.getItem("password"))
            closePopup()
        }



    }


    function registerUser() {
        let f_firstname = regFirst
        let f_lastname = regLast
        let f_username = regUser
        let f_email = regEmail
        let f_password = regPass

        let xhr = new XMLHttpRequest();
        let url = "http://localhost:4006/user/register/" + f_username + "/" + f_firstname + "/" + f_lastname + "/" + f_email + "/" + f_password
        xhr.open("POST", url, true);
        console.log(url)
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader( 'Access-Control-Allow-Origin', '*');
        xhr.send();
        console.log("REGISTERED USER" + f_username);
        closePopup()
    }



    function performSwitch() {
        switch(curFunc) {
            case 'login':
                return <div>
                    <h1>Login</h1>
                    <button onClick={closePopup} style={{float: "right", borderRadius: "10px", width: "25px", height: "25px"}}>X</button>

                    <div style={{display: "inline-block"}}>
                        <p> Username: </p><br/>
                        <input style={{height: "40px"}} onChange={({ target }) => setInputUser(target.value)}/> <br/>
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <div style={{display: "inline-block"}}>
                        <p> Password: </p>
                        <input style={{height: "40px", margin: "0 auto", float: "right"}} onChange={({ target }) => setInputPass(target.value)}/> <br/>
                    </div>
                    <br/>
                    <br/>

                    <button onClick={loginUser}> Submit </button>
                    <button onClick={changeForm}> Register </button>
                </div>;
            case 'register':
                return <div>
                    <h1>Register</h1>
                    <button onClick={closePopup} style={{float: "right", borderRadius: "10px", width: "25px", height: "25px"}}>X</button>
                    <div style={{display: "inline-block"}}>
                        <p> First Name: </p><br/>
                        <input style={{height: "40px"}} onChange={({ target }) => setRegFirst(target.value)}/> <br/>
                    </div>
                    <br/>
                    <div style={{display: "inline-block"}}>
                        <p> Last Name: </p><br/>
                        <input style={{height: "40px"}} onChange={({ target }) => setRegLast(target.value)}/> <br/>
                    </div>
                    <br/>
                    <div style={{display: "inline-block"}}>
                        <p> Username: </p><br/>
                        <input style={{height: "40px"}} onChange={({ target }) => setRegUser(target.value)}/> <br/>
                    </div>
                    <br/>
                    <div style={{display: "inline-block"}}>
                        <p> Email: </p><br/>
                        <input style={{height: "40px"}} onChange={({ target }) => setRegEmail(target.value)}/> <br/>
                    </div>
                    <br/>
                    <div style={{display: "inline-block"}}>
                        <p> Password: </p>
                        <input style={{height: "40px", margin: "0 auto"}} onChange={({ target }) => setRegPass(target.value)}/> <br/>
                    </div>
                    <br/>
                    <br/>
                    <button onClick={registerUser}> Submit </button>
                    <button onClick={changeForm}> Login </button>
                </div>
            default:
                return <p>DEFAULT</p>;
        }
    }

    return (
        <div className='popup'>
            <div className='popup_open'>
                {performSwitch()}

            </div>
        </div>
    );
};
export default Popup;