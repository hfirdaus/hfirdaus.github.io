(function() {
  'use strict';

  var canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  // Disable on mobile or reduced motion
  var isMobile = window.innerWidth < 769;
  var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (isMobile || reducedMotion) {
    canvas.style.display = 'none';
    return;
  }

  var ctx = canvas.getContext('2d');
  var particles = [];
  var PARTICLE_COUNT = 35;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();

  window.addEventListener('resize', function() {
    resize();
    // Re-check mobile
    if (window.innerWidth < 769) {
      canvas.style.display = 'none';
      particles = [];
    } else {
      canvas.style.display = '';
    }
  });

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 50,
      size: 1 + Math.random() * 2.5,
      speedY: -(0.2 + Math.random() * 0.5),
      speedX: (Math.random() - 0.5) * 0.3,
      opacity: 0.1 + Math.random() * 0.4,
      // Subtle size oscillation
      sizePhase: Math.random() * Math.PI * 2,
      sizeSpeed: 0.01 + Math.random() * 0.02
    };
  }

  // Initialize particles
  for (var i = 0; i < PARTICLE_COUNT; i++) {
    var p = createParticle();
    p.y = Math.random() * canvas.height; // spread initially
    particles.push(p);
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];

      // Update position
      p.y += p.speedY;
      p.x += p.speedX;
      p.sizePhase += p.sizeSpeed;

      // Oscillating size
      var drawSize = p.size + Math.sin(p.sizePhase) * 0.5;

      // Reset when off-screen
      if (p.y < -10) {
        particles[i] = createParticle();
        continue;
      }

      // Draw gold dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, drawSize, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(201, 168, 76, ' + p.opacity + ')';
      ctx.fill();

      // Subtle glow
      ctx.beginPath();
      ctx.arc(p.x, p.y, drawSize * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(201, 168, 76, ' + (p.opacity * 0.15) + ')';
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
})();
