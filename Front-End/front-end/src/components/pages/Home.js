import ProfileList from "../ProfileList";
import Trending from "./Trending";
import Button from "../Button";
import {useEffect, useState} from "react";
import NewPost from "../NewPost";
import FrGrPosts from "../FrGrPosts";

const Home = () => {
    const [writePost, setWritePost] = useState(false);
    const [friendsPosts, setFriendsPosts] = useState();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    function changeWP() {
        setWritePost(!writePost)
    }
    let url = 'http://localhost:4006/post/getFriendsPosts/' + localStorage.getItem('username');
    useEffect(() => {
        fetch(url, {headers: new Headers({
                "Authorization": "Basic " + window.btoa(localStorage.getItem('username') + ":" + localStorage.getItem('password'))
            })})
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("RESULT: " + result)
                    setIsLoaded(true);
                    setFriendsPosts(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
        console.log(friendsPosts)
    }, [])
    return (
        <div style={{textAlign: "center"}}>
            <br/>
            <div style={{display: "inline-block"}}>
                <h1> Home </h1>
                {/*<button style={{marginLeft: "150px", width: "150px", borderRadius: "10px", fontSize: "20px", background: "#e0961f", height: "40px", fontWeight: "bold", float: "right"}} onClick={changeWP}>Write Post</button>*/}

            </div>
            <br/>
            <br/>

            {/*{writePost ? <NewPost closeBox={changeWP}/> : ''}*/}
            <NewPost />
            <br />
            <br />
            {friendsPosts ? <FrGrPosts posts={friendsPosts}/> : "No Friend Posts"}


        </div>
    )
}
export default Home
