(function(){
  const btn = document.querySelector('[data-menu-toggle]');
  const links = document.querySelector('.nav-links');
  if(btn && links){
    btn.addEventListener('click', () => {
      links.classList.toggle('open');
      btn.setAttribute('aria-expanded', links.classList.contains('open') ? 'true' : 'false');
    });
  }

  // Active nav highlight
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = (a.getAttribute('href') || '').toLowerCase();
    if(href === path) a.classList.add('active');
  });

  // Static deploy-friendly forms: open mailto with prefilled body
  document.querySelectorAll('form[data-mailto]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const to = form.getAttribute('data-mailto');
      const subject = form.getAttribute('data-subject') || 'Wholesale Inquiry';
      const data = new FormData(form);
      const lines = [];
      for(const [k,v] of data.entries()){
        lines.push(`${k}: ${v}`);
      }
      const body = encodeURIComponent(lines.join('\n'));
      const url = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${body}`;
      window.location.href = url;
      const notice = form.querySelector('[data-form-notice]');
      if(notice){
        notice.textContent = "Your email app should open with this message prefilled. If it doesn't, copy the details and email us directly.";
      }
    });
  });
})();
