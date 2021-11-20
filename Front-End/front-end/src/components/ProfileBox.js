
const ProfileBox = ({task}) => {
    const pBox = {
        backgroundColor: "lightgray",
        width: "350px",
        height: "150px",
        borderRadius: "10px",
        fontSize: "30px",
        border: "1px solid black",
        margin: "0 auto",
        marginBottom: "10px"
    }

    const addButCss = {
        marginTop: "20px",
        boxShadow :"inset 0 0 15px 3px #23395e",
        background: "#2e466e linear-gradient(to bottom, #2e466e 5%, #415989 100%)",
        borderRadius: "17px",
        border: "1px solid #1f2f47",
        cursor: "pointer",
        color: "#ffffff",
        fontFamily: "Arial, serif",
        fontSize: "20px",
        padding: "6px",
        textDecoration : "none",
        textShadow: "0 1px 0 #263666",
        width: "150px",
        height: "30px",
        float: "right"
    }

    return (
        <div style={pBox}>
            <div style={{ width: "100px", height: "100px",
                backgroundColor: task.pageColor, float: "left",
                marginTop: "30px", marginLeft: "30px"}}/>
            <h3 style={{}}>{task.username}</h3>
            <p style={{fontSize:"23px", height: "55px"}}>{task.status}</p>
            <button style={addButCss}>Add Friend</button>
        </div>
    )
}

export default ProfileBox