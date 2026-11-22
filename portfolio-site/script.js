(function(){
 var links=document.getElementById('links'),burger=document.getElementById('burger');
 burger.addEventListener('click',function(){var o=links.classList.toggle('open');burger.setAttribute('aria-expanded',o)});
 links.addEventListener('click',function(e){if(e.target.tagName==='A'){links.classList.remove('open');burger.setAttribute('aria-expanded','false')}});
 var anchors=[].slice.call(links.querySelectorAll('a:not(.mob)'));
 var secs=anchors.map(function(a){return document.querySelector(a.getAttribute('href'))});
 function spy(){document.querySelector('header').classList.toggle('scrolled',window.scrollY>40);var y=window.scrollY+120,cur=0;secs.forEach(function(s,i){if(s.getBoundingClientRect().top+window.scrollY<=y)cur=i});
  if(window.innerHeight+window.scrollY>=document.body.scrollHeight-4)cur=secs.length-1;
  anchors.forEach(function(a,i){a.classList.toggle('on',i===cur)})}
 window.addEventListener('scroll',spy,{passive:true});spy();
 document.getElementById('form').addEventListener('submit',function(e){
  e.preventDefault();var f=e.target;
  var body=encodeURIComponent(f.msg.value+'\n\n– '+f.name.value+' ('+f.email.value+')');
  window.location.href='mailto:julio.atmadja@gmail.com?subject='+encodeURIComponent('Portfolio message from '+f.name.value)+'&body='+body;
  document.getElementById('note').textContent='Opening your email app…';
 });
})();

(function(){
 var S='#about h2,#about p,.facts>div,#mission h2,#mission .lead,#experience h2,.job,#skills h2,.skills .card,.shot,.edu,#contact h2,.contact li,form label,form .btn';
 var els=[].slice.call(document.querySelectorAll(S));
 els.forEach(function(el){
  var sibs=[].slice.call(el.parentNode.children).filter(function(n){return n.matches(S)});
  el.style.setProperty('--d',Math.min(sibs.indexOf(el),6)*90+'ms');
  [].slice.call(el.querySelectorAll('.chips span')).forEach(function(c,i){c.style.setProperty('--i',i)});
 });
 if('IntersectionObserver' in window){
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -6% 0px'});
  els.forEach(function(el){io.observe(el)});
 }else{els.forEach(function(el){el.classList.add('in')})}
 var tls=[].slice.call(document.querySelectorAll('.timeline')),tick=false;
 function prog(){tick=false;var mid=window.innerHeight*.6;
  tls.forEach(function(t){var r=t.getBoundingClientRect();var p=(mid-r.top)/r.height;t.style.setProperty('--p',Math.max(0,Math.min(1,p)).toFixed(3))})}
 window.addEventListener('scroll',function(){if(!tick){tick=true;requestAnimationFrame(prog)}},{passive:true});
 window.addEventListener('resize',prog);prog();
})();
