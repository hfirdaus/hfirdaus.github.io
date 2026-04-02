(function() {
  'use strict';

  // ============================================================
  // PROJECT CARD FLIP
  // ============================================================
  document.querySelectorAll('.project-card').forEach(function(card) {
    card.addEventListener('click', function() {
      this.classList.toggle('flipped');
    });
  });

  // ============================================================
  // INTEREST BADGE WOBBLE ON HOVER
  // ============================================================
  document.querySelectorAll('.interest-badge').forEach(function(badge) {
    badge.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-6px) scale(1.05)';
      this.style.boxShadow = '0 4px 16px rgba(201,168,76,0.3)';
    });
    badge.addEventListener('mouseleave', function() {
      this.style.transform = '';
      this.style.boxShadow = '';
    });
  });

  // ============================================================
  // SKILL ITEM HIGHLIGHT ON HOVER
  // ============================================================
  document.querySelectorAll('.skill-item').forEach(function(item) {
    item.addEventListener('mouseenter', function() {
      this.style.color = 'var(--deep-blue)';
      this.style.fontWeight = '500';
      this.style.transition = 'all 0.2s ease';
    });
    item.addEventListener('mouseleave', function() {
      this.style.color = '';
      this.style.fontWeight = '';
    });
  });

  // ============================================================
  // DIVIDER ANIMATION ON PAGE SWITCH
  // ============================================================
  document.addEventListener('pageSwitch', function(e) {
    var page = document.getElementById('page-' + e.detail.pageId);
    if (!page) return;

    var dividers = page.querySelectorAll('.ornament-divider, .ornament-divider-sm');
    dividers.forEach(function(div) {
      div.style.animation = 'none';
      div.offsetHeight;
      div.style.animation = '';
    });
  });
})();
