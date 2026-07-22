(function () {
  var CHATBOT_SRC =
    'https://chatbotwebsiteg2m-c8atg0eqhubgd4ec.francecentral-01.azurewebsites.net/';

  var toggle = document.getElementById('chatbot-toggle');
  var panel = document.getElementById('chatbot-panel');
  var closeBtn = document.getElementById('chatbot-close');
  var frame = document.getElementById('chatbot-frame');

  if (!toggle || !panel || !frame) return;

  function isOpen() {
    return !panel.hasAttribute('hidden');
  }

  function setOpen(open) {
    if (open) {
      if (!frame.getAttribute('src')) {
        frame.setAttribute('src', CHATBOT_SRC);
      }
      panel.removeAttribute('hidden');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Fermer le chatbot');
    } else {
      panel.setAttribute('hidden', '');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Ouvrir le chatbot');
    }
  }

  toggle.addEventListener('click', function () {
    setOpen(!isOpen());
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', function () {
      setOpen(false);
      toggle.focus();
    });
  }

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && isOpen()) {
      setOpen(false);
      toggle.focus();
    }
  });
})();
