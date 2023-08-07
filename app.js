const signUp = () => {
    var name = document.getElementById('name');
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    var city = document.getElementById('city');
    var number = document.getElementById('number');
    var message = document.getElementById("message");
    var validemail = email.value.slice(-10, email.value.length)
    var inputs = document.getElementsByTagName('input')
    var flag = true;
    for (i = 0; i < inputs.length; i++) {
        if (inputs[i].value == '') {
            flag = false
        }
    }
    if (flag == false) {
        alert('Fill All credentials');
    }
    if (flag == true && password.value.length >= 6 && validemail == '@gmail.com') {

        var user = {
            name: name.value,
            email: email.value,
            password: password.value,
            city: city.value,
            number: number.value
        }

        var users = JSON.parse(localStorage.getItem("users")) || [];
        // get indx
        var userIdx = users.findIndex(function (val) {
            return val.email.toLowerCase() === user.email.toLowerCase()
        });

        if (userIdx === -1) {
            // this user is not exist
            users.push(user);
            // store in storage
            localStorage.setItem("users", JSON.stringify(users));
            // redirect to index page
            location.href = "index.html";
        }
        else {
            message.innerHTML = user.email + " use in another account";
        }
        // clear state
        setTimeout(() => {
            message.innerHTML = "";
        }, 2000);
    }

    if (validemail != '@gmail.com') {
        alert('Invalid Email');
    }
    else if (password.value.length < 6) {
        alert('Password must be at least 6 characters')
    }
}


const login = () => {
    // get input values
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    var message = document.getElementById("message");
    if (email.value != '' && password.value != '') {
        var user = {
            email: email.value,
            password: password.value,
        }

        var users = JSON.parse(localStorage.getItem("users")) || [];
        // get indx
        var currentUser = users.find(function (val) {
            return val.email.toLowerCase() === user.email.toLowerCase() && val.password === user.password;
        });

        if (currentUser) {
            localStorage.setItem("user", JSON.stringify(currentUser));
            // user login
            location.href = "dashboard.html";
        } else {
            message.innerHTML = "Invalid credentials";
            message.style.color = 'red';
            email.value = "";
            password.value = "";
        }
        // clear state
        setTimeout(() => {
            message.innerHTML = "";
        }, 2000);
    }
    
}


const logout = () => {
    localStorage.removeItem("user");
    setTimeout(() => {
        location.href = "index.html";
    }, 1000);
}



var getCurrentUser = () => {
    var currentUserName = document.getElementById('currentUserName');
    var currentUserEmail = document.getElementById('currentUserEmail');
    var currentUserCity = document.getElementById('currentUserCity');
    var currentUserNumber = document.getElementById('currentUserNumber');
    var user = JSON.parse(localStorage.getItem("user"));
    // console.log(user);
    if (user == null) {
        location.href = 'index.html';
    }
    if (user != null) {
        currentUserName.innerHTML = user.name;
        currentUserEmail.innerHTML = user.email.slice(0,-10);
        currentUserCity.innerHTML = user.city;
        currentUserNumber.innerHTML = user.number;
    }
}

const post = () => {
    var title = document.getElementById('title');
    var description = document.getElementById('description');
    if (title.value == '' && description.value == '') {
        alert('Fill title and description box to Post items')
    }
    if (title.value != '' && description.value != '') {
        var post = document.getElementById('postItem');
        var divMain = document.createElement('div');
        var h5 = document.createElement('h5');
        var divInner = document.createElement('div');
        var image = document.createElement('img');
        var para = document.createElement('p')

        divMain.setAttribute("class", "card")
        divMain.setAttribute("style", "width: 18rem;")
        image.setAttribute("class", "card-img-top")
        image.setAttribute("src", "images/program.png")
        divInner.setAttribute("class", "card-body")
        h5.setAttribute("class", "card-title")
        para.setAttribute("class", "card-text")

        var h5Text = document.createTextNode(title.value);
        h5.appendChild(h5Text)
        var paraText = document.createTextNode(description.value);
        para.appendChild(paraText)
        divInner.appendChild(h5)
        divInner.appendChild(para)
        divMain.appendChild(image)
        divMain.appendChild(divInner);
        post.appendChild(divMain);
        title.value = "";
        description.value = "";
    }

}
