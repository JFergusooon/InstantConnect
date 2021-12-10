import { Link } from 'react-router-dom'
import ProfileList from "../ProfileList";
import {useEffect, useState} from "react";
const searchBarInpu = {
    fontSize: "40px",
    height: "65px",
    width: "800px",
    borderRadius: "20px"

}

const searchButton = {
    fontSize: "40px",
    height: "75px",
    width: "200px",
    background: "#2e466e linear-gradient(to bottom, #2e466e 5%, #415989 100%)",
    borderRadius: "20px"
}



async function showSearch() {
    //let term = document.getElementById('searchBarInput').value;
    let url = 'http://localhost:4006/user/findByUsername/' + 'a';
    let response = await fetch(url);
    let items = await response.json()
    console.log(items)

    return items;
}


    const FindPeople = () => {
        const [people, setPeople] = useState([]);
        const [error, setError] = useState(null);
        const [isLoaded, setIsLoaded] = useState(false);
        const [searchTerm, setSearchTerm] = useState();

        let url = 'http://localhost:4006/user/findByUsername/' + searchTerm;
        const resultStyle =
        {
            textAlign: "center",
            margin: "0 auto",
        }
        useEffect(() => {
            fetch(url)
                .then(res => res.json())
                .then(

                    (result) => {
                        setIsLoaded(true);
                        setPeople(result);
                    },
                    (error) => {
                        setIsLoaded(true);
                        setError(error);
                    }
                )
        }, [])
        console.log("RESULTS : " + people.toString())

        function showSe() {

            fetch(url)
                .then(res => res.json())
                .then(

                    (result) => {
                        setIsLoaded(true);
                        setPeople(result);
                    },
                    (error) => {
                        setIsLoaded(true);
                        setError(error);
                    }
                )
            console.log(people)
        }


        return (
            <div style={{textAlign: "center"}}>
                <br/>
                <h1> Find People </h1>
                <br/>
                <div>
                    <input id="searchBarInput" style={searchBarInpu} placeholder={"Search Users..."} onChange={({ target }) => setSearchTerm(target.value)}/>
                    <button style={searchButton} onClick={showSe}>Search</button>
                </div>
                <br/>
                <div style={resultStyle}>
                    {people.length > 0 ? <ProfileList style={resultStyle} people={people}/> : <p>No People Found</p>}
                </div>

            </div>
        );
    }


export default FindPeople