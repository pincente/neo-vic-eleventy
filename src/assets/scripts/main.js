// Bring-to-front windows on click
const windows = document.querySelectorAll('.window');
let zIndex = 10;
windows.forEach(win => {
  win.addEventListener('click', () => {
    zIndex++;
    win.style.zIndex = zIndex;
  });
});

// Close and minimize buttons
const closeButtons = document.querySelectorAll('.btn-close');
const minButtons = document.querySelectorAll('.btn-min');

closeButtons.forEach(btn => btn.addEventListener('click', e => {
  e.target.closest('.window').style.display = 'none';
}));

minButtons.forEach(btn => btn.addEventListener('click', e => {
  const content = e.target.closest('.window').querySelector('.window-content');
  if (content.style.display === 'none') {
    content.style.display = 'block';
  } else {
    content.style.display = 'none';
  }
}));
```

