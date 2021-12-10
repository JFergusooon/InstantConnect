import {useEffect, useState} from "react";
import ProfileInfoBox from "../ProfileInfoBox";
import PostList from "../PostList";
import MoreDetails from "../MoreDetails";

const PublicPage = () => {
    const [user, setUser] = useState();
    const [posts, setPosts] = useState();
    const [friends, setFriends] = useState([]);
    const [postOrDetails, setPostOrDetails] = useState(true);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    let username = window.location.href.split('/').at(4);
    //console.log("curDomainUser: " + username)

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
                    //console.log(result)
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
                    setIsLoaded(true);
                    setPosts(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )



        const controller = new AbortController();
        const signal = controller.signal;
        let url3 = 'http://localhost:4006/user/getAllFriends/' + username;
        fetch(url3, {signal: signal})
            .then(res => res.json())
            .then(

                (result) => {
                    setIsLoaded(true);
                    setFriends(result);
                    //console.log("FRIEND RESULT : " + result)
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )



        return () => {
            setIsLoaded(false)
            setError(null)
        }
    }, [])


    // console.log("FR: " + friends[1].username)
    // console.log("FR: " + friends[0].username)
    // let fr = {friends}
    return (
        <div style={{textAlign: "center"}}>
            {user ? <ProfileInfoBox username={user.username} firstname={user.firstname} lastname={user.lastname} status={user.status} pageColor={user.pageColor} friendss = {friends}/> : "USER NOT LOADED"}

            {/*// POSTS BOX / MORE INFO BOX //*/}
            <div style={{width: "100%"}}>

                <button onClick={changeViewToPost} style={{width: "25%", background: "#f2f2f2", height: "30px", border: "solid 0px white"}}>Posts</button>
                <button onClick={changeViewToDetails} style={{width: "25%", background: "#f2f2f2", height: "30px", border: "solid 0px white"}}>Details</button>
            </div>






            {postOrDetails ? (posts ? <div style={{marginLeft: "500px"}}><PostList people={posts}/></div> : "no posts atm")
                : <MoreDetails email={user.email}/>}
        </div>
    )
}

export default PublicPage