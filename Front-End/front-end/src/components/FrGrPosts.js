import {useEffect, useState} from "react";
import PostBox from "./PostBox";

const FrGrPosts = ({posts, index}) => {



    return (
        <div style={{margin: "0 auto",textAlign: "center"}}>
            {posts.map((profile, index) => (
                <PostBox key={index} task={profile}/>
            ))}
        </div>
    )
}
export default FrGrPosts