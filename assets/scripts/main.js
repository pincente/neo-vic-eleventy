// Theme toggle
const themeToggleBtn = document.getElementById('theme-toggle');
const htmlEl = document.documentElement;

function setTheme(theme) {
  htmlEl.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

themeToggleBtn.addEventListener('click', () => {
  const current = htmlEl.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  setTheme(next);
});

const savedTheme = localStorage.getItem('theme');
if(savedTheme) {
  setTheme(savedTheme);
} else {
  setTheme('dark');
}

// Window controls (minimize & close)
document.querySelectorAll('.btn-close').forEach(btn => {
  btn.addEventListener('click', e => {
    const win = e.target.closest('.window');
    win.style.display = 'none';
  });
});
document.querySelectorAll('.btn-min').forEach(btn => {
  btn.addEventListener('click', e => {
    const win = e.target.closest('.window');
    if(win.style.height === '30px') {
      win.style.height = '';
      win.querySelector('.window-content').style.display = '';
    } else {
      win.style.height = '30px';
      win.querySelector('.window-content').style.display = 'none';
    }
  });
});

// Terminal toggle
const terminal = document.getElementById('terminal');
const terminalToggle = document.getElementById('terminal-toggle');
const terminalClose = document.getElementById('terminal-close');

terminalToggle.addEventListener('click', () => {
  terminal.classList.toggle('hidden');
  terminal.setAttribute('aria-hidden', terminal.classList.contains('hidden'));
  if(!terminal.classList.contains('hidden')) {
    document.getElementById('terminal-input').focus();
  }
});

terminalClose.addEventListener('click', () => {
  terminal.classList.add('hidden');
  terminal.setAttribute('aria-hidden', 'true');
});

// Boot sequence animation: remove after 3.5 seconds
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const boot = document.getElementById('boot-sequence');
    if (boot) {
      boot.style.display = 'none';
    }
  }, 3500);
});
