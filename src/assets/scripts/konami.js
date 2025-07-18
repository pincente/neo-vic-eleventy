// Konami Code for Ultra Retro Mode
const konamiSequence = [38,38,40,40,37,39,37,39,66,65];
let konamiPosition = 0;

window.addEventListener('keydown', function(e) {
  if(e.keyCode === konamiSequence[konamiPosition]) {
    konamiPosition++;
    if(konamiPosition === konamiSequence.length) {
      document.body.classList.toggle('ultra-retro');
      alert('Ultra Retro Mode toggled! Enjoy the CRT vibes.');
      konamiPosition = 0;
    }
  } else {
    konamiPosition = 0;
  }
});
