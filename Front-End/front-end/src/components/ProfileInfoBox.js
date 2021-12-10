import PropTypes from "prop-types";
import FriendsBox from "./FriendsBox";
import {useEffect, useState} from "react";





const ProfileInfoBox = ({username, firstname, lastname, status, pageColor, friendss}) => {
    function addFriend() {
        let u = localStorage.getItem("username");
        let p = localStorage.getItem("password");
        let auth = u + ":" + p;
        let encode = window.btoa(auth);
        let xhr = new XMLHttpRequest();
        console.log();



        let url = "http://localhost:4006/user/addFriend/" + u + "/" + username;
        console.log("URL : " + url)
        xhr.open("PUT", url, true);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader( 'Access-Control-Allow-Origin', '*');
        xhr.setRequestHeader('Authorization', 'Basic ' + encode);
        xhr.send();
    }


    let fri;
    if(friendss === undefined)
    {
        fri = [{"pageColor": "Blue", "username": "ariaaa"}, {"pageColor": "Green", "username": "ReactorRam"}]
    }

    console.log("FRIENDS : " + {fri})
    //friendss = Object.entries(fri)
    console.log("oo")
    console.log(friendss)
    return (<div style={{background: "white", width: "500px", height: "700px", paddingTop: "75px", float: "left"}}>
                <div style={{background: {pageColor}.pageColor, height: "350px", width: "350px", marginLeft: "75px", borderRadius: "360px"}} />
                <br />
                <br />
                <br />
                <h1>{firstname} {lastname}</h1>
                <h1>{username}</h1>
                <h1>"{status}"</h1>



                <button onClick={addFriend} style={{marginTop: "65px", width: "100%", height: "45px", fontSize: "26px", background: "#f2f2f2", border: "1px solid lightgray"}}>Add Friend</button>


            {/*<FriendsBox friends={friendss}/>*/}
            {friendss.length > 0 ? <FriendsBox friends={friendss}/> : "No Friends To Show"}
            </div>
    )
}

ProfileInfoBox.defaultProps = {

}
ProfileInfoBox.propTypes = {
    username: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    pageColor: PropTypes.string.isRequired,
    friendss: PropTypes.array.isRequired
}

export default ProfileInfoBox;