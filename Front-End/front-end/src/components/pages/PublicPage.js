import {useEffect, useState} from "react";
import ProfileInfoBox from "../ProfileInfoBox";
import PostList from "../PostList";
import MoreDetails from "../MoreDetails";
import {forEach} from "react-bootstrap/ElementChildren";

const PublicPage = () => {
    const [user, setUser] = useState();
    const [posts, setPosts] = useState();
    const [postOrDetails, setPostOrDetails] = useState(true);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    let username = window.location.href.split('/').at(4);
    console.log("curDomainUser: " + username)

    function changeViewToPost() {
        setPostOrDetails(true)
    }
    function changeViewToDetails() {
        setPostOrDetails(false)
    }

    useEffect(() => {
        let url = "http://localhost:4006/user/getByUsername/" + username
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    setIsLoaded(true);
                    setUser(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )

    }, [])

    useEffect(() => {
        let url = "http://localhost:4006/post/getUserPosts/" + username
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("USER's POSTS: " + result[0].postBody)

                    let arr = [];
                    result.forEach(s => arr.concat(s))
                    console.log("ARR" + arr)

                    setIsLoaded(true);
                    setPosts(arr);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )

    }, [])

    return (
        <div style={{textAlign: "center"}}>
            {user ? <ProfileInfoBox username={user.username} firstname={user.firstname} lastname={user.lastname} status={user.status} pageColor={user.pageColor}/> : "USER NOT LOADED"}

            {/*// POSTS BOX / MORE INFO BOX //*/}
            <div style={{width: "100%"}}>

                <button onClick={changeViewToPost} style={{width: "25%", background: "#f2f2f2", height: "30px", border: "solid 0px white"}}>Posts</button>
                <button onClick={changeViewToDetails} style={{width: "25%", background: "#f2f2f2", height: "30px", border: "solid 0px white"}}>Details</button>
            </div>










            {/*<PostList people={posts} />*/}
            {postOrDetails ? "no posts atm" : <MoreDetails email={user.email}/>}
        </div>
    )
}

export default PublicPage