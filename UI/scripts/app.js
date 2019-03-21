const BASE_URL = 'https://politico-final.herokuapp.com/api/v2';
var office_ids = [];

function getToken(){
    token = localStorage.getItem('token');
    if (token)
        return token;
    window.location.replace('sign_up.html')
    return null
}

function createNode(type, id, clazz){
    const node = document.createElement(type);
    node.classList.add(clazz)
    node.id = id;
    return node;
}

function showModal(modal_id){
    document.getElementById(modal_id).style.display='block';
}

function tokenError(status){
    if(status === 401){
        window.location.replace('sign_up.html')
        return true;
    }
    return false;
}

function displayError(msg){
    document.getElementById('loggy').innerText = msg
    document.getElementById('loggy').style.backgroundColor = '#d32f2f';
    showLoggy();
}

function displaySuccess(msg){
    document.getElementById('loggy').innerText = msg
    document.getElementById('loggy').style.backgroundColor = '#1abc9c';
    showLoggy();
}

function displayInfo(msg){
    document.getElementById('loggy').innerText = msg
    document.getElementById('loggy').style.backgroundColor = '#2980b9';
    showLoggy();
}

function showLoggy(){
    var x = document.getElementById('loggy');
    x.className = "show";
    setTimeout(function(){x.className = x.className.replace("show", ""); }, 3000);

}

/**
 * Login function
 */
 
 function onLogin() {
     loader = document.getElementById('load-modal');
     //loader.style.display = 'block';

     fetch(`${BASE_URL}/auth/signin`, {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json',
         },
         body: JSON.stringify({
             username: document.getElementById('login-username').value,
             password: document.getElementById('login-password').value,

         }),
     })
     .then(res => res.json())
     .then((data) => {
         //loader.style.display = 'none';

         if (data.status === 201) {
             console.log(data.user[0]);
             var user = data.user[0];

            //Save user profile to local storage
            localStorage.setItem('token', data.token);
            localStorage.setItem('firstname', user.firstname);
            localStorage.setItem('lastname', user.lastname);
            localStorage.setItem('username', user.username);
            localStorage.setItem('email', user.email);
            localStorage.setItem('phone', user.phone);
            localStorage.setItem('admin', user.is_admin);
            localStorage.setItem('user_id', user.user_id);
            
            //Redirect to homepage after successful login
            if (user.is_admin === true){
                window.location.replace('admin_dashboard.html');
            }else{
                window.location.replace('user_profile.html');
            }
            
         }else {
             displayError(data.error)
             console.log(data.status);
         }
     })
     .catch((error) => {
        console.log(error);
        //loader.style.display = 'none';
        displayError('Kindly check your connection');
     });
}

function onSignup() {
    loader =  document.getElementById('load-modal');
    //loader.style.display = 'block';

    let payload = {
        firstname: document.getElementById('firstname').value,
        lastname: document.getElementById('lastname').value,
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        password: document.getElementById('password').value,

    }

    fetch (`${BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',           
        },
        body: JSON.stringify(payload),
    })
    .then(res => res.json())
    .then((data) => {
        //loader.style.display = 'none';

        console.log(data.data);
        if(data.status === 201){
            var user = data.data;

            // Save user profile to local storage
            localStorage.setItem('token', data.token);
            localStorage.setItem('firstname', user.firstname);
            localStorage.setItem('lastname', user.lastname);
            localStorage.setItem('username', user.username);
            localStorage.setItem('email', user.email);
            localStorage.setItem('phone', user.phone);
            localStorage.setItem('admin', user.is_admin);
            localStorage.setItem('user_id', user.user_id);

            //Redirect to homepage after successful login
            window.location.replace('user_profile.html');
        }else {
            displayError(data.error)
            console.log(data.status);
        }
    })
    .catch((error) => {
        //loader.style.display = 'none';
        displayError('Kindly check your connection')
    });
}

function loadUserProfile(){
    fname = localStorage.getItem('firstname');
    lname = localStorage.getItem('lastname');
    document.getElementById('bothnames').innerText = `${fname} ${lname}`
    document.getElementById('email').innerText = localStorage.getItem('email');
    document.getElementById('phone').innerText = localStorage.getItem('phone');
    initAdmin(); 
}

function initAdmin(){
    isAdmin = localStorage.getItem('admin');
    if(isAdmin == false){
        return false;
    }else{
        return true;
    }
}

function on_logout(){
    localStorage.clear();
    window.location.replace('signup.html')
}

