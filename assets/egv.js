/* aviso por Telegram (api/aviso.php) */
window.egvAviso=function(tipo,datos){try{fetch('/api/aviso.php',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({tipo:tipo,datos:datos}),keepalive:true}).catch(function(){});}catch(e){}};
/* chat: El Viajecito en Vercel, solo en el dominio real */
try{if(/(^|\.)elgranviajecito\.com$/.test(location.hostname)&&!window.EGV_CHAT_API)window.EGV_CHAT_API='https://egv-chat.vercel.app/api/chat';}catch(e){}
try{
(function(){var f=document.getElementById("nl");if(!f)return;f.addEventListener("submit",function(ev){ev.preventDefault();if(!f.checkValidity()){f.reportValidity();return;}var g=function(n){var x=f.querySelector("[name=\""+n+"\"]");return x?x.value.trim():"";};try{fetch("https://formsubmit.co/ajax/contacto@elgranviajecito.com",{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify({_subject:"Avisame de nuevas salidas · "+g("nombre"),_template:"table",_captcha:"false",_replyto:g("mail"),Nombre:g("nombre"),WhatsApp:g("whatsapp"),Mail:g("mail"),Origen:"footer · avisame de nuevas salidas"})}).catch(function(){});}catch(e){}window.egvAviso("nl",{Nombre:g("nombre"),WhatsApp:g("whatsapp"),Mail:g("mail"),Pagina:location.pathname});if(window.egvTrack)window.egvTrack("lead_espera",{origen:"footer"});f.querySelector(".ft-nl-f").hidden=true;document.getElementById("nl-ok").hidden=false;});})();
}catch(e){if(window.console)console.error('[egv]',e);}
try{
(function(){
  // filtros de región
  var chips=document.querySelectorAll('.chip[data-f]'),grid=document.getElementById('trips'),count=document.getElementById('count');
  function apply(f){var n=0;grid.querySelectorAll('.tc').forEach(function(c){var ok=f==='*'||c.dataset.region===f;c.hidden=!ok;if(ok)n++;});if(count)count.textContent=n+(n===1?' viaje':' viajes')+(f==='*'?'':' en '+f);}
  chips.forEach(function(b){b.addEventListener('click',function(){chips.forEach(function(x){x.setAttribute('aria-pressed',x===b)});apply(b.dataset.f);});});
  if(grid&&chips.length)apply('*');
  // reseñas
  var rv=document.getElementById('rv');
  document.querySelectorAll('[data-rv]').forEach(function(b){b.addEventListener('click',function(){if(rv)rv.scrollBy({left:(+b.dataset.rv)*rv.clientWidth*.85,behavior:'smooth'});});});
  // barra fija: aparece al pasar el primer bloque
  var dock=document.getElementById('dock'),hero=document.querySelector('.hero,.fh');
  if(dock&&hero&&'IntersectionObserver'in window){new IntersectionObserver(function(e){dock.classList.toggle('on',!e[0].isIntersecting);}).observe(hero);}else if(dock){dock.classList.add('on');}
  // formularios de contacto
  document.querySelectorAll('[data-aviso]').forEach(function(f){f.addEventListener('submit',function(ev){ev.preventDefault();if(!f.checkValidity()){f.reportValidity();return;}
    var g=function(n){var x=f.querySelector('[name="'+n+'"]');return x?x.value.trim():'';};
    var msg='Hola! Soy '+g('nombre')+'. Quiero consultar por '+g('destino')+'.'+(g('mensaje')?' '+g('mensaje'):'')+' Mi WhatsApp: '+g('whatsapp')+(g('mail')?' · mail: '+g('mail'):'')+' (web)';
    var url='https://wa.me/59899244227?text='+encodeURIComponent(msg);
    // copia por mail (FormSubmit → contacto@elgranviajecito.com; solo funciona en el dominio real)
    try{fetch('https://formsubmit.co/ajax/contacto@elgranviajecito.com',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify({_subject:'Consulta web: '+g('destino')+' · '+g('nombre'),_template:'table',_captcha:'false',_replyto:g('mail'),Nombre:g('nombre'),Viaje:g('destino'),WhatsApp:g('whatsapp'),Mail:g('mail'),Mensaje:g('mensaje'),Pagina:location.href})}).catch(function(){});}catch(e){}window.egvAviso('consulta',{Nombre:g('nombre'),Viaje:g('destino'),WhatsApp:g('whatsapp'),Mail:g('mail'),Mensaje:g('mensaje'),Pagina:location.pathname});
    var ok=f.querySelector('.ok');ok.hidden=false;ok.innerHTML='¡Listo! Tocá para mandarnos tu consulta por WhatsApp: <a class="btn btn-mg" style="margin-top:10px" target="_blank" rel="noopener" href="'+url+'">Enviar por WhatsApp</a>';
    try{window.open(url,'_blank');}catch(e){}
    if(window.egvTrack)window.egvTrack('lead_espera',{viaje:g('destino')});
  });});
  // reservar
  var sel=document.getElementById('r-v');
  if(sel){
    var q=new URLSearchParams(location.search).get('v');if(q)sel.value=q;
    var fmt=function(n){return 'USD '+n.toLocaleString('es-UY');};
    var upd=function(){var o=sel.selectedOptions[0];var p=+o.dataset.p;document.getElementById('r-name').textContent=o.textContent.split(' · ')[0];document.getElementById('r-dates').textContent=o.dataset.d;document.getElementById('r-price').textContent=fmt(p);document.getElementById('r-bal').textContent=fmt(p-400);};
    sel.addEventListener('change',upd);upd();
    document.getElementById('res').addEventListener('submit',function(ev){ev.preventDefault();var f=ev.target;if(!f.checkValidity()){f.reportValidity();return;}var ok=document.getElementById('r-ok');ok.hidden=false;var fd=new FormData(f),parts=[];fd.forEach(function(v,k){if(v&&String(v).trim())parts.push(k+': '+String(v).trim());});var o=document.getElementById('r-v').selectedOptions[0];var msg='Hola! Quiero reservar '+o.textContent.split(' · ')[0]+' ('+o.dataset.d+'). '+parts.join(' · ')+' (web)';var url='https://wa.me/59899244227?text='+encodeURIComponent(msg);try{var obj={_subject:'Reserva web: '+o.textContent.split(' · ')[0]+' · '+document.getElementById('r-n').value.trim(),_template:'table',_captcha:'false',Viaje:o.textContent.split(' · ')[0]+' ('+o.dataset.d+')',Pagina:location.href};fd.forEach(function(v,k){if(v&&String(v).trim())obj[k]=String(v).trim();});var em=f.querySelector('[type=email]');if(em&&em.value)obj._replyto=em.value.trim();fetch('https://formsubmit.co/ajax/contacto@elgranviajecito.com',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(obj)}).catch(function(){});}catch(e){}try{var av={Viaje:obj.Viaje};fd.forEach(function(v,k){if(v&&String(v).trim()&&k!=='viaje')av[k.charAt(0).toUpperCase()+k.slice(1)]=String(v).trim();});window.egvAviso('reserva',av);}catch(e){}ok.innerHTML='¡Listo, '+document.getElementById('r-n').value.split(' ')[0]+'! Para confirmar tu lugar, mandanos el pedido por WhatsApp y te pasamos cómo pagar la seña: <a class="btn btn-mg" style="margin-top:10px" target="_blank" rel="noopener" href="'+url+'">Enviar por WhatsApp</a>';try{window.open(url,'_blank');}catch(e){}});
  }
  // visor de fotos
  var lb=document.getElementById('lbx');
  if(lb){var li=lb.querySelector('img'),lc=lb.querySelector('.lbx-c'),list=[],k=0,last=null;
    function op(i){k=(i+list.length)%list.length;var f=list[k],im=f.querySelector('img');li.src=im.currentSrc||im.src;var ss=im.getAttribute('srcset');if(ss){var big=ss.split(',').pop().trim().split(' ')[0];if(big)li.src=big;}li.alt=im.alt;lc.textContent=(k+1)+' / '+list.length+' · '+im.alt;lb.hidden=false;document.documentElement.style.overflow='hidden';}
    function cl(){lb.hidden=true;document.documentElement.style.overflow='';if(last)last.focus();}
    document.addEventListener('click',function(e){var f=e.target.closest&&e.target.closest('[data-lb]');if(!f)return;var g=f.parentNode;list=[].slice.call(g.querySelectorAll('[data-lb]'));last=f;op(list.indexOf(f));lb.querySelector('.lbx-x').focus();});
    document.addEventListener('keydown',function(e){var f=e.target.closest&&e.target.closest('[data-lb]');if(f&&(e.key==='Enter'||e.key===' ')){e.preventDefault();f.click();return;}if(lb.hidden)return;if(e.key==='Escape')cl();if(e.key==='ArrowRight')op(k+1);if(e.key==='ArrowLeft')op(k-1);});
    lb.querySelector('.lbx-x').onclick=cl;lb.querySelector('.lbx-n').onclick=function(){op(k+1);};lb.querySelector('.lbx-p').onclick=function(){op(k-1);};
    lb.addEventListener('click',function(e){if(e.target===lb)cl();});}
  // hero dinámico
  var hero=document.querySelector('.hero');
  if(hero){
    var sl=[].slice.call(hero.querySelectorAll('.hs')),dt=[].slice.call(hero.querySelectorAll('.hdot')),cur=0,tm=null,DUR=7000;
    var rm=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var ht=document.getElementById('hc-t'),hc=document.getElementById('hc-c');
    function show(i){cur=(i+sl.length)%sl.length;sl.forEach(function(s,k){s.classList.toggle('on',k===cur);var im=s.querySelector('img');if(k===cur&&im&&im.loading==='lazy')im.loading='eager';});
      dt.forEach(function(d,k){d.classList.toggle('on',k===cur);d.classList.toggle('seen',k<cur);var i2=d.querySelector('i');if(k===cur&&i2){i2.style.animation='none';void i2.offsetWidth;i2.style.animation='';}});
      if(ht){ht.textContent=sl[cur].dataset.t;hc.textContent=sl[cur].dataset.c;}
      var nx=sl[(cur+1)%sl.length].querySelector('img');if(nx)nx.loading='eager';
      if(!rm){clearTimeout(tm);tm=setTimeout(function(){show(cur+1);},DUR);}}
    dt.forEach(function(d,k){d.addEventListener('click',function(){show(k);});});
    document.addEventListener('visibilitychange',function(){if(document.hidden)clearTimeout(tm);else if(!rm)tm=setTimeout(function(){show(cur+1);},DUR);});
    if(sl.length>1)show(0);
  }
})();
(function(){
  var rm=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function vis(v){return v.offsetParent!==null;}
  // hero: reproducir solo las columnas visibles
  (function(){var hv=[].slice.call(document.querySelectorAll('.hv video,.fh-loop video'));
    function pl(v){v.muted=true;var p=v.play();if(p&&p.catch)p.catch(function(){});}
    if('IntersectionObserver'in window){var o=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)pl(e.target);else e.target.pause();});},{threshold:.05});hv.forEach(function(v){o.observe(v);});}else hv.forEach(pl);
    window.addEventListener('hashchange',function(){setTimeout(function(){hv.forEach(function(v){if(v.offsetParent!==null)pl(v);});},60);});
    function kick(){document.querySelectorAll('.pgr:not([hidden]) video[autoplay]').forEach(function(v){if(v.paused&&v.offsetParent!==null&&!(v.closest('.ended')))pl(v);});}
    ['touchstart','click','scroll'].forEach(function(ev){window.addEventListener(ev,kick,{passive:true,once:true});});
  })();
  // cards: video al pasar el mouse (desktop) o al quedar en pantalla (celular)
  var hover=window.matchMedia('(hover:hover)').matches;
  document.querySelectorAll('.tc').forEach(function(c){var v=c.querySelector('.tc-v');if(!v)return;
    var ph=c.querySelector('.tc-ph');if(ph&&!ph.querySelector('.vbadge')){var b=document.createElement('span');b.className='vbadge';b.textContent='Video';ph.appendChild(b);}
    function on(){v.preload='auto';var p=v.play();if(p&&p.then)p.then(function(){c.classList.add('vplay');}).catch(function(){});}
    function off(){v.pause();c.classList.remove('vplay');}
    if(hover){c.addEventListener('mouseenter',on);c.addEventListener('mouseleave',off);}
    else if('IntersectionObserver'in window){new IntersectionObserver(function(es){es.forEach(function(e){e.intersectionRatio>.6?on():off();});},{threshold:[0,.6]}).observe(c);}
  });
  // v9.3 reels: preview mudo de 15 s, al terminar "Abrir para ver más" + reproductor completo con sonido
  window.egvOpenReel=function(src,poster,title,back){
    var m=document.createElement('div');m.className='rlm';m.setAttribute('role','dialog');m.setAttribute('aria-label',title||'Video');
    m.innerHTML='<video controls playsinline autoplay src="'+src+'" poster="'+(poster||'')+'"></video><button type="button" aria-label="Cerrar">×</button>';
    document.body.appendChild(m);document.documentElement.style.overflow='hidden';var x=m.querySelector('button');x.focus();
    function cl(){m.remove();document.documentElement.style.overflow='';if(back)back.focus();document.removeEventListener('keydown',k);}
    function k(e){if(e.key==='Escape')cl();}
    x.onclick=cl;m.addEventListener('click',function(e){if(e.target===m)cl();});document.addEventListener('keydown',k);
  };
  var io='IntersectionObserver'in window?new IntersectionObserver(function(es){es.forEach(function(e){var v=e.target.querySelector('video');if(!v)return;if(e.isIntersecting){if(e.target.classList.contains('ended'))return;v.preload='auto';var p=v.play();if(p&&p.catch)p.catch(function(){});}else v.pause();});},{threshold:.5}):null;
  document.querySelectorAll('.rl-i').forEach(function(b){var v=b.querySelector('video');if(v)v.addEventListener('ended',function(){b.classList.add('ended');});if(io)io.observe(b);b.addEventListener('click',function(){
    window.egvOpenReel(b.dataset.src,b.dataset.poster,b.dataset.t,b);});});
})();

/* v8.1: sonido del reel en el hero de la ficha + cinta de viajes volando */
(function(){
  document.querySelectorAll('.fh-v').forEach(function(w){
    var v=w.querySelector('video');if(!v||!w.dataset.src)return;
    var sec=w.closest('.fh'),bg=sec&&sec.querySelector('.fh-bgv');
    v.addEventListener('ended',function(){w.classList.add('ended');if(sec)sec.classList.add('vend');if(bg){bg.removeAttribute('autoplay');bg.pause();}});
    if(bg){v.addEventListener('play',function(){if(!sec.classList.contains('vend')){bg.currentTime=v.currentTime;bg.play().catch(function(){});}});v.addEventListener('pause',function(){bg.pause();});}
    function op(){v.pause();window.egvOpenReel(w.dataset.src,w.dataset.poster,w.dataset.t,w.querySelector('.fh-snd'));}
    w.querySelectorAll('.fh-more,.fh-snd').forEach(function(b){b.addEventListener('click',op);});
    v.addEventListener('click',op);
    if('IntersectionObserver' in window){new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){if(!w.classList.contains('ended')){v.muted=true;v.play().catch(function(){});}}else{v.pause();}});},{threshold:.15}).observe(v);}
  });
  var rm=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('[data-fly]').forEach(function(f){
    var t=f.querySelector('.fly-t');if(!t||rm)return;
    t.innerHTML+=t.innerHTML.replace(/<article /g,'<article aria-hidden="true" ');
    t.querySelectorAll('[aria-hidden="true"] a').forEach(function(a){a.tabIndex=-1;});
    var n=t.children.length/2;t.style.setProperty('--fd',(n*6)+'s');
    f.classList.add('on');
    f.addEventListener('touchstart',function(){f.classList.add('hold');},{passive:true});
    f.addEventListener('touchend',function(){setTimeout(function(){f.classList.remove('hold');},1200);},{passive:true});
  });
})();

}catch(e){if(window.console)console.error('[egv]',e);}
try{
/* El Gran Viajecito · animaciones (GSAP 3.13 + ScrollTrigger + SplitText + Lenis) */
(function(){
  var hd=document.querySelector('.hd');
  function hdState(){if(hd)hd.classList.toggle('sc',window.scrollY>40);}
  window.addEventListener('scroll',hdState,{passive:true});hdState();

  if(!window.gsap||!window.ScrollTrigger)return;
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  var plugins=[ScrollTrigger];
  if(window.SplitText)plugins.push(SplitText);
  if(window.ScrambleTextPlugin)plugins.push(ScrambleTextPlugin);
  if(window.MotionPathPlugin)plugins.push(MotionPathPlugin);
  gsap.registerPlugin.apply(gsap,plugins);
  document.documentElement.classList.add('mo');
  var fine=window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  var EASE='expo.out';

  /* scroll suave */
  var lenis=null;
  var inFrame=false;try{inFrame=window.self!==window.top;}catch(e){inFrame=true;}
  if(window.Lenis&&!inFrame){
    lenis=new Lenis({lerp:.11,wheelMultiplier:1,smoothWheel:true});
    lenis.on('scroll',ScrollTrigger.update);
    gsap.ticker.add(function(t){lenis.raf(t*1000);});
    gsap.ticker.lagSmoothing(0);
  }
  document.addEventListener('click',function(ev){
    var a=ev.target.closest&&ev.target.closest('a[href^="#"]');if(!a)return;
    var h=a.getAttribute('href');if(h.length<2||h.charAt(1)==='/')return;
    var id=h.slice(1),el=null;
    try{el=document.querySelector('.pgr:not([hidden]) #'+CSS.escape(id))||document.getElementById(id);}catch(e){}
    if(!el||!lenis)return;
    ev.preventDefault();
    var off=(hd?hd.offsetHeight:70)+(document.querySelector('.pgr:not([hidden]) .tabs, .tabs')?52:12);
    lenis.scrollTo(el,{offset:-off,duration:1.2});
  });

  /* barra de progreso */
  var prog=document.querySelector('.prog');
  if(prog)gsap.to(prog,{scaleX:1,ease:'none',scrollTrigger:{start:0,end:'max',scrub:.3}});

  /* marquesina de códigos: velocidad según el scroll */
  document.querySelectorAll('.codes-t').forEach(function(t){
    var tw=gsap.to(t,{xPercent:-50,repeat:-1,duration:48,ease:'none'});
    var dir=1;
    ScrollTrigger.create({start:0,end:'max',onUpdate:function(self){
      var v=self.getVelocity();dir=self.direction;
      gsap.to(tw,{timeScale:dir*(1+Math.min(Math.abs(v)/250,6)),duration:.25,overwrite:true,onComplete:function(){gsap.to(tw,{timeScale:dir,duration:1.2});}});
    }});
  });

  function words(el){
    if(!window.SplitText)return null;
    var sp=SplitText.create(el,{type:'words',mask:'words',wordsClass:'split-w'});
    return sp.words;
  }

  var ctx=null;
  function init(scope){
    if(ctx)ctx.revert();
    ctx=gsap.context(function(){
      var q=function(s){return gsap.utils.toArray(scope.querySelectorAll(s));};
      var mm=gsap.matchMedia();

      /* HERO home */
      q('.hero').forEach(function(h){
        var tl=gsap.timeline({defaults:{ease:EASE}});
        var bg=h.querySelector('.hero-bg');
        if(bg)tl.from(bg,{autoAlpha:0,duration:1.4,ease:'power2.out'},0);
        var d=h.querySelector('[data-split]'),w=null;
        if(d&&window.SplitText){var spc=SplitText.create(d,{type:'words,chars',wordsClass:'split-w',charsClass:'tw-c'});w=spc.chars;}
        if(w){d.classList.add('typing');tl.from(w,{autoAlpha:0,duration:.01,stagger:.06,ease:'none'},.25);
          var mk=d.querySelector('.mark');if(mk){var k=w.indexOf(mk.querySelector('.tw-c'));if(k>-1)tl.from(mk,{autoAlpha:0,duration:.01},.25+k*.06);}
          tl.call(function(){d.classList.remove('typing');},null,.25+w.length*.06);}
        tl.from(h.querySelectorAll('.hero-top span, h1 .eyebrow, .hero-sub, .cta .btn, .hero-facts, .hero-ui'),{y:26,autoAlpha:0,duration:1,stagger:.06},.45);
        var pass=h.querySelector('.pass');
        if(pass)tl.from(pass,{y:80,rotate:-10,autoAlpha:0,duration:1.4},.7);
        var cols=h.querySelectorAll('.hv-c');
        if(cols.length){gsap.from(cols,{yPercent:12,duration:1.3,stagger:.12,ease:'power3.out'});
          cols.forEach(function(c,i){gsap.to(c.querySelector('video'),{yPercent:[-5,6,-3][i%3],ease:'none',scrollTrigger:{trigger:h,start:'top top',end:'bottom top',scrub:true}});});}
        if(bg)gsap.to(h.querySelectorAll('.hs picture'),{yPercent:10,scale:1.06,ease:'none',scrollTrigger:{trigger:h,start:'top top',end:'bottom top',scrub:true}});
        
      });

      /* HERO ficha */
      q('.fh').forEach(function(h){
        var tl=gsap.timeline({defaults:{ease:EASE}});
        var bg=h.querySelector('.fh-ph img');
        if(bg)tl.from(bg,{scale:1.2,duration:2,ease:'power3.out'},0);
        var d=h.querySelector('[data-split]'),w=d&&words(d);
        if(w)tl.from(w,{yPercent:115,duration:1.2,stagger:.07},.15);
        tl.from(h.querySelectorAll('.crumbs, .fh-rt, h1 .eyebrow, .lead, .fh-price, .cta .btn'),{y:24,autoAlpha:0,duration:.9,stagger:.06},.4);
        var pl=h.querySelector('.fh-rt .pl');
        if(pl)tl.from(pl,{x:-40,autoAlpha:0,duration:1.2},.7);
        if(bg)gsap.to(h.querySelector('.fh-ph'),{yPercent:14,ease:'none',scrollTrigger:{trigger:h,start:'top top',end:'bottom top',scrub:true}});
      });
      q('.kf dl > div').length&&gsap.from(q('.kf dl > div'),{y:18,autoAlpha:0,duration:.8,stagger:.05,ease:EASE,delay:.6});

      /* encabezado de páginas internas */
      q('.ph-hd').forEach(function(h){
        var d=h.querySelector('[data-split]'),w=d&&words(d);
        var tl=gsap.timeline({defaults:{ease:EASE}});
        if(w)tl.from(w,{yPercent:115,duration:1.2,stagger:.08},.1);
        tl.from(h.querySelectorAll('.crumbs, h1 .eyebrow, .lead'),{y:20,autoAlpha:0,duration:.9,stagger:.07},.3);
        var big=h.querySelector('.ph-big');
        if(big){tl.from(big,{xPercent:12,autoAlpha:0,duration:1.8},0);
          gsap.to(big,{xPercent:-10,ease:'none',scrollTrigger:{trigger:h,start:'top top',end:'bottom top',scrub:true}});}
      });

      /* títulos de sección */
      q('h2.t').forEach(function(t){
        if(t.closest('.hero,.fh,.ph-hd'))return;
        var w=words(t);if(!w)return;
        gsap.from(w,{yPercent:110,duration:1.1,stagger:.06,ease:EASE,scrollTrigger:{trigger:t,start:'top 88%',once:true}});
      });

      /* sellos: caen y se "estampan" */
      var st=q('.stamp');
      if(st.length){
        gsap.set(st,{autoAlpha:0,scale:1.7});
        ScrollTrigger.batch(st,{start:'top 88%',once:true,onEnter:function(b){
          gsap.to(b,{autoAlpha:1,scale:1,duration:.55,ease:'back.out(2.2)',stagger:.16});
        }});
      }
      q('.stamps-lede').forEach(function(l){gsap.from(l,{y:30,autoAlpha:0,duration:1,ease:EASE,scrollTrigger:{trigger:l,start:'top 88%',once:true}});});

      /* tarjetas de embarque */
      var tcs=q('.tc');
      if(tcs.length){
        gsap.set(tcs,{y:70,rotate:1.5,autoAlpha:0});
        ScrollTrigger.batch(tcs,{start:'top 92%',once:true,onEnter:function(b){
          gsap.to(b,{y:0,rotate:0,autoAlpha:1,duration:1.1,ease:EASE,stagger:.1,clearProps:'transform'});
        }});
      }

      /* galería horizontal fijada (escritorio) */
      mm.add('(min-width:900px)',function(){
        q('.hz').forEach(function(sec){
          var tr=sec.querySelector('.hz-track');if(!tr)return;
          tr.classList.add('pinned');
          var dist=function(){return Math.max(0,tr.scrollWidth-window.innerWidth+parseFloat(getComputedStyle(tr).paddingLeft));};
          var tw=gsap.to(tr,{x:function(){return -dist();},ease:'none',scrollTrigger:{trigger:sec,start:'top top',end:function(){return '+='+dist();},pin:true,scrub:.8,invalidateOnRefresh:true,anticipatePin:1}});
          tr.querySelectorAll('.hz-f img').forEach(function(img){
            gsap.fromTo(img,{scale:1.25,xPercent:-6},{scale:1.05,xPercent:6,ease:'none',scrollTrigger:{trigger:img.closest('.hz-f'),containerAnimation:tw,start:'left right',end:'right left',scrub:true}});
          });
          return function(){tr.classList.remove('pinned');};
        });
      });
      mm.add('(max-width:899px)',function(){
        q('.hz-f').forEach(function(f){gsap.from(f,{y:40,autoAlpha:0,duration:.9,ease:EASE,scrollTrigger:{trigger:f,start:'top 95%',once:true}});});
      });

      /* ruta de vuelo en "cómo funciona" */
      q('.fp').forEach(function(svg){
        var line=svg.querySelector('.fp-line'),pl=svg.querySelector('.fp-pl');if(!line)return;
        var len=line.getTotalLength();
        gsap.set(line,{strokeDasharray:len,strokeDashoffset:len});
        var tl=gsap.timeline({scrollTrigger:{trigger:svg.parentNode,start:'top 70%',end:'bottom 75%',scrub:.8}});
        tl.to(line,{strokeDashoffset:0,ease:'none'},0);
        if(pl&&window.MotionPathPlugin)tl.to(pl,{motionPath:{path:line,align:line,alignOrigin:[.5,.5],autoRotate:true},ease:'none'},0);
      });
      q('.steps li').length&&ScrollTrigger.batch(q('.steps li'),{start:'top 90%',once:true,onEnter:function(b){gsap.from(b,{y:40,autoAlpha:0,duration:1,stagger:.12,ease:EASE});}});

      /* foto de viajar solo: se abre como una ventanilla */
      q('.solo-ph').forEach(function(p){
        var img=p.querySelector('img');
        var tl=gsap.timeline({scrollTrigger:{trigger:p,start:'top 85%',end:'center 55%',scrub:.6}});
        tl.fromTo(p,{clipPath:'inset(14% 18% 14% 18% round 120px)'},{clipPath:'inset(0% 0% 0% 0% round 16px)',ease:'none'},0);
        if(img)tl.fromTo(img,{scale:1.35},{scale:1,ease:'none'},0);
      });

      /* postales: llegan volando */
      q('.rv').forEach(function(rv){
        var cards=[].slice.call(rv.querySelectorAll('.rc'));if(!cards.length)return;
        gsap.set(cards,{autoAlpha:0});
        ScrollTrigger.create({trigger:rv,start:'top 88%',once:true,onEnter:function(){
          rv.style.overflow='visible';
          var sec=rv.closest('section')||rv.parentNode;
          var pl=document.createElement('span');pl.className='fly-pl';pl.setAttribute('aria-hidden','true');
          pl.innerHTML='<svg viewBox="0 0 24 24"><path fill="currentColor" d="M2 11.5 21.5 3l-6.3 18-4.2-7.2L2 11.5zm9.4 1.8 2.8 4.8 3.9-11.3-6.7 6.5z"/></svg>';
          sec.style.position=sec.style.position||'relative';sec.style.overflowX='clip';sec.appendChild(pl);
          var W=sec.clientWidth;
          gsap.fromTo(pl,{x:-60,y:rv.offsetTop-40,rotation:10,autoAlpha:1},{x:W+80,y:rv.offsetTop-160,rotation:-8,duration:1.6,ease:'power1.inOut',onComplete:function(){pl.remove();}});
          var done=0;
          var vis=cards.filter(function(c){return c.offsetLeft<rv.clientWidth-40;});
          cards.forEach(function(c){if(vis.indexOf(c)<0){gsap.set(c,{autoAlpha:1});}});
          if(!vis.length){rv.style.overflow='';}
          cards=vis;
          cards.forEach(function(c,i){
            var X=Math.min(W,900)*(0.55+i*0.12),Y=-(160+i*40),R=24+i*9;
            gsap.fromTo(c,{x:X,y:Y,rotation:R,scale:.55,autoAlpha:0},{keyframes:[
              {x:X*0.4,y:Y*1.35,rotation:-12,scale:.9,autoAlpha:1,duration:.6,ease:'power1.out'},
              {x:0,y:0,rotation:0,scale:1,duration:.85,ease:'back.out(1.7)'}],
              delay:.25+i*.16,onComplete:function(){gsap.set(c,{clearProps:'transform'});if(++done===cards.length)rv.style.overflow='';}});
          });
        }});
      });

      /* ficha: recorrido que se dibuja, día a día, fotos */
      q('.route').forEach(function(r){ScrollTrigger.create({trigger:r,start:'top 85%',once:true,onEnter:function(){r.classList.add('drawn');}});});
      q('.days li').length&&ScrollTrigger.batch(q('.days li'),{start:'top 94%',once:true,onEnter:function(b){gsap.from(b,{x:-24,autoAlpha:0,duration:.7,stagger:.05,ease:EASE});}});
      q('.gal figure').forEach(function(f){
        gsap.fromTo(f,{clipPath:'inset(18% 0% 0% 0%)'},{clipPath:'inset(0% 0% 0% 0%)',duration:1.1,ease:EASE,scrollTrigger:{trigger:f,start:'top 92%',once:true}});
        var i=f.querySelector('img');if(i)gsap.from(i,{scale:1.2,duration:1.4,ease:EASE,scrollTrigger:{trigger:f,start:'top 92%',once:true}});
      });

      /* tablero de salidas: letras que giran */
      var rows=q('.board tbody tr');
      if(rows.length){
        ScrollTrigger.create({trigger:rows[0].closest('table'),start:'top 85%',once:true,onEnter:function(){
          rows.forEach(function(r,i){
            r.querySelectorAll('.b-m, .b-d a, .b-r, .b-s').forEach(function(c){
              var txt=c.textContent;
              if(window.ScrambleTextPlugin)gsap.to(c,{duration:1.1,delay:i*.09,scrambleText:{text:txt,chars:'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ0123456789',speed:.9,revealDelay:.25}});
            });
          });
        }});
        if(fine){
          var fl=document.querySelector('.b-float');
          if(!fl){fl=document.createElement('img');fl.className='b-float';fl.alt='';document.body.appendChild(fl);}
          var xTo=gsap.quickTo(fl,'x',{duration:.5,ease:'power3'}),yTo=gsap.quickTo(fl,'y',{duration:.5,ease:'power3'});
          rows.forEach(function(r){
            var bi=r.querySelector('.bi');if(!bi)return;
            r.addEventListener('mouseenter',function(){fl.src=bi.currentSrc||bi.src;gsap.to(fl,{autoAlpha:1,scale:1,duration:.35,ease:'power3'});});
            r.addEventListener('mouseleave',function(){gsap.to(fl,{autoAlpha:0,scale:.6,duration:.3});});
            r.addEventListener('mousemove',function(e){xTo(e.clientX+24);yTo(e.clientY-80);});
          });
        }
      }

      /* aviso, preguntas */
      q('.aviso').forEach(function(a){gsap.from(a,{y:60,autoAlpha:0,duration:1.1,ease:EASE,scrollTrigger:{trigger:a,start:'top 90%',once:true}});});
      q('.faq details').length&&ScrollTrigger.batch(q('.faq details'),{start:'top 95%',once:true,onEnter:function(b){gsap.from(b,{y:20,autoAlpha:0,duration:.7,stagger:.05,ease:EASE});}});

      /* botones magnéticos */
      if(fine){
        q('.btn-mg, .hero .btn-ol, .rv-nav button').forEach(function(b){
          b.classList.add('mag');
          var xTo=gsap.quickTo(b,'x',{duration:.5,ease:'elastic.out(1,.4)'}),yTo=gsap.quickTo(b,'y',{duration:.5,ease:'elastic.out(1,.4)'});
          b.addEventListener('mousemove',function(e){var r=b.getBoundingClientRect();xTo((e.clientX-r.left-r.width/2)*.28);yTo((e.clientY-r.top-r.height/2)*.4);});
          b.addEventListener('mouseleave',function(){xTo(0);yTo(0);});
        });
      }
    },scope);
    ScrollTrigger.refresh();
  }

  function visible(){return document.querySelector('.pgr:not([hidden])')||document.body;}
  function start(){init(visible());}
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(start);else start();
  /* vista previa con router por hash */
  window.addEventListener('hashchange',function(){
    var h=location.hash;if(h&&h.indexOf('/')!==0)return;
    setTimeout(function(){if(lenis)lenis.scrollTo(0,{immediate:true,force:true});init(visible());},30);
  });
  window.addEventListener('load',function(){ScrollTrigger.refresh();});
})();

}catch(e){if(window.console)console.error('[egv]',e);}
try{

(function(){var f=document.querySelector('[data-smfly]');if(!f)return;var t=f.querySelector('.sm-t');
if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)return;
var orig=[].slice.call(t.children),n=orig.length;
orig.forEach(function(o,i){var c=o.cloneNode(true);c.removeAttribute('data-lb');c.setAttribute('aria-hidden','true');c.removeAttribute('tabindex');c.removeAttribute('role');c.removeAttribute('aria-label');var ci=c.querySelector('img'),oi=o.querySelector('img');if(oi&&oi.src)ci.src=oi.src;c.addEventListener('click',function(){o.click();});t.appendChild(c);});
t.style.setProperty('--fd',(n*6)+'s');f.classList.add('on');
f.addEventListener('touchstart',function(){f.classList.add('hold');},{passive:true});
f.addEventListener('touchend',function(){setTimeout(function(){f.classList.remove('hold');},1500);},{passive:true});
})();

}catch(e){if(window.console)console.error('[egv]',e);}
try{

(function(){var io=null;
 function upd(){var pg=document.querySelector('.pgr:not([hidden])');document.querySelectorAll('.dock.on').forEach(function(d){d.classList.remove('on');});document.body.classList.remove('has-dock');
  if(io){io.disconnect();io=null;}if(!pg)return;var d=pg.querySelector('.dock'),fh=pg.querySelector('.fh');if(!d)return;document.body.classList.add('has-dock');
  if(fh&&'IntersectionObserver'in window){io=new IntersectionObserver(function(e){d.classList.toggle('on',!e[0].isIntersecting);});io.observe(fh);}else d.classList.add('on');}
 window.addEventListener('hashchange',function(){setTimeout(upd,80);});setTimeout(upd,300);
})();

}catch(e){if(window.console)console.error('[egv]',e);}
try{

(function(){var T=function(e,p){if(window.egvTrack)window.egvTrack(e,p);};
 function route(){var r=location.pathname;T('page_view',{ruta:r});
  var m=r.match(/^\/viajes\/([a-z-]+)\/$/);if(m){var pg=document.querySelector('.pgr:not([hidden]) h1 .display');T('view_ficha',{viaje:pg?pg.textContent:m[1]});}
  if(r.indexOf('/reservar/')===0){var o=document.getElementById('r-v');T('begin_reserva',{viaje:o&&o.selectedOptions[0]?o.selectedOptions[0].textContent.split(' · ')[0]:''});}}
 setTimeout(route,400);
 document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href*="wa.me"]');if(!a)return;var pg=document.querySelector('.pgr:not([hidden]) h1 .display');T('click_whatsapp',{viaje:pg?pg.textContent:'general'});},true);
 var res=document.getElementById('res');if(res)res.addEventListener('submit',function(){var o=document.getElementById('r-v');T('pago_sena',{viaje:o&&o.selectedOptions[0]?o.selectedOptions[0].textContent.split(' · ')[0]:'',value:400});},true);
})();

}catch(e){if(window.console)console.error('[egv]',e);}
try{
/* v9.6 animaciones sutiles */
(function(){
 var rm=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
 if(rm||!('IntersectionObserver' in window))return;
 function roll(el){var fin=el.textContent,t=0,n=12;var iv=setInterval(function(){t++;if(t>=n){clearInterval(iv);el.textContent=fin;return;}el.textContent=fin.replace(/[0-9]/g,function(){return Math.floor(Math.random()*10);});},55);}
 document.querySelectorAll('.tc-dl dd').forEach(function(dd){var tn=dd.firstChild;if(!tn||tn.nodeType!==3||tn.nodeValue.indexOf('USD')!==0)return;var s=document.createElement('span');s.className='pr';s.textContent=tn.nodeValue;dd.replaceChild(s,tn);});
 var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var el=e.target;io.unobserve(el);
   if(el.classList.contains('tc')){el.classList.remove('pre');el.classList.add('go');var p=el.querySelector('.pr');if(p)roll(p);}
   else if(el.classList.contains('rc')){el.classList.remove('pre');el.classList.add('go');}});},{threshold:.45});
 document.querySelectorAll('.tc').forEach(function(c){if(c.querySelector('.tc-ln .pl')){c.classList.add('pre');io.observe(c);}});
 document.querySelectorAll('.rc').forEach(function(c){if(c.querySelector('.rc-st')){c.classList.add('pre');io.observe(c);}});
})();

}catch(e){if(window.console)console.error('[egv]',e);}
try{

(function(){
  var WA='59899244227';
  var kb={gen:{},trips:{}},kbL=0;function loadKb(){if(kbL)return;kbL=1;try{fetch('/assets/egv-kb.json').then(function(r){return r.json();}).then(function(j){kb=j;}).catch(function(){});}catch(e){}}['pointerdown','focusin'].forEach(function(ev){document.addEventListener(ev,function(e){if(e.target.closest&&e.target.closest('#cwFab,#cwPanel'))loadKb();},true);});setTimeout(loadKb,8000);
  var fab=document.getElementById('cwFab'),panel=document.getElementById('cwPanel'),ms=document.getElementById('cwMs'),chips=document.getElementById('cwChips'),form=document.getElementById('cwForm'),txt=document.getElementById('cwTxt'),send=document.getElementById('cwSend');
  var turns=[],asked=0,sampleFn=undefined,leadShown=false,busy=false,ctl=null;
  var RULES="Sos \"El Viajecito\", el asistente de El Gran Viajecito (elgranviajecito.com), una agencia uruguaya de viajes de aventura en grupo (8 a 15 viajeros de 21 a 60 años, con guía que viaja con el grupo). Respondés en español rioplatense (vos, tenés, podés), cálido, directo y breve: 2 a 5 frases, sin listas largas, sin markdown ni asteriscos. Usás SOLO la información de abajo. Si algo no está ahí (habitación individual, vuelos, vacunas, cambios de fecha, descuentos, grupos privados, pagos puntuales), no lo inventás: decís que eso lo ve con la persona uno de nuestros viajeros expertos (el equipo que arma y acompaña los viajes) y seguís. Nunca nombres a Santi ni a ninguna persona en particular. Los precios son siempre en dólares (USD), por persona, sin el vuelo internacional. Nunca prometas cupos, descuentos ni confirmaciones. Si preguntan por qué viaje les conviene, preguntá qué les gusta (playa, cultura, safari, trekking) y recomendá 1 o 2 del calendario. Si la persona muestra ganas de reservar, pide algo que no sabés, o ya preguntó dos o tres cosas, cerrá con una frase corta invitando a dejar nombre y WhatsApp para que uno de nuestros viajeros expertos le siga la consulta; no insistas en cada mensaje. Si te preguntan por otras agencias o algo ajeno a los viajes, volvé amablemente al tema.";
  function kbText(route){
    var out=[];
    var t=kb.trips||{},g=kb.gen||{};
    var cur=route&&t[route]?route:null;
    if(cur)out.push("VIAJE QUE ESTÁ MIRANDO AHORA:\n"+t[cur]);
    out.push("CÓMO VIAJAMOS:\n"+(g.como_viajamos||''));
    out.push("VIAJAR SOLO/A:\n"+(g.viajar_solo||''));
    out.push("RESERVAS, PAGOS Y CANCELACIÓN:\n"+(g.como_funciona||''));
    out.push("NOSOTROS:\n"+(g.nosotros||''));
    out.push("PREGUNTAS FRECUENTES:\n"+(g.faq_home||''));
    var cal=[];Object.keys(t).forEach(function(k){if(k!==cur)cal.push(t[k]);});
    out.push("CALENDARIO 2027 (los demás viajes):\n"+cal.join('\n\n'));
    return out.join('\n\n');
  }
  function route(){return location.pathname||'/';}
  function tripName(){var r=route(),t=(kb.trips||{})[r];if(!t)return '';var m=t.match(/^### Viaje en grupo a ([^\n·]+?)\s*\d{4}/);return m?m[1].trim():'';}
  function add(cls,text){var d=document.createElement('div');d.className='cw-m '+cls;d.textContent=text;ms.appendChild(d);ms.scrollTop=ms.scrollHeight;return d;}
  function linkify(el){var s=el.textContent;el.innerHTML=s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/(https?:\/\/[^\s)]+)/g,'<a href="$1" target="_blank" rel="noopener">$1</a>');}
  function setChips(list){chips.innerHTML='';list.forEach(function(q){var b=document.createElement('button');b.type='button';b.textContent=q;b.onclick=function(){ask(q);};chips.appendChild(b);});}
  function greet(){
    if(ms.children.length)return;
    var tn=tripName();
    add('a',tn?('¡Hola! Soy el asistente de El Gran Viajecito. Estás mirando '+tn+'. Preguntame lo que quieras del viaje: fechas, qué incluye, cómo es el grupo o cómo se reserva.'):'¡Hola! Soy el asistente de El Gran Viajecito. Preguntame sobre los viajes 2027, cómo son los grupos, qué incluye el precio o cómo se reserva.');
    setChips(tn?['¿Qué incluye el precio?','¿Cómo es el grupo?','¿Puedo ir solo/a?','¿Cómo reservo?']:['¿Cómo son los grupos?','¿Qué viaje me conviene?','¿Puedo viajar solo/a?','¿Cómo se paga?']);
  }
  function open(){document.body.classList.add('cw-open');panel.setAttribute('aria-hidden','false');panel.inert=false;greet();setTimeout(function(){txt.focus();},350);try{if(window.egvTrack)egvTrack('chat_open',{viaje:tripName()||undefined});}catch(e){}}
  function close(){document.body.classList.remove('cw-open');panel.setAttribute('aria-hidden','true');panel.inert=true;fab.focus();}
  fab.addEventListener('click',open);panel.querySelector('.x').addEventListener('click',close);
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&document.body.classList.contains('cw-open'))close();});
  txt.addEventListener('input',function(){txt.style.height='auto';txt.style.height=Math.min(txt.scrollHeight,120)+'px';});
  txt.addEventListener('keydown',function(e){if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();form.requestSubmit();}});
  form.addEventListener('submit',function(e){e.preventDefault();var q=txt.value.trim();if(q)ask(q);});
  // mobile dock awareness (the sticky reserve bar)
  new MutationObserver(function(){var on=!!document.querySelector('.pgr:not([hidden]) .dock.on');document.body.classList.toggle('dock-on',on);}).observe(document.body,{subtree:true,attributes:true,attributeFilter:['class','hidden']});

  async function getSample(){
    if(sampleFn!==undefined)return sampleFn;
    sampleFn=null;
    try{if(window.claude&&claude.use){sampleFn=await claude.use('sample');}}catch(e){sampleFn=null;}
    return sampleFn;
  }
  var SID=(function(){try{var k='egv_sid',v=sessionStorage.getItem(k);if(!v){v='w-'+Date.now().toString(36)+Math.random().toString(36).slice(2,8);sessionStorage.setItem(k,v);}return v;}catch(e){return 'w-'+Date.now().toString(36)+Math.random().toString(36).slice(2,8);}})();
  async function askApi(messages){ // producción: El Viajecito en Vercel (reglas e info las pone el servidor)
    var r=await fetch(window.EGV_CHAT_API,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({sid:SID,route:location.pathname,page:location.href,messages:messages})});
    if(r.status===429)throw {code:'rate_limited'};
    if(!r.ok)throw {code:'upstream_error'};
    var j=await r.json();return {text:j.text||''};
  }
  async function ask(q){
    if(busy)return;busy=true;send.disabled=true;chips.innerHTML='';
    txt.value='';txt.style.height='auto';
    add('u',q);turns.push({role:'user',content:q});asked++;
    var bub=add('a think','Pensando…');
    var input=[{role:'user',content:RULES+"\n\nINFORMACIÓN DE LA WEB (fuente única):\n"+kbText(route())+"\n\nFin de la información. A partir de acá viene la conversación con el visitante."}].concat(turns.slice(-12));
    try{
      var fn=await getSample();var res;
      if(fn){ctl=new AbortController();res=await fn(input,{modelTier:'quick',cache:false,signal:ctl.signal,onText:function(u){bub.classList.remove('think');bub.textContent=u.text;ms.scrollTop=ms.scrollHeight;}});}
      else if(window.EGV_CHAT_API){res=await askApi(turns.slice(-24));}
      else{throw {code:'not_granted'};}
      bub.classList.remove('think');bub.textContent=res.text;linkify(bub);
      turns.push({role:'assistant',content:res.text});
      try{if(window.egvTrack)egvTrack('chat_answer',{viaje:tripName()||undefined});}catch(e){}
      if(asked>=3||/reserv|señ|cupo|quiero ir|me anoto|anotarme|inscrib/i.test(q))showLead();
    }catch(e){
      var code=(e&&e.code)||'upstream_error';
      bub.classList.remove('think');
      if(code==='cancelled'){bub.textContent=e.text||'';}
      else if(code==='not_granted'||code==='sampling_disabled'||code==='not_declared'||code==='capability_disabled'){bub.textContent='Por acá no puedo responder ahora, pero uno de nuestros viajeros expertos sí: dejame tu nombre y WhatsApp y te escribe.';showLead(true);}
      else if(code==='rate_limited'){bub.textContent='Uy, me llegaron muchas preguntas juntas. Probá de nuevo en un ratito o dejame tus datos y te sigue uno de nuestros viajeros expertos por WhatsApp.';showLead(true);}
      else{bub.textContent=(e&&e.text)||'Se me cortó la respuesta. Probá de nuevo, o dejame tus datos y te sigue uno de nuestros viajeros expertos por WhatsApp.';showLead(true);}
    }
    busy=false;send.disabled=false;ms.scrollTop=ms.scrollHeight;
  }
  function summary(){
    var qs=turns.filter(function(t){return t.role==='user';}).map(function(t){return t.content;}).slice(0,4).join(' / ');
    return qs.length>260?qs.slice(0,257)+'…':qs;
  }
  function showLead(force){
    if(leadShown&&!force)return;if(leadShown)return;leadShown=true;
    var d=document.createElement('div');d.className='cw-lead';
    d.innerHTML='<p>¿Querés que uno de nuestros viajeros expertos te siga la consulta por WhatsApp? Dejá tus datos y te escribe.</p><div class="row"><input name="nombre" placeholder="Tu nombre" autocomplete="given-name" required><input name="wa" type="tel" inputmode="tel" placeholder="Tu WhatsApp (+54 9…)" autocomplete="tel" required></div><button type="button" class="btn btn-mg">Seguir por WhatsApp</button><span class="ok" hidden>Listo. Se abre WhatsApp con tu consulta armada.</span>';
    ms.appendChild(d);ms.scrollTop=ms.scrollHeight;
    var b=d.querySelector('button'),nom=d.querySelector('[name=nombre]'),wa=d.querySelector('[name=wa]');
    b.addEventListener('click',function(){
      var n=nom.value.trim(),w=wa.value.trim();
      if(!n){nom.focus();return;}if(!w){wa.focus();return;}
      var tn=tripName();
      var msg='Hola! Soy '+n+'. Estuve chateando en la web'+(tn?' sobre '+tn:'')+'. Pregunté: '+summary()+'. Mi WhatsApp: '+w+' (chat web)';
      try{fetch('https://formsubmit.co/ajax/contacto@elgranviajecito.com',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify({_subject:'Lead chat web: '+(tn||'general')+' · '+n,_template:'table',_captcha:'false',Nombre:n,WhatsApp:w,Viaje:tn||'-',Preguntas:summary(),Conversacion:turns.map(function(t){return (t.role==='user'?'Visitante: ':'Asistente: ')+t.content;}).join('\n'),Pagina:location.href})}).catch(function(){});}catch(e){}
      window.egvAviso('chat',{Nombre:n,WhatsApp:w,Viaje:tn||'-',Preguntas:summary(),Pagina:location.pathname});
      try{if(window.EGV_CHAT_API)fetch(window.EGV_CHAT_API.replace(/\/chat$/,'/lead'),{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({sid:SID,nombre:n,wa:w,viaje:tn||'',page:location.href,turns:turns.slice(-24)})}).catch(function(){});}catch(e){}
      try{if(window.egvTrack)egvTrack('lead_chat',{viaje:tn||undefined});}catch(e){}
      d.querySelector('.ok').hidden=false;b.textContent='Abrir WhatsApp';
      window.open('https://wa.me/'+WA+'?text='+encodeURIComponent(msg),'_blank','noopener');
    });
  }
})();

}catch(e){if(window.console)console.error('[egv]',e);}
try{
/* v9.8: guías visuales */
(function(){var d=document.documentElement;d.classList.add('gx-js');
 var rv=document.querySelectorAll('.rv');
 if('IntersectionObserver'in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{rootMargin:'0px 0px -8% 0px',threshold:.12});rv.forEach(function(x){io.observe(x);});
  var vo=new IntersectionObserver(function(es){es.forEach(function(e){var v=e.target.querySelector('video');if(!v)return;if(e.isIntersecting){v.preload='auto';var p=v.play();if(p&&p.catch)p.catch(function(){});}else v.pause();});},{threshold:.4});
  document.querySelectorAll('.gx-rv').forEach(function(x){vo.observe(x);});
 }else rv.forEach(function(x){x.classList.add('in');});
 document.querySelectorAll('.gx-rv').forEach(function(b){function op(){if(window.egvOpenReel)window.egvOpenReel(b.dataset.src,b.dataset.poster,b.dataset.t,b);}b.addEventListener('click',op);b.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();op();}});});
 document.querySelectorAll('.gx-strip').forEach(function(st){st.addEventListener('touchstart',function(){st.classList.add('hold');},{passive:true});st.addEventListener('touchend',function(){setTimeout(function(){st.classList.remove('hold');},1200);},{passive:true});});
 /* las secciones ocultas (rutas #/) se revelan al mostrarse */
 window.addEventListener('hashchange',function(){setTimeout(function(){document.querySelectorAll('.pgr:not([hidden]) .rv').forEach(function(x){var r=x.getBoundingClientRect();if(r.top<innerHeight)x.classList.add('in');});},120);});
})();
}catch(e){if(window.console)console.error('[egv]',e);}
/* 31/10 iOS: el poster se pinta de fondo (cover) para que no aparezcan bandas negras mientras carga el video */
(function(){document.querySelectorAll('.rl-i,.fh-v').forEach(function(w){var v=w.querySelector('video'),p=(v&&v.getAttribute('poster'))||w.dataset.poster;if(p)w.style.backgroundImage='url("'+p+'")';});})();

/* 1/11/2026 preventa: hasta el 30/11 23:59 UY los reels completos de las fichas muestran la versión con la placa "Reservá antes del 30/11". Después vuelven solos a los de siempre. */
(function(){
  if(document.documentElement.classList.contains('egvpv-fin'))return;
  var M={reel_bali2:1,reel_egipto:1,reel_filipinas:1,reel_india3:1,reel_indonesia:1,reel_japon:1,reel_peru2:1,reel_sri2:'reel_sri',reel_sri3:1,reel_tailandia3:1,reel_tanzania2:'reel_tanzania',reel_testimonios2:1};
  document.querySelectorAll('[data-src]').forEach(function(el){
    var m=/\/video\/(reel_[a-z0-9]+)\.mp4/.exec(el.getAttribute('data-src')||'');
    if(!m||!M[m[1]])return;
    var base=M[m[1]]===1?m[1]:M[m[1]];
    el.setAttribute('data-src','/video/'+base+'_preventa.mp4');
  });
})();
