import PropTypes from "prop-types";

const MoreDetails = ({email}) => {
    return (<div style={{background: "white", width: "1000px", height: "250px",
                        paddingTop: "75px", marginTop: "75px", float: "right", marginRight: "11%"}}>





            <p style={{marginLeft: "20px", float: "left", fontSize: "24px"}}>Email: {email}</p>


        </div>
    )
}

MoreDetails.defaultProps = {

}
MoreDetails.propTypes = {
    email: PropTypes.string.isRequired
}

export default MoreDetails;