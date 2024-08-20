const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const numParticles = 3000;
const sigma = 10;
const rho = 28;
const beta = 8 / 3;
const dt = 0.01;

// Initialize particles with Lorenz attractor
for (let i = 0; i < numParticles; i++) {
    particles.push({
        x: Math.random() * 2 - 1,
        y: Math.random() * 2 - 1,
        z: Math.random() * 2 - 1,
        hue: Math.random() * 360,
    });
}

function updateParticle(p) {
    const dx = sigma * (p.y - p.x);
    const dy = p.x * (rho - p.z) - p.y;
    const dz = p.x * p.y - beta * p.z;

    p.x += dx * dt;
    p.y += dy * dt;
    p.z += dz * dt;

    p.hue += 0.1; // Rotate color slightly over time
}

function drawParticle(p) {
    const scale = 10;
    const x = p.x * scale + canvas.width / 2;
    const y = p.y * scale + canvas.height / 2;

    ctx.fillStyle = `hsl(${p.hue}, 100%, 50%)`;
    ctx.beginPath();
    ctx.arc(x, y, 0.5, 0, 2 * Math.PI);
    ctx.fill();
}

function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Slightly fade the background
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        updateParticle(p);
        drawParticle(p);
    });

    requestAnimationFrame(animate);
}

animate();
