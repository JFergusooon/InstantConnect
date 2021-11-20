import PostBox from "./PostBox";

const PostList = ({people, index}) => {
    return (
        <div style={{margin: "0 auto",textAlign: "center", width: "20%"}}>
            {people.map((profile, index) => (
                <PostBox key={index} task={profile}/>
            ))}
        </div>
    )
}

export default PostList