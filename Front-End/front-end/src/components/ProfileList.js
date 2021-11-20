import ProfileBox from "./ProfileBox";
const ProfileList = ({people, index}) => {
    console.log("PROFILE LIST : " + people)

return (
        <div style={{textAlign: "Center"}}>
           {people.map((profile, index) => (
               <ProfileBox key={index} task={profile}/>
           ))}

        </div>
    )
}

export default ProfileList