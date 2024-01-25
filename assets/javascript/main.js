const loginBtn = document.querySelector("#login-btn");

const resetForm = document.querySelector("#reset-form");
const passwordForm = document.querySelector("#password-form");
const createForm = document.querySelector("#create-form");

const emailIndex = document.querySelector("#email-index");
const password = document.querySelector("#password");

const resetPassword = document.querySelector("#resetPassword");
const fPassword = document.querySelector("#f-password");
const sPassword = document.querySelector("#s-password");

const fName = document.querySelector("#f-name");
const lName = document.querySelector("#l-name");
const email = document.querySelector("#email");
const crePassword = document.querySelector("#cre-password");

const message = document.querySelector("#message");

const ulEl = document.querySelector('ul');
const helloUser = document.querySelector('#hello-user');

let id = 0;

let emailFlag = "";
let objList = [];
let error = "";
let success = "";

let params = {
    'firstName': '',
    'lastName': ''
};
let emailLogin = '';
let passwordLogin ='';

/* Create a account area */
const accountLink = document.querySelector('#new-account > a');
if(accountLink) {
    accountLink.addEventListener('click', e => {
        getUser()
        if(!objList) {
            objList = [{
                'id': id,
                'fName': 'admin',
                'lName': 'admin',
                'email': 'admin@email.com',
                'password': '12345'
            }];
            id++;
            setUser();
        }
    })
}

if (createForm) {
    createForm.addEventListener("submit", (e) => {
        e.preventDefault();

        if (
            fName.value === "" ||
            lName.value === "" ||
            email.value === "" ||
            crePassword.value === ""
        ) {
            error = "All fields should be filled!";
            message.innerHTML = error;
            message.classList.add("error");
            return;
        }

        createUser(id, fName.value, lName.value, email.value, crePassword.value);

        fName.value = "";
        lName.value = "";
        email.value = "";
        crePassword.value = "";

        success = "user created! now please click in sign in.";
        message.innerHTML = success;
        message.classList.add("success");
    });
}

function print(algo) {
    console.log(algo);
}

/* ---------------------------------------------------------------------- */
/* Reset password area */
if (passwordForm) {
    passwordForm.style.display = "none";

    const gLog = document.querySelector("#go-login");
    const message2 = document.querySelector("#message2");
    gLog.style.display = "none";

    passwordForm.addEventListener("submit", (e) => {
        e.preventDefault();

        if (
            fPassword.value !== sPassword.value ||
            !fPassword.value ||
            !sPassword.value
        ) {
            error = "your password must be the same in both inputs.";
            message2.classList.add("error");
            message2.innerHTML = error;
            print(emailFlag);
            return;
        }
        
        getUser();
        let newList = []
        objList.forEach(e => {
            if(e.email === emailFlag) e.password = fPassword.value;
            newList.push(e);
        })
        objList = newList;
        setUser();

        message2.innerHTML = "";
        gLog.style.display = "";
    });
}

if (resetForm) {
    resetForm.addEventListener("submit", (e) => {
        e.preventDefault();

        getUser();
        objList.map((e) => {
            if (e.email === resetPassword.value) emailFlag = e.email;
        });

        if (!resetPassword.value || !emailFlag) {
            error = "we need your email for the password reset.";
            message.classList.add("error");
            message.innerHTML = error;
            return;
        }

        passwordForm.style.display = "";
        resetForm.style.display = "none";
    });
}

/* --------------------------------------------------------------- */
/* Login Area */

if(loginBtn) {

    loginBtn.addEventListener('click', e => {

        if(!emailIndex.value || !password.value) {
            e.preventDefault()
            error = "all the fields should be filled!";
            message.classList.add("error");
            message.innerHTML = error;
            return;
        }

        getUser();
        objList.map(e => {
            if(e.email === emailIndex.value && e.password === password.value) {
                params.firstName = e.fName;
                params.lastName = e.lName; 
                emailLogin = e.email;
                passwordLogin = e.password;
            }
        });

        if(!emailLogin || !passwordLogin) {
            e.preventDefault()
            error = "wrong password or wrong email!";
            message.classList.add("error");
            message.innerHTML = error;
            return;
        }

        localStorage.setItem('user', JSON.stringify(params));

        document.location.href = './pages/users.html'
    })
}

window.addEventListener('load', e => {
    let nameF;
    let nameL;

    

    params = JSON.parse(localStorage.getItem('user'));
    if(params) {
        nameF = params.firstName;
        nameL = params.lastName
    }


    if(helloUser) {
        helloUser.innerHTML = `Hello ${nameF} ${nameL}`;
    }
    
    if(ulEl) {
        createUserList(emailLogin, passwordLogin);
    }
})

function createUser(id, fName, lName, email, password) {
    getUser();

    objList.push({
        id,
        fName,
        lName,
        email,
        password,
    });

    id++;

    setUser();
}

function setUser() {
    localStorage.setItem("users", JSON.stringify(objList));
}

function getUser() {
    objList = JSON.parse(localStorage.getItem("users"));
}

function createUserList(email, password) {
    if(email === 'admin@email.com' && password === 'admin') {
        getUser()
        objList.forEach(e => {
            ulEl.innerHTML += `<li> ${e.fName} ${e.lName} -> ${e.email} -> ${e.password} <button id="delete"> delete </button> </li>`;
        })
    }
    else {
        getUser()
        objList.forEach(e => {
            ulEl.innerHTML += `<li> ${e.fName} ${e.lName} -> ${e.email} -> ${e.password}</li>`;
        })
    }
}