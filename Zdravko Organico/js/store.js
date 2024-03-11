// Store page
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
        console.log('Radi');
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


