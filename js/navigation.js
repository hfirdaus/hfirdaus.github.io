(function() {
  'use strict';

  var navBtns = document.querySelectorAll('.nav-btn');
  var pages = document.querySelectorAll('.page');
  var navInner = document.querySelector('.nav-inner');
  var navToggle = document.querySelector('.nav-toggle');
  var isTransitioning = false;
  var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function switchPage(pageId) {
    if (isTransitioning) return;

    var currentPage = document.querySelector('.page.active');
    var targetPage = document.getElementById('page-' + pageId);

    if (!targetPage || targetPage === currentPage) return;

    // Update nav buttons
    navBtns.forEach(function(btn) {
      btn.classList.remove('active');
      if (btn.getAttribute('data-page') === pageId) {
        btn.classList.add('active');
      }
    });

    // Close mobile nav
    if (navInner) {
      navInner.classList.remove('open');
    }

    if (reducedMotion || !currentPage) {
      // No animation — instant switch
      if (currentPage) currentPage.classList.remove('active');
      targetPage.classList.add('active');
      targetPage.style.opacity = '1';
      window.scrollTo(0, 0);
      restartAnimations(targetPage);
      // Dispatch custom event for vine animation
      document.dispatchEvent(new CustomEvent('pageSwitch', { detail: { pageId: pageId } }));
      return;
    }

    isTransitioning = true;

    // Slide out current page
    currentPage.classList.add('page-transition-out');

    setTimeout(function() {
      currentPage.classList.remove('active', 'page-transition-out');

      // Show and slide in target page
      targetPage.classList.add('active', 'page-transition-in');
      window.scrollTo(0, 0);
      restartAnimations(targetPage);

      // Dispatch custom event for vine animation
      document.dispatchEvent(new CustomEvent('pageSwitch', { detail: { pageId: pageId } }));

      setTimeout(function() {
        targetPage.classList.remove('page-transition-in');
        isTransitioning = false;
      }, 350);
    }, 350);
  }

  function restartAnimations(page) {
    var animElements = page.querySelectorAll('.animate-in');
    animElements.forEach(function(el) {
      el.style.animation = 'none';
      el.offsetHeight; // force reflow
      el.style.animation = '';
    });
  }

  // Make switchPage global
  window.switchPage = switchPage;

  // Nav button clicks
  navBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      switchPage(this.getAttribute('data-page'));
    });
  });

  // Nav card clicks (home page navigation cards)
  document.querySelectorAll('.nav-card[data-nav]').forEach(function(card) {
    card.addEventListener('click', function() {
      switchPage(this.getAttribute('data-nav'));
    });
  });

  // Mobile menu toggle
  if (navToggle) {
    navToggle.addEventListener('click', function() {
      navInner.classList.toggle('open');
    });
  }

  // Keyboard navigation (left/right arrows)
  var pageOrder = ['home', 'about', 'experience', 'projects', 'contact'];

  document.addEventListener('keydown', function(e) {
    // Don't intercept if user is typing in an input
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    var currentIdx = -1;
    var activeBtn = document.querySelector('.nav-btn.active');
    if (activeBtn) {
      currentIdx = pageOrder.indexOf(activeBtn.getAttribute('data-page'));
    }

    if (e.key === 'ArrowRight' && currentIdx < pageOrder.length - 1) {
      e.preventDefault();
      switchPage(pageOrder[currentIdx + 1]);
    } else if (e.key === 'ArrowLeft' && currentIdx > 0) {
      e.preventDefault();
      switchPage(pageOrder[currentIdx - 1]);
    }
  });

  // Reduced motion — ensure initial page is visible
  if (reducedMotion) {
    document.querySelectorAll('.animate-in').forEach(function(el) {
      el.style.opacity = '1';
      el.style.animation = 'none';
    });
    document.querySelectorAll('.shimmer-spot').forEach(function(el) {
      el.style.animation = 'none';
    });
  }
})();
