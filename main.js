// Intersection Observer로 "보일 때"만 visible 붙이고, 한 번 붙으면 다시 안떨어짐!
document.addEventListener('DOMContentLoaded', () => {
  const animated = document.querySelectorAll('.fade-in, .pop-in, .slide-up, .skill-card, .shadow-pop');
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target); // 한 번 등장하면 더이상 감시안함!
        }
      });
    },
    { threshold: 0.07 }
  );
  animated.forEach(el => observer.observe(el));

  // 리더보드 jump 효과
  document.querySelectorAll('.lb-row').forEach(row => {
    row.addEventListener('click', () => {
      row.classList.remove('jump');
      setTimeout(()=>row.classList.add('jump'), 10);
    });
  });

  // 배경음악 토글
  const bgm = document.getElementById('bgm');
  const btn = document.getElementById('bgm-btn');
  let isPlaying = false;
  btn.addEventListener('click',()=>{
    if(isPlaying){ bgm.pause(); }
    else { bgm.play(); }
  });
  bgm.addEventListener('play',()=>{ isPlaying=true; btn.classList.add('playing'); });
  bgm.addEventListener('pause',()=>{ isPlaying=false; btn.classList.remove('playing'); });

  // 파티클 효과
  const canvas = document.getElementById('bg-particles');
  if(canvas){
    const ctx = canvas.getContext('2d');
    let w = window.innerWidth, h = window.innerHeight;
    canvas.width = w; canvas.height = h;
    window.addEventListener('resize',()=>{
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w; canvas.height = h;
    });
    // 파티클 배열 생성
    const particles = Array.from({length: 26},()=>({
      x: Math.random()*w,
      y: Math.random()*h,
      r: Math.random()*2+1.4,
      dx: (Math.random()-0.5)*0.5,
      dy: (Math.random()-0.5)*0.5,
      c: `rgba(${180+Math.round(Math.random()*60)},${180+Math.round(Math.random()*40)},255,0.14)`
    }));
    function animate(){
      ctx.clearRect(0,0,w,h);
      for(const p of particles){
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=p.c;
        ctx.fill();
        p.x+=p.dx; p.y+=p.dy;
        if(p.x<0||p.x>w)p.dx*=-1;
        if(p.y<0||p.y>h)p.dy*=-1;
      }
      requestAnimationFrame(animate);
    }
    animate();
  }
});

// 리더보드 점프 효과 스타일 (동적 삽입)
document.addEventListener('DOMContentLoaded', () => {
  const style = document.createElement('style');
  style.innerHTML = `
    .lb-row.jump { animation: jumpRank 0.5s; }
    @keyframes jumpRank {
      0% {transform: scale(1);}
      30% {transform: scale(1.07) translateY(-6px);}
      60% {transform: scale(0.96) translateY(3px);}
      100% {transform: scale(1);}
    }
  `;
  document.head.appendChild(style);
});