window.onload = testWindow;
async function showHomePage() {

    let u = localStorage.getItem("storedUsername");
    let p = localStorage.getItem("storedPassword");
    let auth = u + ":" + p;
    let encode = window.btoa(auth);



    let url = 'http://localhost:4006/post/getFriendsPosts/' + u;
    console.log("URL : " + url)

    let response = await fetch(url, {
        headers: new Headers({
            "Authorization": "Basic " + encode
        }),
    });
    let items = await response.json();
    console.log(items);
    let ele = document.getElementById("userFeedDiv");

    while(ele.firstChild)
    {
        ele.removeChild(ele.firstChild);
    }
    ele.appendChild(createHomeBox(items));
}

function testWindow() {
    handleLoginLogoutSwitch()
    let cuP = document.getElementById('currentUserP');
    let uu = localStorage.getItem("storedUsername")
    cuP.innerText = uu.toString();


    let currentWindow = window.location.href;
    if(currentWindow === "http://localhost:3001/trending")
    {
        showTrending().then();
    }




    else if(currentWindow === "http://localhost:3001/home")
    {
        let temp = localStorage.getItem("storedUsername")
        if(temp != null) {
            showHomePage().then();
        }
    }



    else if (currentWindow.slice(0, 29) === "http://localhost:3001/public/")
    {
        createPublicUserPage(currentWindow.slice(29, currentWindow.length)).then();
    }
    else if (currentWindow.slice(0, 30) === "http://localhost:3001/private/")
    {
        console.log(currentWindow.slice(30, currentWindow.length))
        if(localStorage.getItem('storedUsername') === currentWindow.slice(30, currentWindow.length)) {
            createPrivateUserPage(currentWindow.slice(29, currentWindow.length)).then();
        }
        else {
            window.location.href = '/home'
        }

    }

    else if (currentWindow.slice(0, 32) === "http://localhost:3001/addFriend/")
    {
        let temp = currentWindow.slice(32, currentWindow.length);
        let tempo = temp.split('/');
        let sender = tempo[1];
        let receiver = tempo[0];
        finishAddFriend(sender, receiver);
    }
}

function createHomeBox(items) {


    let box = document.createElement('div')
    box.className = 'homePostDiv';
    for(let i = 0; i < items.length; i++)
    {
        if(i < 5) {
            let boox = document.createElement('div');
            boox.id = 'public1';
            boox.className = 'postBox';




            //          BOX CONTENT
            let trendingPictureDiv = document.createElement('img');
            trendingPictureDiv.src = '/images/' + items[i].postColor + '.png';
            trendingPictureDiv.className = 'trending_image';
            boox.appendChild(trendingPictureDiv);


            let box_username = document.createElement('a');
            box_username.innerText = items[i].username;
            box_username.href = '/public/' + items[i].username;
            box_username.id = 't_username';
            boox.appendChild(box_username);


            let box_postBody = document.createElement('p');
            box_postBody.innerText = items[i].postBody;
            box_postBody.id = 't_postBody';
            boox.appendChild(box_postBody);

            let box_likeButton = document.createElement('button');
            box_likeButton.innerText = 'like';
            box_likeButton.id = 't_likeButton';
            box_likeButton.onclick = function() {
                addLikeToPostHome(items[i].postId);
            }
            boox.appendChild(box_likeButton);


            let box_likeCount = document.createElement('p');
            box_likeCount.innerText = items[i].likes;
            box_likeCount.id = 't_likeCount';
            boox.appendChild(box_likeCount);








            //            END OF BOX CONTENT

            box.appendChild(boox);

        }

    }

    return box;
}

function handlePostForm()
{
    const postFormo = document.getElementById('newPostForm');
    console.log('Show CreatePost');
    if(postFormo.style.display === 'none')
    {
        postFormo.style.display = 'block';
    }
    else if(postFormo.style.display === 'block') {
        postFormo.style.display = 'none';
    }
}


function auto_grow() {
    const postBody = document.getElementById('postBody');
    const charLimit = document.getElementById('tempDigits');
    postBody.style.height = "auto";
    postBody.style.height = (postBody.scrollHeight)+"px";
    let guesstimate = 200 - postBody.value.length;
    if(guesstimate < 200 && guesstimate >= 140) {
        charLimit.style.color = 'green';
        charLimit.innerHTML = guesstimate + " / 200";
    }
    else if(guesstimate <= 139 && guesstimate >= 50) {
        charLimit.style.color = 'yellow';
        charLimit.innerHTML = guesstimate + " / 200";
    }
    else if(guesstimate <= 50 && guesstimate >= 0) {
        charLimit.style.color = 'red';
        charLimit.innerHTML = guesstimate + " / 200";
    }
    else {
        charLimit.style.color = 'red';
        charLimit.innerHTML = guesstimate + " / 200";
    }
}

function handleLoginLogoutSwitch() {

    let loginBtn = document.getElementById('lBtn');
    let logoutBtn = document.getElementById('loBtn');
    console.log("HANDLE LOGIN SWITCH : " + localStorage.getItem('storedUsername'))
    if (localStorage.getItem("storedUsername") == null) {
        logoutBtn.style.display = 'none';
        loginBtn.style.display = 'inline-block';




        console.log("stored username: " + localStorage.getItem("storedUsername"))
        console.log("stored password: " + localStorage.getItem("storedPassword"))

    }
    else if(localStorage.getItem("storedUsername") != null) {
        logoutBtn.style.display = 'inline-block';
        loginBtn.style.display = 'none';



        console.log("stored username: " + localStorage.getItem("storedUsername"))
        console.log("stored password: " + localStorage.getItem("storedPassword"))
    }
}





function bringToPage() {
    let u = localStorage.getItem('storedUsername')

    window.location.href = '/private/' + u;
}

function addLikeToPostHome(id) {
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

    showHomePage().then()
}

