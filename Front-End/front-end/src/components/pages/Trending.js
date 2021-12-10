import PostList from "../PostList";
import {useEffect, useState} from "react";

const Trending = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);


    let url = 'http://localhost:4006/post/getTrending';
    useEffect(() => {
        fetch(url)
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
    }, [])
    console.log("RESULTS : " + posts)




    return (
        <div style={{textAlign: "center"}}>
            <br/>
            <h1>Trending</h1>
            <br/>
            <br/>
            <br/>
            <div style={{textAlign: "center", margin: "0 auto", width: "1900px", display: "flex"}}>
                <PostList people={posts}/>
            </div>
        </div>
    )

}

export default Trending