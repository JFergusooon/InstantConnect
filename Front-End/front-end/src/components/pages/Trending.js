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

    // SPLIT POSTS INTO 3
    let index = 1;
    let thirdPart = [];
    let secondPart = [];
    let firstPart = [];

    for(let i = 0; i < posts.length; i++) {
        if(index === 1)
        {
            firstPart.push(posts[i]);
        }
        else if(index === 2)
        {
            secondPart.push(posts[i]);
        }
        else if(index === 3)
        {
            thirdPart.push(posts[i])
            index = 0;
        }

        index++;
    }

    console.log(firstPart);
    console.log(secondPart);
    console.log(thirdPart);


    return (
        <div style={{textAlign: "center"}}>
            <br/>
            <h1>Trending</h1>
            <br/>
            <br/>
            <br/>
            <div style={{textAlign: "center", margin: "0 auto", width: "1900px", display: "flex"}}>
                <PostList people={firstPart}/>
                <PostList people={secondPart}/>
                <PostList people={thirdPart}/>
            </div>
        </div>
    )

}

export default Trending