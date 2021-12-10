import PropTypes from "prop-types";

const EditProfileBox = ({curColor}) => {

    function updateProfile() {
        let u = localStorage.getItem("username");
        let p = localStorage.getItem("password");
        let auth = u + ":" + p;
        let encode = window.btoa(auth);

        let newUsername = document.getElementById('userInput').value;
        let newPassword = document.getElementById('passInput').value;
        let newFirstName = document.getElementById('firstInput').value;
        let newLastName = document.getElementById('lastInput').value;
        let newEmail = document.getElementById('emailInput').value;
        let newMotto = document.getElementById('mottoInput').value;
        let newColor = document.getElementById('pcInput').value;

        console.log("newUsername : " + newUsername)
        console.log("newPassword : " + newPassword)
        console.log("newFirstName : " + newFirstName)
        console.log("newLastName : " + newLastName)
        console.log("newEmail : " + newEmail)
        console.log("newMotto : " + newMotto)
        console.log("newColor : " + typeof newColor)


        if(newUsername === "") {
            newUsername = " ";
        }
        if(newPassword === "") {
            newPassword = " ";
        }
        if(newFirstName === "") {
            newFirstName = " ";
        }
        if(newLastName === "") {
            newLastName = " ";
        }
        if(newEmail === "") {
            newEmail = " ";
        }
        if(newMotto === "") {
            newMotto = " ";
        }
        if(newColor === "" || newColor === null) {
            newColor = curColor;
        }



        let xhr = new XMLHttpRequest();
        let url = "http://localhost:4006/user/updateUser/" +


            u + "/" + newUsername + "/" + newPassword + "/" + newFirstName + "/" +
            newLastName + "/" + newEmail + "/" + newMotto + "/" + (newColor !== "" ? newColor : "");


        console.log("URL : " + url)
        xhr.open("PUT", url, true);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader( 'Access-Control-Allow-Origin', '*');
        xhr.setRequestHeader('Authorization', 'Basic ' + encode);
        xhr.send();

        window.location.href= '/private/' + u;
    }





    return (<div style={{background: "gray", width: "500px", height: "370px", paddingTop: "30px", float: "left"}}>
            <input placeholder="Username" style={{width: "300px", height: "40px", fontSize: "23px"}} id={'userInput'}/> <br />
            <input placeholder="Password" style={{width: "300px", height: "40px", fontSize: "23px"}} id={'passInput'}/> <br />
            <input placeholder="Email" style={{width: "300px", height: "40px", fontSize: "23px"}} id={'emailInput'}/> <br />
            <input placeholder="FirstName" style={{width: "300px", height: "40px", fontSize: "23px"}} id={'firstInput'}/> <br />
            <input placeholder="LastName" style={{width: "300px", height: "40px", fontSize: "23px"}} id={'lastInput'}/> <br />
            <input placeholder="Status" style={{width: "300px", height: "40px", fontSize: "23px"}} id={'mottoInput'}/> <br />
            <input placeholder="Page Color" style={{width: "300px", height: "40px", fontSize: "23px"}} id={'pcInput'}/> <br />




            <br />
            <button onClick={updateProfile} style={{width: "200px", height: "40px", fontSize: "18px"}}> Update Attributes</button>
        </div>
    )
}

EditProfileBox.defaultProps = {

}
EditProfileBox.propTypes = {
}

export default EditProfileBox;