// Zdravko Organico početna stranica

// Login
let firstName = '';
let lastName = '';

// Hamburger Meni
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

// Poruka dobrodošlice
(function () {
    let welcome = {
      welcomeText: document.getElementById('welcomeText'),
      init: () => window.addEventListener('DOMContentLoaded', welcome.showTime),
      showTime: function () {
        let date = new Date();
        let h = date.getHours();
        let m = date.getMinutes();
        let s = date.getSeconds();
        h = h < 10 ? (h = '0' + h) : h;
        m = m < 10 ? (m = '0' + m) : m;
        s = s < 10 ? (s = '0' + s) : s;
        const welc = 'i dobrodošli';
        if (h < 12) {
          welcome.welcomeText.innerHTML = `Dobro jutro ${welc} ${firstName} ${lastName}`;
        }
        if (h >= 12) {
          welcome.welcomeText.innerHTML = `Dobar dan ${welc} ${firstName} ${lastName}`;
        }
        if (h >= 20) {
          welcome.welcomeText.innerHTML = `Dobro veče ${welc} ${firstName} ${lastName}`;
        }
      },
    };
    welcome.init();
})();

// Komentari sa AJAX-om
function run() {
  let xhr = new XMLHttpRequest();

  // Konekcija
  let url = 'https://dummyjson.com/comments';
  xhr.open('GET', url, true);

  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const commentsContainer = document.querySelector('.comments-container');
      let commentsArray = null;
      let allComments = JSON.parse(this.responseText);
      commentsArray = allComments.comments;

      for (let index = 0; index < 3; index++) {
        let randomNumber = Math.floor(Math.random() * 30);
        let randUser = commentsArray[randomNumber];
        let text = `
      <div class="comments-box">
          <h4>${randUser.user.username}</h4>
          <p>${randUser.body}</p>
        </div>
      `;
        commentsContainer.innerHTML += text;
      }
      
    }
  };
  xhr.send();
}
run();

// Slajder slika
let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 3500); // Menjanje slike svake 3.5 sekunde
}

// Menjanje boje teme
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