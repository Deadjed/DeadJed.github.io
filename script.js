console.log('Script is running');
// Smooth scroll functionality
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Starfield animation setup

const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

let stars = [];
const numStars = 500;
let screen = {
    width: window.innerWidth,
    height: window.innerHeight,
    centerX: window.innerWidth / 2,
    centerY: window.innerHeight / 2,
};
let starSpeed = 0.35;

function initStars() {
    stars = [];
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * screen.width,
            y: Math.random() * screen.height,
            z: Math.random() * screen.width,
            size: Math.random() * 1 + 1
        });
    }
}

function resizeCanvas() {
    screen.width = window.innerWidth;
    screen.height = window.innerHeight;
    screen.centerX = screen.width / 2;
    screen.centerY = screen.height / 2;
    canvas.width = screen.width;
    canvas.height = screen.height;
}

function updateStars() {
    for (let i = 0; i < stars.length; i++) {
        stars[i].z -= starSpeed;
        if (stars[i].z <= 0) {
            stars[i].z = screen.width;
        }
    }
}

function drawStars() {
    ctx.clearRect(0, 0, screen.width, screen.height);
    for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        const x = (star.x - screen.centerX) * (screen.width / star.z);
        const y = (star.y - screen.centerY) * (screen.width / star.z);
        const size = star.size * (screen.width / star.z);

        ctx.beginPath();
        ctx.arc(screen.centerX + x, screen.centerY + y, size, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fill();
    }
}

function animate() {
    updateStars();
    drawStars();
    requestAnimationFrame(animate);
}

resizeCanvas();
initStars();
animate();
window.addEventListener('resize', resizeCanvas);
