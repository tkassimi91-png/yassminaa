/* =====================================================
   ✏️ PERSONALIZA AQUÍ (solo toca esta parte)
   ===================================================== */

// Su nombre, en MAYÚSCULAS. Sale en la lluvia rosa: FELIZ CUMPLE + NOMBRE
const NAME = "Yassamine";

// Frase del final. Después se le añade su nombre automáticamente
const FINAL = "Kanbghik bzaf a ahbiba, w bghit nkon m3ak had nhar wakha ana machi 7dak hadi lhaja lwahida li 9dert ndir, Kanbgik a";

// Frases del libro. Cada frase sale con UNA PAREJA de fotos.
// 4 frases = 8 fotos. Puedes añadir o quitar líneas (separadas por comas).
const MESSAGES = [
  "Happy birthday, Yassamine",
  "hada awel birthay dyalk w ana f 7yatlk w li daz kan howa akhir wahed w ana makaynch",
  "kantmna lmra jaya n9der nkon 7dak bach nbosk bzaf dyal lbosat w n9olhalki hadchi face",
  "chokran 7it nti kayna f 7yati . Kanbghik"
];

// Fotos (están en la carpeta "fotos"). Van por orden:
// foto1 + foto2 con la frase 1, foto3 + foto4 con la frase 2, etc.
// Necesitas 2 fotos por cada frase. Si pones menos, se repiten.
const PHOTOS = [
  "foto1.jpg",
  "foto2.jpg",
  "foto3.jpg",
  "foto4.jpg",
  "foto5.jpg",
  "foto6.jpg",
  "foto7.jpg",
  "foto8.jpg"
];

// Palabras de la pantalla de lluvia rosa, una tras otra.
// Si quieres, cambia "FELIZ" y "CUMPLE" o añade más palabras.
const INTRO = ['3', '2', '1', 'Happy', 'birthday', NAME, '♥'];

/* =====================================================
   ⚠️ DE AQUÍ PARA ABAJO NO HACE FALTA TOCAR NADA
   ===================================================== */

const $ = id => document.getElementById(id);
const cv = $('bg'), cx = cv.getContext('2d');
let W, H, mode = 'rain', cols = [], stars = [];

// Ajusta el fondo al tamaño de la pantalla
function size(){
  W = cv.width = innerWidth;
  H = cv.height = innerHeight;
  cols = Array.from({length: Math.ceil(W / 16)}, () => Math.random() * H / 16);
  stars = Array.from({length: 120}, () => ({
    x: Math.random() * W, y: Math.random() * H,
    r: Math.random() * 1.4 + .3, p: Math.random() * 6
  }));
}
addEventListener('resize', size);
size();

// Dibuja la lluvia rosa (mode 'rain') o las estrellas (mode 'sky')
function draw(t){
  if (mode === 'rain'){
    cx.fillStyle = 'rgba(13,10,26,.14)';
    cx.fillRect(0, 0, W, H);
    cx.font = '15px monospace';
    cols.forEach((y, i) => {
      cx.fillStyle = Math.random() < .05 ? '#fff' : '#ff4fa3';
      cx.fillText(Math.random() < .12 ? '♥' : Math.round(Math.random()), i * 16, y * 16);
      cols[i] = y * 16 > H && Math.random() > .975 ? 0 : y + 1;
    });
  } else {
    cx.fillStyle = '#0d0a1a';
    cx.fillRect(0, 0, W, H);
    stars.forEach(s => {
      cx.globalAlpha = .4 + .6 * Math.abs(Math.sin(t / 900 + s.p));
      cx.fillStyle = '#ffe6f2';
      cx.beginPath(); cx.arc(s.x, s.y, s.r, 0, 7); cx.fill();
    });
    cx.globalAlpha = 1;
  }
  requestAnimationFrame(draw);
}
requestAnimationFrame(draw);

// Cambia de pantalla (0 a 4)
function go(n){
  document.querySelectorAll('.scene').forEach((s, i) => s.classList.toggle('on', i === n));
}

// Devuelve la foto número i (si no hay fotos, pone un corazón rosa de relleno)
function photo(i){
  if (PHOTOS.length) return PHOTOS[i % PHOTOS.length];
  const h = [330, 350, 290, 10, 310][i % 5];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="400"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl(${h},85%,70%)"/><stop offset="1" stop-color="hsl(${h + 40},80%,55%)"/></linearGradient></defs><rect width="300" height="400" fill="url(#g)"/><text x="150" y="215" font-size="84" text-anchor="middle">💖</text></svg>`;
  return 'data:image/svg+xml,' + encodeURIComponent(svg);
}

/* ---------- ESCENA 1: lluvia rosa + cuenta atrás ---------- */
$('start').onclick = () => {
  go(1);
  const w = $('word');
  INTRO.forEach((t, i) => setTimeout(() => {
    w.textContent = t;
    w.classList.remove('pop'); void w.offsetWidth; w.classList.add('pop');
  }, i * 1100));   // 1100 = milisegundos entre palabras
  setTimeout(() => { mode = 'sky'; go(2); }, INTRO.length * 1100 + 400);
};

/* ---------- ESCENA 3: libro ---------- */
let k = 0, busy = false;

// Escribe la frase letra a letra
function type(){
  const m = $('msg'), txt = MESSAGES[k]; let i = 0;
  m.textContent = '';
  const id = setInterval(() => {
    m.textContent = txt.slice(0, ++i);
    if (i >= txt.length) clearInterval(id);
  }, 45);   // 45 = velocidad de escritura
}

// Al tocar la tarta: prepara el libro cerrado
$('cake').onclick = () => {
  k = 0; busy = false; $('next').hidden = true;
  $('cover').classList.remove('open');
  $('s3').classList.remove('opened');
  $('pl').src = photo(0);
  $('pr').src = photo(1);
  go(3);
};

// Muestra el botón del corazón solo en la última página
const last = () => { if (k >= MESSAGES.length - 1) $('next').hidden = false; };

// Al tocar la tapa: se abre el libro
$('cover').onclick = () => {
  $('cover').classList.add('open');
  $('s3').classList.add('opened');
  type(); last();
};

// Al tocar el libro: pasa de página
document.querySelector('.book').onclick = e => {
  if (e.target.closest('.cover') || busy || k + 1 >= MESSAGES.length) return;
  busy = true;
  const lf = $('leaf');
  $('lf').src = $('pr').src;            // la hoja que gira lleva la foto derecha actual
  lf.classList.remove('turn'); lf.style.display = 'block'; void lf.offsetWidth;
  k++;
  $('pr').src = photo(2 * k + 1);       // debajo aparece la siguiente foto derecha
  lf.classList.add('turn');
  setTimeout(() => { $('pl').src = photo(2 * k); type(); }, 450);
  setTimeout(() => { lf.style.display = 'none'; lf.classList.remove('turn'); busy = false; last(); }, 950);
};

// Botón final: pasa al corazón
$('next').onclick = () => { buildHeart(); go(4); };

/* ---------- ESCENA 4: corazón de fotos ---------- */
function buildHeart(){
  const h = $('heart'); h.innerHTML = '';
  $('final').textContent = FINAL + ' ' + NAME.toLowerCase().replace(/^./, c => c.toUpperCase()) + ' 💖';
  const N = 26;   // cantidad de fotos pequeñas que forman el corazón
  for (let i = 0; i < N; i++){
    const t = i / N * Math.PI * 2;
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    const im = new Image(); im.src = photo(i); im.alt = '';
    im.style.left = (50 + x * 2.6 - 7.5) + '%';
    im.style.top  = (46 + y * 2.6 - 7.5) + '%';
    im.style.setProperty('--r', (Math.random() * 16 - 8) + 'deg');
    im.style.transitionDelay = (i * 0.12) + 's';
    h.appendChild(im);
  }
  setTimeout(() => h.classList.add('show'), 300);
}