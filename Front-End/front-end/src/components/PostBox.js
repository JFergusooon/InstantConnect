
const PostBox = ({task}) => {
    const pBox = {
        backgroundColor: "white",
        width: "350px",
        height: "140px",
        borderRadius: "10px",
        fontSize: "30px",
        border: "1px solid black",
        margin: "0 auto",
        marginBottom: "10px"
    }
    const addButCss = {
        boxShadow :"inset 0 0 15px 3px #23395e",
        background: "#2e466e linear-gradient(to bottom, #2e466e 5%, #415989 100%)",
        borderRadius: "17px",
        border: "1px solid #1f2f47",
        display: "inline-block",
        cursor: "pointer",
        color: "#ffffff",
        fontFamily: "Arial, serif",
        fontSize: "20px",
        padding: "6px",
        textDecoration : "none",
        textShadow: "0 1px 0 #263666",
        width: "80px",
        height: "30px",
        float: "right",
        marginRight: "3px"
    }

    const taskId = task.postId;

    function likePost()
    {
        let u = localStorage.getItem("username");
        let p = localStorage.getItem("password");
        let auth = u + ":" + p;
        let encode = window.btoa(auth);





        let xhr = new XMLHttpRequest();
        console.log(u);
        let url = "http://localhost:4006/post/addLikes/" + taskId;
        console.log("URL : " + url)
        xhr.open("PUT", url, true);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader( 'Access-Control-Allow-Origin', '*');
        xhr.setRequestHeader('Authorization', 'Basic ' + encode);
        xhr.send();
        window.location.reload()
    }


    return (
        <div style={pBox}>
            <div style={{
                width: "100px",
                height: "100px",
                backgroundColor: "darkgray",
                marginTop: "20px",
                marginLeft: "20px",
                float: "left"
            }}/>
            <h3 style={{marginTop: "10px"}}>{task.username}</h3>
            <p style={{fontSize:"23px", height: "55px"}}>{task.postBody}</p>
            <button style={addButCss} onClick={likePost}>Like&nbsp;&nbsp;{task.likes}</button>

        </div>
    )
}

export default PostBox