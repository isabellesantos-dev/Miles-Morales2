// Introdução cinematográfica
(function () {
  const intro = document.getElementById('intro');
  if (!intro) return;
  document.body.style.overflow = 'hidden';
  const closeIntro = () => {
    intro.classList.add('hide');
    document.body.style.overflow = '';
    try { startCounters(); } catch (e) {}
    setTimeout(() => intro.remove(), 900);
  };
  // Fecha após a animação (≈3.8s)
  const timer = setTimeout(closeIntro, 3900);
  const skipBtn = document.getElementById('introSkip');
  if (skipBtn) skipBtn.addEventListener('click', () => { clearTimeout(timer); closeIntro(); });
})();

// Loader
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('loader').classList.add('hide'), 1300);
});

// Cursor
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mx = 0, my = 0, fx = 0, fy = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
function animCursor() {
  cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
  fx += (mx - fx) * .18; fy += (my - fy) * .18;
  follower.style.left = fx + 'px'; follower.style.top = fy + 'px';
  requestAnimationFrame(animCursor);
}
animCursor();
document.querySelectorAll('a,button,.power-card,.quiz-option').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.classList.add('hover'); follower.classList.add('hover'); });
  el.addEventListener('mouseleave', () => { cursor.classList.remove('hover'); follower.classList.remove('hover'); });
});

// Nav
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 40));
document.getElementById('navToggle').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('open');
});

// Reveal
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Contadores animados (hero stats)
function animateStat(el) {
  if (el.dataset.animated) return;
  el.dataset.animated = '1';
  const target = +el.dataset.target;
  let cur = 0;
  const step = Math.max(1, Math.ceil(target / 60));
  const t = setInterval(() => {
    cur += step;
    if (cur >= target) { cur = target; clearInterval(t); }
    el.textContent = cur + (target === 100 ? '%' : '');
  }, 30);
}
function startCounters() {
  document.querySelectorAll('.stat-num').forEach(animateStat);
}
const countObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { animateStat(e.target); countObserver.unobserve(e.target); } });
}, { threshold: 0 });
document.querySelectorAll('.stat-num').forEach(el => countObserver.observe(el));
// Garante animação mesmo se o observer não disparar (intro cobrindo a tela)
setTimeout(startCounters, 4200);

// Powers interactive
const powersData = {
  web: { icon: '', title: 'Teias e Agilidade', desc: 'Força sobre-humana, reflexos aracnídeos e teias sintéticas. O clássico do Aranha, na versão Miles — com estilo próprio.' },
  venom: { icon: '', title: 'Toque Venenoso', desc: 'Bioeletricidade que paralisa inimigos ao toque. Poder exclusivo de Miles, usado com precisão cirúrgica em combate.' },
  camo: { icon: '', title: 'Camuflagem', desc: 'Invisibilidade parcial. Miles desaparece quando precisa — furtividade total e controle total da situação.' },
  sense: { icon: '', title: 'Sentido Aranha', desc: 'Alerta instintivo de perigo. Miles sente ameaças antes de vê-las — um sexto sentido apurado.' }
};
const powerDisplay = document.getElementById('powerDisplay');
document.querySelectorAll('.power-card').forEach(card => {
  card.addEventListener('click', () => {
    const key = card.dataset.power;
    const d = powersData[key];
    document.querySelectorAll('.power-card').forEach(c => c.classList.remove('active'));
    card.classList.add('active');
    document.getElementById('powerIcon').textContent = d.icon;
    document.getElementById('powerTitle').textContent = d.title;
    document.getElementById('powerDesc').textContent = d.desc;
    powerDisplay.classList.add('active');
    powerDisplay.querySelector('.power-display-icon').style.transform = 'scale(1.2) rotate(10deg)';
    setTimeout(() => { powerDisplay.querySelector('.power-display-icon').style.transform = ''; }, 400);
  });
});

// Quiz
const questions = [
  {
    q: "Em que ano Miles Morales apareceu pela primeira vez nos quadrinhos?",
    opts: ["2008", "2011", "2015", "2018"],
    a: 1,
    exp: "Miles estreou em Ultimate Fallout #4, em 2011, criado por Brian Michael Bendis e Sara Pichelli."
  },
  {
    q: "Quais são as duas habilidades EXCLUSIVAS de Miles?",
    opts: ["Teia orgânica e sentido aranha", "Camuflagem e toque venenoso", "Voo e super força", "Invisibilidade total e laser"],
    a: 1,
    exp: "Miles pode se camuflar (ficar invisível) e usar o toque venenoso (bioeletricidade)."
  },
  {
    q: "Qual é a origem étnica de Miles Morales?",
    opts: ["Afro-americano apenas", "Latino apenas", "Afro-latino", "Asiático-americano"],
    a: 2,
    exp: "Miles é afro-latino: pai afro-americano (Jefferson Davis) e mãe porto-riquenha (Rio Morales)."
  },
  {
    q: "O que a frase 'qualquer um pode usar a máscara' representa?",
    opts: ["Que todos devem ser heróis", "Que representação importa e qualquer pessoa pode ser protagonista", "Que máscaras são baratas", "Que Peter Parker não é mais necessário"],
    a: 1,
    exp: "Representa que qualquer pessoa, independente de raça, pode ser herói e protagonista de sua história."
  },
  {
    q: "Em qual filme Miles ganhou fama mundial e venceu o Oscar?",
    opts: ["Homem-Aranha: De Volta ao Lar", "Homem-Aranha: No Aranhaverso", "Vingadores: Ultimato", "Pantera Negra"],
    a: 1,
    exp: "Homem-Aranha: No Aranhaverso (2018) venceu o Oscar de melhor animação."
  },
  {
    q: "Por que Miles NÃO é apenas 'um Peter Parker preto'?",
    opts: ["Porque é mais forte", "Porque tem identidade, família e cultura próprias", "Porque não usa teia", "Porque é mais velho"],
    a: 1,
    exp: "Miles tem voz, conflitos, família e cultura próprias — é autêntico, não uma cópia."
  }
];

let qi = 0, score = 0, answered = false;
const qEl = document.getElementById('quizQuestion');
const optsEl = document.getElementById('quizOptions');
const fbEl = document.getElementById('quizFeedback');
const barEl = document.getElementById('quizBar');
const counterEl = document.getElementById('quizCounter');
const nextBtn = document.getElementById('quizNext');
const resultBox = document.getElementById('quizResult');

function loadQuestion() {
  answered = false;
  fbEl.textContent = '';
  fbEl.className = 'quiz-feedback';
  nextBtn.classList.add('hidden');
  const q = questions[qi];
  qEl.textContent = q.q;
  optsEl.innerHTML = '';
  q.opts.forEach((o, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'quiz-option';
    btn.textContent = o;
    btn.addEventListener('click', () => answer(i));
    optsEl.appendChild(btn);
  });
  barEl.style.width = ((qi) / questions.length * 100) + '%';
  counterEl.textContent = (qi + 1) + ' / ' + questions.length;
}

function answer(i) {
  if (answered) return;
  answered = true;
  const q = questions[qi];
  const opts = optsEl.querySelectorAll('.quiz-option');
  opts.forEach(o => o.classList.add('disabled'));
  if (i === q.a) {
    opts[i].classList.add('correct');
    score++;
    fbEl.textContent = '✅ Correto! ' + q.exp;
    fbEl.className = 'quiz-feedback ok';
  } else {
    opts[i].classList.add('wrong');
    opts[q.a].classList.add('correct');
    fbEl.textContent = '❌ Ops! ' + q.exp;
    fbEl.className = 'quiz-feedback no';
  }
  nextBtn.classList.remove('hidden');
  nextBtn.textContent = qi === questions.length - 1 ? 'Ver resultado' : 'Próxima →';
}

nextBtn.addEventListener('click', () => {
  qi++;
  if (qi < questions.length) loadQuestion();
  else showResult();
});

function showResult() {
  document.getElementById('quizBox').classList.add('hidden');
  resultBox.classList.remove('hidden');
  const pct = Math.round(score / questions.length * 100);
  let badge, title, text;
  if (pct === 100) { badge = ''; title = 'INCRÍVEL!'; text = `Você acertou ${score}/${questions.length}. É um verdadeiro fã do Aranhaverso e da Consciência Negra!`; }
  else if (pct >= 60) { badge = ''; title = 'Muito bom!'; text = `Você acertou ${score}/${questions.length}. Conhece bem o Miles!`; }
  else { badge = ''; title = 'Continue explorando!'; text = `Você acertou ${score}/${questions.length}. Revise o site e tente de novo!`; }
  document.getElementById('resultBadge').textContent = badge;
  document.getElementById('resultTitle').textContent = title;
  document.getElementById('resultText').textContent = text;
  document.getElementById('resultScore').textContent = score + ' / ' + questions.length;
  barEl.style.width = '100%';
}

document.getElementById('quizRestart').addEventListener('click', () => {
  qi = 0; score = 0;
  resultBox.classList.add('hidden');
  document.getElementById('quizBox').classList.remove('hidden');
  loadQuestion();
});

loadQuestion();

// Parallax suave
const heroSfx = document.querySelectorAll('.hero-sfx');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  heroSfx.forEach((el, i) => {
    el.style.transform = `translateY(${y * (0.15 + i * 0.05)}px)`;
  });
});

console.log('%cMiles Morales — Consciência Negra', 'color:#e62429;font-size:16px;font-weight:bold;');
