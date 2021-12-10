import PropTypes from "prop-types";
import {useState} from "react";
import EditProfileBox from "./EditProfileBox";

const PrProfileInfoBox = ({username, firstname, lastname, status, pageColor}) => {
    const [showEdit, setShowEdit] = useState(false);

    function changeEdit() {
        setShowEdit(!showEdit)
    }



    return (<div style={{background: "white", width: "500px", height: "700px", paddingTop: "75px", float: "left"}}>
            <div style={{background: {pageColor}.pageColor, height: "350px", width: "350px", marginLeft: "75px", borderRadius: "360px"}} />
            <br />
            <br />
            <br />
            <h1>{firstname} {lastname}</h1>
            <h1>{username}</h1>
            <h1>{status}</h1>




            <button onClick={changeEdit} style={{marginTop: "65px", width: "100%", height: "45px", fontSize: "26px", background: "#f2f2f2", border: "1px solid lightgray"}}> Edit Profile </button>
            {showEdit ? <EditProfileBox /> : null}
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
}

export default PrProfileInfoBox;