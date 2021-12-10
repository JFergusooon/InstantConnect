
const ProfileBox = ({task}) => {
    const pBox = {
        backgroundColor: "lightgray",
        width: "370px",
        height: "150px",
        borderRadius: "10px",
        fontSize: "30px",
        border: "1px solid black",
        margin: "0 auto",
        marginBottom: "10px"
    }

    const addButCss = {
        background: "white",
        borderRadius: "5px",
        border: "solid 2px white",
        display: "inline-block",
        cursor: "pointer",
        fontFamily: "Arial, serif",
        fontSize: "20px",
        textDecoration : "none",
        width: "50%",
        height: "35px"
    }


    function sendRequest() {
        let u = localStorage.getItem("username");
        let p = localStorage.getItem("password");
        let auth = u + ":" + p;
        let encode = window.btoa(auth);





        let xhr = new XMLHttpRequest();
        console.log(u);
        let url = "http://localhost:4006/email/FriendRequestEmail/" + u + "/" + task.username;
        console.log("URL : " + url)
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader( 'Access-Control-Allow-Origin', '*');
        xhr.setRequestHeader('Authorization', 'Basic ' + encode);
        xhr.send();
    }



    return (
        <div style={pBox}>
            <div style={{ width: "100px", height: "100px",
                backgroundColor: task.pageColor, float: "left",
                marginTop: "20px", marginLeft: "20px"}}/>
            <a href={"http://localhost:3001/public/" + task.username}>{task.username}</a>
            <p style={{fontSize:"23px", height: "55px"}}>{task.status}</p>
            <button style={addButCss} onClick={sendRequest}>Add Friend</button>
        </div>
    )
}

export default ProfileBox