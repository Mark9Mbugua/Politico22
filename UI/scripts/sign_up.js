const url = "https://politico-final.herokuapp.com/api/v2/auth/signup";
let register = document.getElementById('register');

register.onclick = (event) => {
    event.preventDefault();
    let firstname = document.getElementById('fname');
    let lastname = document.getElementById('lname');
    let username = document.getElementById('uname');
    let email = document.getElementById('email');
    let phone = document.getElementById('phone');
    let password = document.getElementById('pwd');

    let signUpData = {
        firstname: firstname.value,
        lastname: lastname.value,
        username: username.value, 
        email: email.value,
        phone: phone.value,
        password: password.value,
    }

    let fetchData = {
        method: 'POST',
        body: JSON.stringify(signUpData),
        headers: new Headers ({
            'Content-Type': 'application/json'
        }),
    }
    fetch(url, fetchData)
    .then(response => response.json())
    .then(data => {
        let success = data['data'],
            error = data['error'];
        
        if (success) {
            window.location.replace('user_profile.html')
        }
        else if (error){
            let error_p = document.getElementById('error');
            error_p.innerHTML = error;
            error_p.className += "error";
            console.log(error)
        }
    })
    .catch(error => {
        let error_p = document.getElementById('error');
        error_p.innerHTML = error;
        error_p.className += "error";
        console.log(error)
    })
    
};