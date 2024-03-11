// Submit page
const successfulMsg = document.getElementById('successful-message');

if (successfulMsg.innerText === 'Poruka je uspešno poslata.') {
  setTimeout(function () {
    window.location = 'index.html';
  }, 3000);
}
