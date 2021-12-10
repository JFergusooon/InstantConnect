import FrBox from "./FrBox";
import PropTypes from "prop-types";
import ProfileInfoBox from "./ProfileInfoBox";

const FriendsBox = ({friends}) => {

    console.log(friends[0])
    return (
        <>
            <br/>
            <br/>
            <br/>
            <br/>

            <div style={{margin: "0 auto",textAlign: "center", background: "white", height: "200px"}}>
                {/*<FrBox friend={{"pageColor": "Blue", "username": "ariaaa"}}/>*/}
                {/*<FrBox friend={friends}/>*/}
                {friends.map((profile, index) => (
                    <>
                        <br/>
                        <FrBox key={index} friend={profile}/>
                    </>
                ))}
            </div>
        </>

    )
}

FriendsBox.defaultProps = {

}
FriendsBox.propTypes = {
    friends: PropTypes.array.isRequired
}

export default FriendsBox