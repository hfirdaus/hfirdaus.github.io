(function() {
  'use strict';

  var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) return;

  function animateVines(pageId) {
    var page = document.getElementById('page-' + pageId);
    if (!page) return;

    // Animate SVG vine paths
    var vinePaths = page.querySelectorAll('.vine-path');
    vinePaths.forEach(function(path) {
      var length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
      path.style.transition = 'none';

      // Force reflow
      path.getBoundingClientRect();

      path.style.transition = 'stroke-dashoffset 2s ease';
      path.style.strokeDashoffset = '0';
    });

    // Animate vine leaves with staggered delay
    var leaves = page.querySelectorAll('.vine-leaf');
    leaves.forEach(function(leaf, idx) {
      leaf.style.opacity = '0';
      leaf.style.transition = 'none';

      setTimeout(function() {
        leaf.style.transition = 'opacity 0.5s ease';
        leaf.style.opacity = '0.15';
      }, 800 + idx * 200);
    });

    // Stagger timeline entries with vine growth
    var entries = page.querySelectorAll('.timeline-entry');
    entries.forEach(function(entry, idx) {
      entry.style.opacity = '0';
      entry.style.transform = 'translateY(12px)';
      entry.style.transition = 'none';

      setTimeout(function() {
        entry.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        entry.style.opacity = '1';
        entry.style.transform = 'translateY(0)';
      }, 400 + idx * 300);
    });
  }

  // Listen for page switches
  document.addEventListener('pageSwitch', function(e) {
    animateVines(e.detail.pageId);
  });

  // Animate on initial page load if experience page is active
  var activePage = document.querySelector('.page.active');
  if (activePage && activePage.id === 'page-experience') {
    animateVines('experience');
  }
})();
