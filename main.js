/* =====================================================
   商丘氧漫网络科技有限公司 - 全站 JavaScript
   ===================================================== */

document.addEventListener('DOMContentLoaded', function () {

  // ========== 1. 导航栏滚动效果 ==========
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // ========== 2. 移动端导航开关 ==========
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
      // 汉堡图标动画
      navToggle.classList.toggle('active');
    });
    // 点击链接后关闭
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
      });
    });
  }

  // ========== 3. Hero 粒子效果 ==========
  const particlesContainer = document.getElementById('particles');
  if (particlesContainer) {
    const count = 30;
    for (let i = 0; i < count; i++) {
      const dot = document.createElement('div');
      dot.classList.add('particle');
      const size = Math.random() * 4 + 2;
      const x    = Math.random() * 100;
      const dur  = Math.random() * 15 + 10;
      const del  = Math.random() * 10;
      const opacity = Math.random() * 0.4 + 0.1;
      dot.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${x}%;
        bottom: -10px;
        animation-duration: ${dur}s;
        animation-delay: -${del}s;
        opacity: ${opacity};
      `;
      particlesContainer.appendChild(dot);
    }
  }

  // ========== 4. 滚动入场动画 ==========
  const animEls = document.querySelectorAll(
    '.service-card, .adv-item, .mvv-card, .team-card, .tl-item, .faq-item, .sd-content, .about-intro'
  );
  animEls.forEach(function (el) {
    el.classList.add('animate-in');
  });

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.delay || 0;
        setTimeout(function () {
          el.classList.add('visible');
        }, parseInt(delay));
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  animEls.forEach(function (el) { observer.observe(el); });

  // ========== 5. 产品服务页 - 服务导航高亮 ==========
  const serviceNav = document.querySelector('.service-nav');
  if (serviceNav) {
    const snItems    = serviceNav.querySelectorAll('.sn-item');
    const sections   = ['production', 'training', 'startup']
      .map(function (id) { return document.getElementById(id); })
      .filter(Boolean);

    function updateActiveNav () {
      const scrollY = window.scrollY + 160;
      let current = '';
      sections.forEach(function (sec) {
        if (sec.offsetTop <= scrollY) { current = sec.id; }
      });
      snItems.forEach(function (item) {
        const href = item.getAttribute('href').replace('#', '');
        item.classList.toggle('active-sn', href === current);
      });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();
  }

  // ========== 6. FAQ 手风琴 ==========
  window.toggleFaq = function (el) {
    const item = el.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    // 关闭所有
    document.querySelectorAll('.faq-item.open').forEach(function (i) {
      i.classList.remove('open');
    });
    if (!isOpen) { item.classList.add('open'); }
  };

  // ========== 7. 联系表单 ==========
  const form = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  if (form && formSuccess) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      // 简单前端验证
      const name    = form.querySelector('#name').value.trim();
      const phone   = form.querySelector('#phone').value.trim();
      const subject = form.querySelector('#subject').value;
      const message = form.querySelector('#message').value.trim();
      if (!name || !phone || !subject || !message) {
        alert('请填写所有必填项（带 * 的字段）');
        return;
      }
      // 模拟提交
      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.querySelector('.btn-text').textContent = '提交中...';
      setTimeout(function () {
        form.style.display = 'none';
        formSuccess.classList.add('show');
      }, 1200);
    });
  }

  // ========== 8. 平滑锚点跳转（考虑 sticky 导航高度）==========
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      const targetId = a.getAttribute('href').slice(1);
      const target   = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        const offset = navbar ? (navbar.offsetHeight + 80) : 100;
        const top    = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

});
