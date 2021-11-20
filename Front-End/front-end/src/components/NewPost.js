import ProfileBox from "./ProfileBox";
import {useState} from "react";
const NewPost = ({people, index}) => {
    const [curPostContent, setCurPostContent] = useState("");
    const [curPostPrivacy, setCurPostPrivacy] = useState("false");


    const submitCss = {
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
        width: "175px",
        height: "40px"
    }

    function newPostFunc() {
        let u = localStorage.getItem("username");
        let p = localStorage.getItem("password");
        let auth = u + ":" + p;
        let encode = window.btoa(auth);

        let postData = curPostContent;

        let privacyData = curPostPrivacy;



        let xhr = new XMLHttpRequest();

        let url = "http://localhost:4006/post/create/" + u + "/" + postData + "/" + privacyData;
        console.log("URL : " + url)
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader( 'Access-Control-Allow-Origin', '*');
        xhr.setRequestHeader('Authorization', 'Basic ' + encode);
        xhr.send();



        console.log("POST CREATED BY : " + u);
    }


return (
    <div style={{
        textAlign: "Center", background: "steelblue",
        width: "600px", margin: "0 auto", height: "300px"}}>

        <input style={{width: "500px", marginTop: "30px", height: "140px"}} onChange={({ target }) => setCurPostContent(target.value)}/>
        <br/>
        <div style={{display: "inline-block"}}>
            <input type='checkbox' onChange={({ target }) => setCurPostPrivacy(target.checked)}/>
            <p style={{float: ""}}>Private?</p>
        </div>

        <div style={{display: "inline-block", marginTop: "80px"}}>
            <p style={{float: "left", paddingRight: "200px"}}> 0 / 250 Characters</p>
            <button style={submitCss} onClick={newPostFunc}>Submit Post</button>
        </div>

    </div>
)
}

export default NewPost