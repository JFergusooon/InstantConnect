import PropTypes from "prop-types";





const ProfileInfoBox = ({username, firstname, lastname, status, pageColor}) => {

    function addFriend() {
        let u = localStorage.getItem("username");
        let p = localStorage.getItem("password");
        let auth = u + ":" + p;
        let encode = window.btoa(auth);
        let sender = u;
        let receiver = username;
        let xhr = new XMLHttpRequest();
        console.log();



        let url = "http://localhost:4006/email/FriendRequestEmail/" + sender + "/" + receiver;
        console.log("URL : " + url)
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader( 'Access-Control-Allow-Origin', '*');
        xhr.setRequestHeader('Authorization', 'Basic ' + encode);
        xhr.send();
    }

    return (<div style={{background: "white", width: "500px", height: "700px", paddingTop: "75px", float: "left"}}>
                <div style={{background: {pageColor}.pageColor, height: "350px", width: "350px", marginLeft: "75px", borderRadius: "360px"}} />
                <br />
                <br />
                <br />
                <h1>{firstname} {lastname}</h1>
                <h1>{username}</h1>
                <h1>{status}</h1>



                <button onClick={addFriend} style={{marginTop: "65px", width: "100%", height: "45px", fontSize: "26px", background: "#f2f2f2", border: "1px solid lightgray"}}>Add Friend</button>
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
}

export default ProfileInfoBox;