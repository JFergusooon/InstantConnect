import PropTypes from "prop-types";
import {useState} from "react";
import EditProfileBox from "./EditProfileBox";
import FriendsBox from "./FriendsBox";
import PrFriendsBox from "./PrFriendsBox";

const PrProfileInfoBox = ({username, firstname, lastname, status, pageColor, friendss}) => {
    const [showEdit, setShowEdit] = useState(false);

    function changeEdit() {
        setShowEdit(!showEdit)
    }

    let publicUrl = "http://localhost:3001/public/" + localStorage.getItem('username')


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


            <br/>
            <br/>
            <br/>
            <a style={{fontSize: "14px", marginTop: "65px"}} href={publicUrl}>{localStorage.getItem('username') !== "" ? "View Public Profile" : ""}</a>
            <button onClick={changeEdit} style={{width: "100%", height: "45px", fontSize: "26px", background: "#f2f2f2", border: "1px solid lightgray"}}> Edit Profile </button>
            {friendss.length > 0 ? <PrFriendsBox friends={friendss}/> : "No Friends To Show"}
            {showEdit ? <EditProfileBox curColor = {pageColor}/> : null}
        </div>
    )
}

PrProfileInfoBox.defaultProps = {

}
PrProfileInfoBox.propTypes = {
    username: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    pageColor: PropTypes.string.isRequired,
    friendss: PropTypes.array.isRequired
}

export default PrProfileInfoBox;