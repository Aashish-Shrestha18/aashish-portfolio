// No tracking, dependencies, credentials, or server components.
const toggle = document.getElementById('menu-toggle');
const nav = document.getElementById('main-nav');
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.textContent = open ? 'Close' : 'Menu';
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.textContent = 'Menu';
}));
const sections = document.querySelectorAll('main section[id]');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        const anchor = nav.querySelector(`a[href="#${entry.target.id}"]`);
        if (anchor) {
          nav.querySelectorAll('a').forEach(link => link.classList.remove('active'));
          anchor.classList.add('active');
        }
      }
    }
  }, {rootMargin: '-20% 0px -65% 0px'});
  sections.forEach(section => observer.observe(section));
}
// GitHub Pages is static. This contact form transparently composes an email
// rather than pretending to submit to a backend that does not exist.
document.getElementById('contact-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const name = form.querySelector('#visitor-name').value.trim();
  const email = form.querySelector('#visitor-email').value.trim();
  const message = form.querySelector('#visitor-message').value.trim();
  const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
  const bodyText = [`Name: ${name}`, `Reply-to: ${email}`, '', 'Message:', message].join('\n');
  const body = encodeURIComponent(bodyText);
  window.location.href = `mailto:aashishshrestha194@gmail.com?subject=${subject}&body=${body}`;
});
