





async function showTrending() {
    let url = 'http://localhost:4006/post/getTrending';
    let response = await fetch(url);
    let items = await response.json();
    console.log(items);
    let ele = document.getElementById("otherDiv1");

    while(ele.firstChild)
    {
        ele.removeChild(ele.firstChild);
    }
    ele.appendChild(createPostBox1(items));

    let ene = document.getElementById("otherDiv2");

    while(ene.firstChild)
    {
        ene.removeChild(ene.firstChild);
    }
    ene.appendChild(createPostBox2(items));
}

function createPostBox1(profiles){
    let div = document.createElement('div');
    div.id = 'caba';


    let box = document.createElement('div')
    box.className = 'leftCatBox';
    for(let i = 0; i < profiles.length; i++)
    {
        if(i < 5) {
            let boox = document.createElement('div');
            boox.id = 'profile1';
            boox.className = 'postBox';



            //          BOX CONTENT
            let trendingPictureDiv = document.createElement('img');
            trendingPictureDiv.src = 'images/' + profiles[i].postColor + '.png';
            trendingPictureDiv.className = 'trending_image';
            boox.appendChild(trendingPictureDiv);


            let box_username = document.createElement('a');
            box_username.innerText = profiles[i].username;
            box_username.href = '/public/' + profiles[i].username;
            box_username.id = 't_username';
            boox.appendChild(box_username);


            let box_postBody = document.createElement('p');
            box_postBody.innerText = profiles[i].postBody;
            box_postBody.id = 't_postBody';
            boox.appendChild(box_postBody);

            let box_likeButton = document.createElement('button');
            box_likeButton.innerText = 'like';
            box_likeButton.id = 't_likeButton';
            box_likeButton.onclick = function() {
                addLikeToPostTrending(profiles[i].postId);
            }
            boox.appendChild(box_likeButton);


            let box_likeCount = document.createElement('p');
            box_likeCount.innerText = profiles[i].likes;
            box_likeCount.id = 't_likeCount';
            boox.appendChild(box_likeCount);








            //            END OF BOX CONTENT

            box.appendChild(boox);

        }

    }
    div.appendChild(box);

    return div;
}

function createPostBox2(profiles){
    let div = document.createElement('div');
    div.id = 'caba';


    let box = document.createElement('div')
    box.className = 'rightCatBox';
    for(let i = 5; i < profiles.length; i++)
    {
        if(i < 10) {
            let boox = document.createElement('div');
            boox.id = 'profile1';
            boox.className = 'postBox';




            //          BOX CONTENT
            let trendingPictureDiv = document.createElement('div');
            trendingPictureDiv.className = 'trending_image';
            boox.appendChild(trendingPictureDiv);

            let box_username = document.createElement('a');
            box_username.innerText = profiles[i].username;
            box_username.href = '/public/' + profiles[i].username;
            box_username.id = 't_username';
            boox.appendChild(box_username);


            let box_postBody = document.createElement('p');
            box_postBody.innerText = profiles[i].postBody;
            box_postBody.id = 't_postBody';
            boox.appendChild(box_postBody);

            let box_likeButton = document.createElement('button');
            box_likeButton.innerText = 'like';
            box_likeButton.id = 't_likeButton';
            box_likeButton.onclick = function() {
                addLikeToPostTrending(profiles[i].postId);
            }
            boox.appendChild(box_likeButton);


            let box_likeCount = document.createElement('p');
            box_likeCount.innerText = profiles[i].likes;
            box_likeCount.id = 't_likeCount';
            boox.appendChild(box_likeCount);








            //            END OF BOX CONTENT

            box.appendChild(boox);

        }

    }
    div.appendChild(box);

    return div;
}

function addLikeToPostTrending(id) {
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

    showTrending().then();
    showTrending().then();
}



