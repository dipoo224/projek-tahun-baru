let index = 0;

/* FOTO & CAPTION */
const foto = [
  "foto/1.jpg",
  "foto/2.jpg",
  "foto/3.jpg"
];

const caption = [
  "Nggak cuma tempatnya yang indah, tapi karena kamu ada di sini ❤️",
  "Foto ini, kenangan itu, dan kamu yang nggak tergantikan.💕",
  "Tempatnya beda-beda, orangnya tetap kamu🤍"
];

/* TEKS PENUTUP */
const endingText =
`Terima kasih sudah hadir di hidup aku.
Aku nggak janji semuanya selalu mudah,
tapi aku janji mau jalanin semuanya bareng kamu.
aku mau bilang makasi, makasi telah hadir dihidupku
banyak hal yang uda kita lewatkan
mulai dari seneng, sedih, ribut dan semoga tahun ini
kita bisa lebih baik lagi yaa sayangg 
selamat tahun baru yaa sayang ❤️`;

let char = 0;

/* TYPE EFFECT */
function typeEffect() {
  if (char < endingText.length) {
    document.getElementById("typeText").innerHTML +=
      endingText[char] === "\n" ? "<br>" : endingText[char];
    char++;
    setTimeout(typeEffect, 60);
  }
}

/* TAMPILKAN FOTO / ENDING */
function show() {
  const img = document.getElementById("slide");

  if (index === foto.length) {
    img.style.display = "none";
    document.getElementById("caption").style.display = "none";
    document.getElementById("ending").style.display = "block";
    document.getElementById("typeText").innerHTML = "";
    char = 0;
    typeEffect();
    return;
  }

  document.getElementById("ending").style.display = "none";
  img.style.display = "block";
  document.getElementById("caption").style.display = "block";

  img.style.opacity = 0;
  setTimeout(() => {
    img.src = foto[index];
    document.getElementById("caption").innerText = caption[index];
    img.style.opacity = 1;
  }, 300);
}

show();

/* BUTTON */
function next() {
  if (index < foto.length) {
    index++;
    show();
  }
}

function prev() {
  if (index > 0) {
    index--;
    show();
  }
}

/* ===== FIREWORK ===== */
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

let fireworks = [];

class Firework {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height;
    this.targetY = Math.random() * canvas.height / 2;
    this.exploded = false;
    this.particles = [];
    this.color = `hsl(${Math.random() * 360},100%,60%)`;
  }

  explode() {
    for (let i = 0; i < 30; i++) {
      this.particles.push({
        x: this.x,
        y: this.y,
        dx: (Math.random() - 0.5) * 6,
        dy: (Math.random() - 0.5) * 6,
        life: 50
      });
    }
  }

  update() {
    if (!this.exploded) {
      this.y -= 4;
      if (this.y <= this.targetY) {
        this.exploded = true;
        this.explode();
      }
    } else {
      this.particles.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;
        p.life--;
      });
    }
  }

  draw() {
    ctx.shadowBlur = 12;
    ctx.shadowColor = this.color;
    ctx.fillStyle = this.color;

    if (!this.exploded) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
      ctx.fill();
    } else {
      this.particles.forEach(p => {
        ctx.globalAlpha = p.life / 50;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (Math.random() < 0.05) {
    fireworks.push(new Firework());
  }

  fireworks.forEach((fw, i) => {
    fw.update();
    fw.draw();
    if (fw.exploded && fw.particles.every(p => p.life <= 0)) {
      fireworks.splice(i, 1);
    }
  });

  requestAnimationFrame(animate);
}
animate();
