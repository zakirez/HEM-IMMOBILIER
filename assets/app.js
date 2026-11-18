/* HEM IMMOBILIER — reveal animation accessible, progressive et sans dépendance */
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const selectors = [
    '.hero .eyebrow','.hero h1','.hero p','.hero .actions',
    '.inner-hero .eyebrow','.inner-hero .kicker','.inner-hero h1','.inner-hero p',
    '.feat','.about-grid > *','.section .kicker','.section h2',
    '.section .container > p','.section .underline','.property',
    '.panel','.info-grid > *','.cta-band > *','.section .btn',
    '.text-list','.form > *','.foot-grid > div',
    '.reveal','.section img:not(.logo):not(.footer-logo)',
    '.section .filter','.section .filter > *'
  ];
  const seen=new Set();
  const targets=[...document.querySelectorAll(selectors.join(','))].filter(el=>{
    if(seen.has(el) || el.closest('.nav, .top')) return false;
    // Do not animate both an element and its animated ancestor.
    if(el.closest('.reveal') && !el.classList.contains('reveal')) return false;
    seen.add(el);return true;
  });
  targets.forEach(el=>{
    let siblings=[...el.parentElement.children].filter(node=>targets.includes(node));
    el.style.setProperty('--motion-delay', Math.min(siblings.indexOf(el)*110,550)+'ms');
    el.classList.add('motion-enter');
  });
  const reveal=(el)=>el.classList.add('motion-visible','visible');
  if(reduceMotion || !('IntersectionObserver' in window)) targets.forEach(reveal);
  else {
    const observer=new IntersectionObserver((entries)=>entries.forEach(entry=>{
      if(entry.isIntersecting){reveal(entry.target);observer.unobserve(entry.target);}
    }),{threshold:.06,rootMargin:'0px 0px 45px 0px'});
    targets.forEach(el=>observer.observe(el));
  }
  const f=document.querySelector('#property-search');
  if(f) f.addEventListener('input',()=>{
    const term=(f.querySelector('input')?.value||'').toLowerCase();
    const type=(f.querySelector('select')?.value||'').toLowerCase();
    document.querySelectorAll('.property').forEach(p=>{
      p.style.display=(p.textContent.toLowerCase().includes(term)&&(!type||p.textContent.toLowerCase().includes(type)))?'':'none';
    });
  });
})();
