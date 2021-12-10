import PropTypes from "prop-types";

const EditProfileBox = ({}) => {

    function updateUser() {

    }





    return (<div style={{background: "gray", width: "500px", height: "350px", paddingTop: "30px", float: "left"}}>
            <input placeholder="Username" style={{width: "300px", height: "40px", fontSize: "25px"}}/> <br />
            <input placeholder="Password" style={{width: "300px", height: "40px", fontSize: "25px"}}/> <br />
            <input placeholder="Email" style={{width: "300px", height: "40px", fontSize: "25px"}}/> <br />
            <input placeholder="FirstName" style={{width: "300px", height: "40px", fontSize: "25px"}}/> <br />
            <input placeholder="LastName" style={{width: "300px", height: "40px", fontSize: "25px"}}/> <br />
            <input placeholder="Status" style={{width: "300px", height: "40px", fontSize: "25px"}}/> <br />
            <input placeholder="Page Color" style={{width: "300px", height: "40px", fontSize: "25px"}}/> <br />





            <button onClick={updateUser}> Update Attributes</button>
        </div>
    )
}

EditProfileBox.defaultProps = {

}
EditProfileBox.propTypes = {
    username: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    pageColor: PropTypes.string.isRequired,
}

export default EditProfileBox;