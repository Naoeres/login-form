const loginForm = document.querySelector('#login-form');
const resetForm = document.querySelector('#reset-form');
const passwordForm = document.querySelector('#password-form');
const createForm = document.querySelector('#create-form');

const emailIndex = document.querySelector('#email-index');
const password = document.querySelector('#password');

const resetPassword = document.querySelector('#resetPassword');
const fPassword = document.querySelector('#f-password');
const sPassword = document.querySelector('#s-password');

const fName = document.querySelector('#f-name');
const lName = document.querySelector('#l-name');
const email = document.querySelector('#email');
const crePassword = document.querySelector('#cre-password');

const message = document.querySelector('#message');

let objList = [];
let error = '';
let success = '';

if(createForm) {
    createForm.addEventListener('submit', e => {

        if(fName.value === '' || lName.value === '' || email.value === '' || password.value === '') {
            e.preventDefault();
            error = 'All fields should be filled!';
            message.innerHTML = error;
            message.classList.add('error');
            return;
        }

        createUser(fName.value, lName.value, email.value, crePassword.value);
        success = 'user created!';
        document.location.href = '../index.html';
        message.innerHTML = success;
        message.classList.add('success');
    });
}

function print(algo) {
    console.log(algo)
}

function createUser(fName, lName, email, password) {;
    objList.push({
        fName,
        lName,
        email,
        password
    });
    localStorage.setItem('users', JSON.stringify(objList));
    print(objList);
}

function writeMessage(message) {
    message.innerHTML = message;
    message.classList.add(`${message}`);
}