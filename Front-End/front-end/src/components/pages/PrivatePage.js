import {useEffect, useState} from "react";
import ProfileInfoBox from "../ProfileInfoBox";
import MoreDetails from "../MoreDetails";
import PrProfileInfoBox from "../PrProfileInfoBox";
import PostList from "../PostList";

const PrivatePage = () => {
    const [loggedIn, setLoggedIn] = useState(false);

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

        let url2 = "http://localhost:4006/post/getUserPosts/" + username
        fetch(url2)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    setIsLoaded(true);
                    setPosts(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )


    }, [])







    return (
        <div style={{textAlign: "center"}}>
            {localStorage.getItem('username') === window.location.pathname.split('/')[2] ?



                <div style={{textAlign: "center"}}>
                    {user ? <PrProfileInfoBox username={user.username} firstname={user.firstname} lastname={user.lastname} status={user.status} pageColor={user.pageColor}/> : "USER NOT LOADED"}

                    {/*// POSTS BOX / MORE INFO BOX //*/}
                    <div style={{width: "100%"}}>

                        <button onClick={changeViewToPost} style={{width: "25%", background: "#f2f2f2", height: "30px", border: "solid 0px white"}}>Posts</button>
                        <button onClick={changeViewToDetails} style={{width: "25%", background: "#f2f2f2", height: "30px", border: "solid 0px white"}}>Details</button>
                    </div>










                    {postOrDetails ? (posts ? <PostList people={posts} /> : "no posts atm")
                        : <MoreDetails email={user.email}/>}
                </div>







                : <p>"Not Logged In"</p>}
        </div>


    )
}

export default PrivatePage