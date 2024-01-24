const loginBtn = document.querySelector('#login-btn');
const resetBtn = document.querySelector('#reset-btn');
const passwordBtn = document.querySelector('#password-btn');
const createBtn = document.querySelector('#create-btn');

const emailIndex = document.querySelector('#email-index');
const password = document.querySelector('#password');

const resetPassword = document.querySelector('#resetPassword');
const fPassword = document.querySelector('#f-password');
const sPassword = document.querySelector('#s-password');

const fName = document.querySelector('#f-name');
const lName = document.querySelector('#l-name');
const email = document.querySelector('#email');
const crePassword = document.querySelector('#cre-password');

let objList = [];

createBtn.addEventListener('submit', e => {
    console.log('oi');
})

function createUser() {
    let user = new User(fName.value, lName.value, email.value, crePassword.value);
    objList.push(user);
    sessionStorage.setItem('users', JSON.stringify(objList));
}