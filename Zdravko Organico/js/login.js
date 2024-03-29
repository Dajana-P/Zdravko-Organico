// Login page

// Login user
let firstName = '';
let lastName = '';

// Hamburger Menu
(function () {
    let hamMenu = {
      showHideMenu: document.getElementById('show-hide-menu'),
      navUl: document.getElementById('nav-ul'),
      sizeMin768: window.matchMedia('(min-width: 768px)'),
      isLogged: false,
      liIsLogged: `<li><a href="index.html">Početna</a></li>
            <li><a href="about-us.html">O nama</a></li>
            <li><a href="store.html">Prodavnica</a></li>
            <li><a href="contact.html">Kontakt</a></li>
            <li><a href="login.html" id="logout">Odjavi se</a></li>`,
      liIsNotLogged: `<li><a href="index.html">Početna</a></li>
            <li><a href="about-us.html">O nama</a></li>
            <li><a href="store.html">Prodavnica</a></li>
            <li><a href="contact.html">Kontakt</a></li>
            <li><a href="login.html">Prijavi se</a></li>`,
      logout: () => {
        localStorage.removeItem('userHaven');
      },
      init: () => {
        if (localStorage.getItem('userHaven')) {
          let user = JSON.parse(localStorage.userHaven);
          firstName = user.firstName;
          lastName = user.lastName;
        }
        if (firstName !== '') {
          hamMenu.isLogged = true;
        }
        hamMenu.showHideMenu.addEventListener('click', () => {
          if (hamMenu.showHideMenu.getAttribute('src') === 'img/menu.png') {
            hamMenu.showHideMenu.setAttribute('src', 'img/close.png');
            if (hamMenu.isLogged) {
              hamMenu.navUl.innerHTML = hamMenu.liIsLogged;
              let logoutBtn = document.getElementById('logout');
              logoutBtn.addEventListener('click', () => hamMenu.logout());
            } else {
              hamMenu.navUl.innerHTML = hamMenu.liIsNotLogged;
            }
          } else {
            hamMenu.showHideMenu.setAttribute('src', 'img/menu.png');
            hamMenu.navUl.innerHTML = '';
          }
        });
        hamMenu.changeMenu();
      },
      changeMenu: () => {
        if (hamMenu.sizeMin768.matches) {
          hamMenu.showHideMenu.style.display = 'none';
          if (hamMenu.isLogged) {
            hamMenu.navUl.innerHTML = hamMenu.liIsLogged;
            let logoutBtn = document.getElementById('logout');
            logoutBtn.addEventListener('click', () => hamMenu.logout());
          } else {
            hamMenu.navUl.innerHTML = hamMenu.liIsNotLogged;
          }
        }
      },
    };
    hamMenu.init();
})();

// Login form
const fName = document.getElementById('fname');
const lName = document.getElementById('lname');
const email = document.getElementById('email');
const password = document.getElementById('password');
const myForm = document.getElementById('my-form');
const errorMsgDiv = document.querySelector('.error-message');
let errorMsg = [];

myForm.addEventListener('submit', sendMessage);

function sendMessage(e) {
  e.preventDefault();
  let firstNVal = fName.value;
  let lastNVal = lName.value;
  let emailVal = email.value;
  let passwordVal = password.value;
  // User
  let userHaven = {
    firstName: firstNVal,
    lastName: lastNVal,
    email: emailVal,
    password: passwordVal,
  };
  // Regex for email
  function validateEmail(email) {
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  // Regex for password
  function validatePassword(pass) {
    let re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/;
    return re.test(pass);
  }
  // Validate form
  if (firstNVal === '' || firstNVal.length < 3 || firstNVal.length > 25) {
    errorMsg.push(
      'Ime ne sme biti prazno i može biti dugačko od 3 do 25 karaktera.'
    );
  }
  if (lastNVal === '' || lastNVal.length < 3 || lastNVal.length > 25) {
    errorMsg.push(
      'Prezime ne sme biti prazno i može biti dugačko od 3 do 25 karaktera.'
    );
  }
  if (!validateEmail(emailVal)) {
    errorMsg.push('Unesite ispravnu email adresu sa znakom @ i bez razmaka.');
  }
  if (!validatePassword(passwordVal)) {
    errorMsg.push(
      'Lozinka mora imati min jedno veliko slovo, jedan broj, specijalni znak i ukupno 6 karaktera.'
    );
  }
  if (errorMsg.length > 0) {
    errorMsg.map((err) => {
      let text = `<div>${err}</div>`;
      errorMsgDiv.innerHTML += text;
    });
    return;
  }
  // Save in local storage "userHaven"
  localStorage.userHaven = JSON.stringify(userHaven);
  myForm.submit();
}
// Clear field
fName.addEventListener('focus', clearField);
lName.addEventListener('focus', clearField);
email.addEventListener('focus', clearField);
password.addEventListener('focus', clearField);

function clearField() {
  errorMsg = [];
  errorMsgDiv.innerHTML = '';
}

// Change theme color
(function changeColorTheme() {
  const darkModeBtn = document.getElementById('darkModeBtn');
  const textBtn = document.getElementById('textBtn');
  const myBody = document.body;
  const themeBtn = document.querySelector('.theme-btn');
  const sizeMin768 = window.matchMedia('(min-width: 768px)');
  const store = document.querySelector(':root');

  darkModeBtn.addEventListener('click', (e) => {
    if (e.target.checked) {
      store.style.setProperty('--body-bg', '#000000');
      store.style.setProperty('--body-color', '#ffffff');
      textBtn.innerHTML = 'Svetla tema';
    } else {
      store.style.setProperty('--body-bg', '#ffffff');
      store.style.setProperty('--body-color', '#000000');
      textBtn.innerHTML = 'Tamna tema';
    }
    if (!myBody.classList.contains('animate')) {
      myBody.classList.toggle('animate');
      setTimeout(() => myBody.classList.remove('animate'), 1000);
    }
  });

  if (sizeMin768.matches) {
    themeBtn.style.top = '100px';
  }
})()