async function showSearch() {
    let term = document.getElementById('searchBarInput').value;
    let url = 'http://localhost:4006/user/findByUsername/' + term;
    let response = await fetch(url);
    let items = await response.json()
    console.log(items)


    let ele = document.getElementById("otherDiv");

    while(ele.firstChild)
    {
        ele.removeChild(ele.firstChild);
    }
    ele.appendChild(createProfileBox(items));
}

function createProfileBox(profiles){
    console.log(profiles.length);
    let div = document.createElement('div');
    div.id = 'caba';


    let box = document.createElement('div')
    box.className = 'findBox';
    for(let i = 0; i < profiles.length; i++)
    {


        let boox = document.createElement('div');
        boox.id = 'profile1';
        boox.className = 'profileBox';




        //          BOX CONTENT

        let trendingPictureDiv = document.createElement('img');
        trendingPictureDiv.src = '/images/' + profiles[i].pageColor + '.png';
        trendingPictureDiv.className = 'finding_image';

        



        boox.appendChild(trendingPictureDiv);


        let box_username = document.createElement('a');
        box_username.innerText = profiles[i].username;
        box_username.href = '/public/' + profiles[i].username;
        box_username.id = 'b_username';
        boox.appendChild(box_username);



        //let box_picture = document.createElement('img');
        //box_picture.src = 'public/images/blue.png';
        //boox.appendChild(box_picture);


        let box_motto = document.createElement('p');
        //box_motto.textContent = 'Just chilling living life with my penguino.'
        box_motto.innerText = '"' + profiles[i].status + '"';
        box_motto.id = 'b_userMotto';
        boox.appendChild(box_motto);


        let box_addButton = document.createElement('button');
        box_addButton.textContent = 'Add Friend';
        box_addButton.id = 'b_addFriendButton';


        box_addButton.onclick = function() {
            btnAddFriend(profiles[i].username, localStorage.getItem("storedUsername"));
        }


        boox.appendChild(box_addButton);

        //            END OF BOX CONTENT

        box.appendChild(boox);

    }
    div.appendChild(box);

    return div;
}


function btnAddFriend(receiver, sender) {
    let u = localStorage.getItem("storedUsername");
    let p = localStorage.getItem("storedPassword");
    let auth = u + ":" + p;
    let encode = window.btoa(auth);





    let xhr = new XMLHttpRequest();
    console.log(u);
    let url = "http://localhost:4006/email/FriendRequestEmail/" + sender + "/" + receiver;
    console.log("URL : " + url)
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader( 'Access-Control-Allow-Origin', '*');
    xhr.setRequestHeader('Authorization', 'Basic ' + encode);
    xhr.send();

    showTrending().then()



}