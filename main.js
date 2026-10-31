  // Header blir solid når du scroller
  const header = document.getElementById('top');
  const onScroll = () => header.classList.toggle('solid', window.scrollY > 40);
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });

  // Mobilmeny
  const burger = document.getElementById('burger'), nav = document.getElementById('nav');
  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Lukk meny' : 'Åpne meny');
    if (open) header.classList.add('solid'); else onScroll();
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { nav.classList.remove('open'); burger.setAttribute('aria-expanded', false); }));

  // Elementer glir inn når de blir synlige
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: .12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => {
    const sibs = [...el.parentElement.children].filter(c => c.classList.contains('reveal'));
    el.style.transitionDelay = (sibs.indexOf(el) % 4) * 90 + 'ms';
    io.observe(el);
  });

  document.getElementById('yr').textContent = new Date().getFullYear();
