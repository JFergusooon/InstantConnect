import PrPostBox from "./PrPostBox";

const PrPostList = ({people, index}) => {
    return (
        <div style={{margin: "0 auto",textAlign: "center"}}>
            {people.map((profile, index) => (
                <>
                    <br/>
                    <PrPostBox key={index++} task={profile}/>
                </>

            ))}
        </div>
    )
}

export default PrPostList