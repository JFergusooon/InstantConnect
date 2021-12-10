import PostBox from "./PostBox";

const PostList = ({people, index}) => {
    return (
        <div style={{margin: "0 auto",textAlign: "center"}}>
            {people.map((profile, index) => (
                <>
                    <br/>
                    <PostBox key={index} task={profile}/>
                </>

            ))}
        </div>
    )
}

export default PostList