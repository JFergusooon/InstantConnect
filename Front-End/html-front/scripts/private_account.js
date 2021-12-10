async function createPrivateUserPage(username) {
    console.log(username);
    let url = 'http://localhost:4006/user/getByUsername/' + username;
    let response = await fetch(url);
    let user = await response.json();



    let ese = document.getElementById("private_content");

    while(ese.firstChild)
    {
        ese.removeChild(ese.firstChild);
    }
    ese.appendChild(priv_populateInfoDiv(user));
    ese.appendChild(await priv_populatePostsDiv(user));

}

function goToPublicPage() {
    let u = localStorage.getItem('storedUsername');
    window.location.href = '../public/' + u;
}


function priv_populateInfoDiv(user) {
    let boox = document.createElement('div');
    boox.id = 'prof';
    boox.className = 'public_profileBox';




    //          BOX CONTENT
    let public_profilePictureDiv = document.createElement('img');
    console.log(user.pageColor)
    public_profilePictureDiv.src = '/images/' + user.pageColor + '.png';
    public_profilePictureDiv.className = 'pub_image';
    boox.appendChild(public_profilePictureDiv);


    let br3 = document.createElement('br')
    boox.appendChild(br3)


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






    let public_editButton = document.createElement('button');
    public_editButton.innerText = 'Show Edit Menu'
    public_editButton.id = 'priv_showEditMenu';


    public_editButton.onclick = function() { showEditMenu(); }
    boox.appendChild(public_editButton);


    let br = document.createElement('br');
    boox.appendChild(br);


    //     EDIT MENU DIV
    let editDiv = document.createElement('div');
    editDiv.id = 'editMenuDiv'
    editDiv.style.display = 'none';



/*
    private String pageColor;
*/
                // USERNAME DIV
    let username_div = document.createElement('div');
    username_div.id = 'usernameDiv';

    let label_username = document.createElement('p');
    label_username.id='usernameLabel';
    label_username.innerText = 'Username'
    username_div.appendChild(label_username);

    let value_username = document.createElement('input');
    value_username.id='usernameInput';
    username_div.appendChild(value_username)
    editDiv.appendChild(username_div);




    // PASSWORD DIV
    let password_div = document.createElement('div');
    password_div.id = 'passwordDiv';

    let label_password = document.createElement('p');
    label_password.id='passwordLabel';
    label_password.innerText = 'Password'
    password_div.appendChild(label_password);

    let value_password = document.createElement('input');
    value_password.id='passwordInput';
    password_div.appendChild(value_password)
    editDiv.appendChild(password_div);

    // firstName DIV
    let firstName_div = document.createElement('div');
    firstName_div.id = 'firstNameDiv';

    let label_firstName = document.createElement('p');
    label_firstName.id='firstNameLabel';
    label_firstName.innerText = 'First Name'
    firstName_div.appendChild(label_firstName);

    let value_firstName = document.createElement('input');
    value_firstName.id='firstNameInput';
    firstName_div.appendChild(value_firstName)
    editDiv.appendChild(firstName_div);

    // lastName DIV
    let lastName_div = document.createElement('div');
    lastName_div.id = 'lastNameDiv';

    let label_lastName = document.createElement('p');
    label_lastName.id='lastNameLabel';
    label_lastName.innerText = 'Last Name'
    lastName_div.appendChild(label_lastName);

    let value_lastName = document.createElement('input');
    value_lastName.id='lastNameInput';
    lastName_div.appendChild(value_lastName)
    editDiv.appendChild(lastName_div);
    
    // email DIV
    let email_div = document.createElement('div');
    email_div.id = 'emailDiv';

    let label_email = document.createElement('p');
    label_email.id='emailLabel';
    label_email.innerText = 'Email'
    email_div.appendChild(label_email);

    let value_email = document.createElement('input');
    value_email.id='emailInput';
    email_div.appendChild(value_email)
    editDiv.appendChild(email_div);


                // MOTTO DIV
    let motto_div = document.createElement('div');
    motto_div.id = 'mottoDiv';


    let label_motto = document.createElement('p');
    label_motto.id='mottoLabel';
    label_motto.innerText = 'Motto'
    motto_div.appendChild(label_motto);

    let value_motto = document.createElement('input');
    value_motto.id='mottoInput';
    motto_div.appendChild(value_motto)
    editDiv.appendChild(motto_div);

    // pageColor DIV
    let pageColor_div = document.createElement('div');
    pageColor_div.id = 'pageColorDiv';


    let label_pageColor = document.createElement('p');
    label_pageColor.id='pageColorLabel';
    label_pageColor.innerText = 'Page Color'
    pageColor_div.appendChild(label_pageColor);

    let dropDown = document.createElement('select');
    dropDown.id='pageColorInput';
    dropDown.name = 'pageColor';
    dropDown.value = user.pageColor;

    let option1 = document.createElement('option');
    option1.value = 'Blue';
    option1.innerHTML = 'Blue';
    dropDown.appendChild(option1);

    let option2 = document.createElement('option');
    option2.value = 'Green';
    option2.innerHTML = 'Green';
    dropDown.appendChild(option2);

    let option3 = document.createElement('option');
    option3.value = 'Purple';
    option3.innerHTML = 'Purple';
    dropDown.appendChild(option3);

    let option4 = document.createElement('option');
    option4.value = 'Red';
    option4.innerHTML = 'Red';
    dropDown.appendChild(option4);

    let option5 = document.createElement('option');
    option5.value = 'Yellow';
    option5.innerHTML = 'Yellow';
    dropDown.appendChild(option5);


    pageColor_div.appendChild(dropDown);
    editDiv.appendChild(pageColor_div)




    let br2 = document.createElement('br')
    editDiv.appendChild(br2)

    let submitEdit = document.createElement('button');
    submitEdit.id='editSubmitBtn';
    submitEdit.innerText = 'Update Profile';
    submitEdit.onclick = function() {
        updateProfile(user);
    }
    editDiv.appendChild(submitEdit);



    boox.appendChild(editDiv)
    //            END OF BOX CONTENT


    return boox;
}

async function priv_populatePostsDiv(user) {
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
        postContent.id = 'priv_postBody'
        postContent.innerText = items[i].postBody;
        bot.appendChild(postContent);


        let box_likeButton = document.createElement('button');
        box_likeButton.innerText = 'delete';
        box_likeButton.id = 'p_deleteButton';
        box_likeButton.onclick = function() {
            deletePost(items[i].postId);
        }
        bot.appendChild(box_likeButton);



        //     END OF BOX CONTENT
        div.appendChild(bot);
    }

    return div;
}


function showEditMenu() {
    console.log('SHOWING EDIT MENU')

    let ed = document.getElementById('editMenuDiv');
    console.log(ed.style.display)
    if(ed.style.display === 'none') {

        document.getElementById('priv_showEditMenu').innerText = 'Hide Edit Menu'
        ed.style.display = 'inline-block';
    }
    else if(ed.style.display === 'inline-block') {

        document.getElementById('priv_showEditMenu').innerText = 'Show Edit Menu'
        ed.style.display = 'none';
    }
}

function deletePost(postId) {
    let u = localStorage.getItem("storedUsername");
    let p = localStorage.getItem("storedPassword");
    let auth = u + ":" + p;
    let encode = window.btoa(auth);

    let xhr = new XMLHttpRequest();

    let url = "http://localhost:4006/post/" + postId;
    console.log("URL : " + url)
    xhr.open("DELETE", url, true);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader( 'Access-Control-Allow-Origin', '*');
    xhr.setRequestHeader('Authorization', 'Basic ' + encode);
    xhr.send();



    console.log("POST DELETED BY : " + u);
    createPrivateUserPage(document.getElementById('pub_username').innerText).then();
    createPrivateUserPage(document.getElementById('pub_username').innerText).then();
}

function updateProfile() {
    let u = localStorage.getItem("uUsername");
    let p = localStorage.getItem("password");
    let auth = u + ":" + p;
    let encode = window.btoa(auth);

    let newUsername = document.getElementById('usernameInput').value;
    let newPassword = document.getElementById('passwordInput').value;
    let newFirstName = document.getElementById('firstNameInput').value;
    let newLastName = document.getElementById('lastNameInput').value;
    let newEmail = document.getElementById('emailInput').value;
    let newMotto = document.getElementById('mottoInput').value;
    let newColor = document.getElementById('pageColorInput').value;

    console.log("newUsername : " + newUsername)
    console.log("newPassword : " + newPassword)
    console.log("newFirstName : " + newFirstName)
    console.log("newLastName : " + newLastName)
    console.log("newEmail : " + newEmail)
    console.log("newMotto : " + newMotto)
    console.log("newColor : " + newColor)


    if(newUsername === "") {
        newUsername = " ";
    }
    if(newPassword === "") {
        newPassword = " ";
    }
    if(newFirstName === "") {
        newFirstName = " ";
    }
    if(newLastName === "") {
        newLastName = " ";
    }
    if(newEmail === "") {
        newEmail = " ";
    }
    if(newMotto === "") {
        newMotto = " ";
    }
    if(newColor === "") {
        newColor = " ";
    }



    let xhr = new XMLHttpRequest();
    console.log(username);
    let url = "http://localhost:4006/user/updateUser/" +
                user.username + "/" + newUsername + "/" +
                newPassword + "/" + newFirstName + "/" +
                newLastName + "/" + newEmail + "/" +
                newMotto + "/" + newColor ;


    console.log("URL : " + url)
    xhr.open("PUT", url, true);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader( 'Access-Control-Allow-Origin', '*');
    xhr.setRequestHeader('Authorization', 'Basic ' + encode);
    xhr.send();

    window.location.href= '/private/' + u;
}