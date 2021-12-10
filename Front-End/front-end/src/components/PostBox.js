
const PostBox = ({task}) => {
    const pBox = {
        backgroundColor: "white",
        width: "520px",
        height: "140px",
        borderRadius: "5px",
        fontSize: "30px",
        margin: "0 auto",
        marginBottom: "10px"
    }
    const likeButCss = {
        background: "#f2f2f2",
        borderRight: "1px solid black",
        borderRadius: "5px",
        border: "solid 2px white",
        display: "inline-block",
        cursor: "pointer",
        fontFamily: "Arial, serif",
        fontSize: "20px",
        textDecoration : "none",
        width: "50%",
        height: "35px",
    }

    const commentButCss = {
        background: "#f2f2f2",
        borderLeft: "1px solid black",
        borderRadius: "5px",
        border: "solid 2px white",
        display: "inline-block",
        cursor: "pointer",
        fontFamily: "Arial, serif",
        fontSize: "20px",
        textDecoration : "none",
        width: "50%",
        height: "35px",
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
                width: "50px",
                height: "50px",
                backgroundColor: "darkgray",
                marginTop: "10px",
                marginLeft: "10px",
                float: "left", marginRight: "10px"
            }}/>
            <div style={{textAlign: "left", marginTop: "10px"}}>
                <a href={"http://localhost:3001/public/" + task.username} style={{marginTop: "10px", fontSize: "28px"}}>{task.username}</a>
                <p style={{fontSize:"23px", marginLeft: "40px", height: "55px"}}>{task.postBody}</p>
            </div>





            <div style={{marginTop: "15px", border: "0.5px solid gray"}}>
                <button style={likeButCss} onClick={likePost}>Like&nbsp;&nbsp;{task.likes}</button>
                <button style={commentButCss}>Comment</button>
            </div>


        </div>
    )
}

export default PostBox