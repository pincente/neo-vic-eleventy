document.addEventListener('DOMContentLoaded', () => {
  /* ===========================
   * Theme Toggle
   * =========================== */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlEl = document.documentElement;

  function setTheme(theme) {
    htmlEl.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  // init theme
  const savedTheme = localStorage.getItem('theme');
  setTheme(savedTheme ? savedTheme : 'dark');

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = htmlEl.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      setTheme(next);
    });
  }

  /* ===========================
   * Window Management
   * =========================== */
  const windows = Array.from(document.querySelectorAll('.window'));
  const dockMenu = document.getElementById('window-menu');
  const dockContainer = document.querySelector('.dock');

  let zIndexCounter = 100; // baseline

  function updateDockVisibility() {
    if (dockMenu.children.length === 0) {
      dockContainer.classList.add('hidden');
    } else {
      dockContainer.classList.remove('hidden');
    }
  }

  // helper: bring window to front
  function bringToFront(win) {
    zIndexCounter++;
    win.style.zIndex = zIndexCounter;
  }

  // helper: create dock item (called when window closed)
  function addToDock(win) {
    const titleEl = win.querySelector('.title');
    const label = titleEl ? titleEl.innerText.trim() : win.id || 'Window';
    const existing = dockMenu.querySelector(`[data-target="${win.id}"]`);
    if (existing) {
      updateDockVisibility();
      return;
    }

    const li = document.createElement('li');
    li.textContent = label;
    li.setAttribute('data-target', win.id);
    li.setAttribute('role', 'menuitem');
    li.tabIndex = 0;

    function restore() {
      win.style.display = 'block';
      win.style.height = '';
      const content = win.querySelector('.window-content');
      if (content) content.style.display = '';
      bringToFront(win);
      li.remove();
      updateDockVisibility();
    }

    li.addEventListener('click', restore);
    li.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        restore();
      }
    });

    dockMenu.appendChild(li);
    updateDockVisibility();
  }

  // attach events to each window
  windows.forEach(win => {
    win.addEventListener('mousedown', () => bringToFront(win));

    // close button
    const closeBtn = win.querySelector('.btn-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', e => {
        e.stopPropagation();
        win.style.display = 'none';
        addToDock(win);
      });
    }

    // minimize button
    const minBtn = win.querySelector('.btn-min');
    if (minBtn) {
      minBtn.addEventListener('click', e => {
        e.stopPropagation();
        const content = win.querySelector('.window-content');
        if (!content) return;
        const isHidden = content.style.display === 'none';
        if (isHidden) {
          // restore
          win.style.height = '';
          content.style.display = '';
        } else {
          // minimize
          win.style.height = '30px';
          content.style.display = 'none';
        }
      });
    }
  });

  // start hidden (no closed windows)
  updateDockVisibility();

  /* ===========================
   * Terminal Toggle
   * =========================== */
  const terminal = document.getElementById('terminal');
  const terminalToggle = document.getElementById('terminal-toggle');
  const terminalClose = document.getElementById('terminal-close');

  function openTerminal() {
    terminal.classList.remove('hidden');
    terminal.setAttribute('aria-hidden', 'false');
    const inp = document.getElementById('terminal-input');
    if (inp) inp.focus();
  }
  function closeTerminal() {
    terminal.classList.add('hidden');
    terminal.setAttribute('aria-hidden', 'true');
  }

  if (terminalToggle) terminalToggle.addEventListener('click', openTerminal);
  if (terminalClose) terminalClose.addEventListener('click', closeTerminal);

  /* ===========================
   * Boot Sequence Hide
   * =========================== */
  setTimeout(() => {
    const boot = document.getElementById('boot-sequence');
    if (boot) boot.style.display = 'none';
  }, 3500);
});
