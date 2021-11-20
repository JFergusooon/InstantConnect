async function createPublicUserPage(username) {
    console.log(username);
    let url = 'http://localhost:4006/user/getByUsername/' + username;
    let response = await fetch(url);
    let user = await response.json();


    let url2 = 'http://localhost:4006/user/getAllFriends/' + username;
    let response2 = await fetch(url2);
    let friends = await response2.json();


    //console.log(user);

    let ele = document.getElementById("public_content");

    while(ele.firstChild)
    {
        ele.removeChild(ele.firstChild);
    }
    ele.appendChild(populateInfoDiv(user));

    ele.appendChild(await populatePostsDiv(user));

    ele.appendChild(populateFriendDiv(friends));

}

async function updatePostDiv(user) {
    let ele = document.getElementById("public_content");

    ele.childNodes[1].remove()


    ele.appendChild(await populatePostsDiv(user));
    location.reload()

}
function populateInfoDiv(user) {
    let boox = document.createElement('div');
    boox.id = 'prof';
    boox.className = 'public_profileBox';




        //          BOX CONTENT
        let public_profilePictureDiv = document.createElement('img');
        public_profilePictureDiv.src = '/images/' + user.pageColor + '.png';
        public_profilePictureDiv.className = 'pub_image';
        boox.appendChild(public_profilePictureDiv);

        let br1 = document.createElement('br');
        boox.appendChild(br1);

        let public_username = document.createElement('a');
        public_username.innerText = user.username;
        public_username.href = '/public/' + user.username;
        public_username.id = 'pub_username';
        boox.appendChild(public_username);



        //let box_picture = document.createElement('img');
        //box_picture.src = 'public/images/blue.png';
        //boox.appendChild(box_picture);


        let public_motto = document.createElement('p');
        //box_motto.textContent = 'Just chilling living life with my penguino.'
        public_motto.innerText = user.status;
        public_motto.id = 'pub_userMotto';
        boox.appendChild(public_motto);


        let public_addButton = document.createElement('button');
        public_addButton.textContent = 'Add Friend';
        public_addButton.id = 'pub_addFriendButton';


        public_addButton.onclick = function() {
            btnAddFriend(user.username, localStorage.getItem("storedUsername"));
        }


        boox.appendChild(public_addButton);

        //            END OF BOX CONTENT


    return boox;
}

async function populatePostsDiv(user) {
    let url = 'http://localhost:4006/post/getUserPosts/' + user.username;
    let response = await fetch(url);
    let items = await response.json();
    console.log("User's Posts : ");
    console.log(items);


    let div = document.createElement('div');
    div.id = 'public_div';

    for (let i = 0; i < items.length; i++) {

        let bot = document.createElement('div');
        bot.id = 'profile2';
        bot.className = 'public_postBox';
        //     BOX CONTENT
        let postContent = document.createElement('p');
        postContent.id = 'pub_postBody'
        postContent.innerText = items[i].postBody;
        bot.appendChild(postContent);


        let box_likeButton = document.createElement('button');
        box_likeButton.innerText = 'like';
        box_likeButton.id = 'pub_likeButton';
        box_likeButton.onclick = function() {
            addLikeToPostPublic(items[i].postId);
        }
        bot.appendChild(box_likeButton);



        let box_likeCount = document.createElement('p');
        box_likeCount.innerText = items[i].likes;
        box_likeCount.id = 'pub_likeCount';
        bot.appendChild(box_likeCount);



        //     END OF BOX CONTENT
        div.appendChild(bot);
    }

    return div;
}

function populateFriendDiv(friends) {
    let boox = document.createElement('div');
    boox.id = 'fren';
    boox.className = 'public_friendsBox';




    //          BOX CONTENT
    for(let i = 0; i < friends.length; i++) {
        let bot = document.createElement('div');
        bot.id = 'friends1';
        bot.className = 'friendBox';

        let public_profilePictureDiv = document.createElement('img');
        public_profilePictureDiv.src = '/images/' + friends[i].pageColor + '.png';
        public_profilePictureDiv.className = 'pub_friendimage';
        bot.appendChild(public_profilePictureDiv);



        let public_username = document.createElement('a');
        public_username.innerText = friends[i].username;
        public_username.href = '/public/' + friends[i].username;
        public_username.id = 'pub_friendusername';
        bot.appendChild(public_username);


        //            END OF BOX CONTENT
        boox.appendChild(bot);
    }



    return boox;
}



function addLikeToPostPublic(id) {
    let u = localStorage.getItem("storedUsername");
    let p = localStorage.getItem("storedPassword");
    let auth = u + ":" + p;
    let encode = window.btoa(auth);





    let xhr = new XMLHttpRequest();
    console.log(username);
    let url = "http://localhost:4006/post/addLikes/" + id;
    console.log("URL : " + url)
    xhr.open("PUT", url, true);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader( 'Access-Control-Allow-Origin', '*');
    xhr.setRequestHeader('Authorization', 'Basic ' + encode);
    xhr.send();

    //location.reload()
    let currentWindow2 = window.location.href;
    updatePostDiv(currentWindow2.slice(29, currentWindow2.length)).then()
}