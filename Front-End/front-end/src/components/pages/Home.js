import ProfileList from "../ProfileList";
import Trending from "./Trending";
import Button from "../Button";
import {useState} from "react";
import NewPost from "../NewPost";

const Home = () => {
    const [writePost, setWritePost] = useState(false);
    function changeWP() {
        setWritePost(!writePost)
    }


    return (
        <div style={{textAlign: "center"}}>
            <br/>
            <div style={{display: "inline-block"}}>
                <h1 style={{float: "left", marginLeft: "250px"}}> Home </h1>
                <button style={{marginLeft: "150px", width: "150px", borderRadius: "10px", fontSize: "20px", background: "#e0961f", height: "40px", fontWeight: "bold", float: "right"}} onClick={changeWP}>Write Post</button>

            </div>
            <br/>
            <br/>

            {writePost ? <NewPost /> : ''}


        </div>
    )
}
export default Home
