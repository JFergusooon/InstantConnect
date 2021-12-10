import PropTypes from "prop-types";
import FriendsBox from "./FriendsBox";

const PrFrBox = ({friend}) => {
    console.log(friend)
    console.log(friend.pageColor)
    console.log(friend.username)




    function deleteFriend() {
        let u = localStorage.getItem("username");
        let p = localStorage.getItem("password");
        let auth = u + ":" + p;
        let encode = window.btoa(auth);





        let xhr = new XMLHttpRequest();
        console.log(u);
        let url = "http://localhost:4006/user/removeFriend/"+ u + "/" + friend.username;
        console.log("URL : " + url)
        xhr.open("PUT", url, true);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader( 'Access-Control-Allow-Origin', '*');
        xhr.setRequestHeader('Authorization', 'Basic ' + encode);
        xhr.send();
    }



    return (
        <div style={{background: "#f2f2f2", height: "70px", display: "flex"}}>

            <div style={{background: friend.pageColor, width: "40px", height: "40px", marginLeft: "20px", marginTop: "18px"}} />
            <h2 style={{float: "right", marginTop: "22px", marginLeft: "20px", paddingRight: "50%", width: "300px"}}><a href={"http://localhost:3001/public/" + friend.username}>{friend.username}</a></h2>
            <button style={{marginTop: "22px", height: "30px", marginLeft: "100px"}} onClick={deleteFriend}>X</button>
        </div>
    )
}
PrFrBox.propTypes = {
    friend: PropTypes.object.isRequired
}
export default PrFrBox