import ProfileBox from "./ProfileBox";
import {useState} from "react";
const NewPost = ({people, closeBox}) => {
    const [curPostContent, setCurPostContent] = useState("");
    const [curPostPrivacy, setCurPostPrivacy] = useState("false");
    const [curChar, setCurChar] = useState(0);

    const submitCss = {
        background: "#f2f2f2",
        borderRadius: "17px",
        border: "1px solid white",
        cursor: "pointer",
        fontFamily: "Arial, serif",
        fontSize: "20px",
        padding: "6px",
        width: "100%",
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
        borderRadius: "5px", textAlign: "Center", background: "white",
        width: "660px", margin: "0 auto", height: "260px"}}>
        {/*<button style={{marginTop: "5px", marginRight: "5px",background: "maroon",color :"white", float: "right"}} onClick={closeBox}>X</button>*/}
        <textarea style={{borderRadius: "18px", width: "640px", marginTop: "10px", background: "lightgray", fontSize: "20px",height: "130px", maxLength: "75"}} onChange={({ target }) => {
            setCurPostContent(target.value);
            if(target.value.length > 75)
            {
                let half1 = target.value.substring(0,75).substring(0, target.value.length/2);
                let half2 = target.value.substring(0,75).substring(target.value.length/2);
                setCurPostContent(half1 + "\n" + half2)
                // setCurPostContent(target.value.substring(0,75));
            }
            else
            {
                let half1 = target.value.substring(0, target.value.length/2);
                let half2 = target.value.substring(target.value.length/2);
                setCurPostContent(half1 + "\n" + half2)
                // setCurPostContent(target.value);
            }
            setCurChar(target.value.length);

        }
        }/>

        <br/>
        <br/>
        <div style={{display: "inline-block", width: "75px", marginRight: "415px"}}>
            <input style={{float: "left"}} type='checkbox' onChange={({ target }) => setCurPostPrivacy(target.checked)}/>
            <p>Private?</p>
        </div>
        <div>
            <p style={{width: "190px"}}> {curChar} / 75 Characters</p>
            <br/>
            <button style={submitCss} onClick={newPostFunc}>Submit Post</button>
        </div>


    </div>
)
}

export default NewPost