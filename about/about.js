// About Me ページのJavaScript

document.addEventListener('DOMContentLoaded', () => {
  // スキルバーアニメーション
  const skillProgressBars = document.querySelectorAll('.skill-progress');
  
  function animateSkillBars() {
    skillProgressBars.forEach(bar => {
      const targetWidth = bar.getAttribute('data-width');
      bar.style.width = targetWidth;
    });
  }

  // Intersection Observerでスキルセクションが見えたらアニメーション開始
  const skillsSection = document.querySelector('.skills-section');
  if (skillsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateSkillBars();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(skillsSection);
  }

  // タイムラインアイテムのアニメーション
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.2 });

  // 初期状態でタイムラインアイテムを非表示
  timelineItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(50px)';
    item.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
    timelineObserver.observe(item);
  });

  // ゴールカードのホバーエフェクト
  const goalCards = document.querySelectorAll('.goal-card');
  goalCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
  });

  // プロフィールカードのパーティクル効果
  const profileCard = document.querySelector('.profile-card');
  if (profileCard) {
    profileCard.addEventListener('mouseenter', () => {
      createProfileParticles(profileCard);
    });
  }

  function createProfileParticles(element) {
    for (let i = 0; i < 8; i++) {
      const particle = document.createElement('div');
      particle.style.position = 'absolute';
      particle.style.width = '4px';
      particle.style.height = '4px';
      particle.style.background = '#ff4655';
      particle.style.borderRadius = '50%';
      particle.style.pointerEvents = 'none';
      particle.style.zIndex = '1000';
      
      const rect = element.getBoundingClientRect();
      particle.style.left = Math.random() * rect.width + 'px';
      particle.style.top = Math.random() * rect.height + 'px';
      
      element.appendChild(particle);
      
      // アニメーション
      particle.animate([
        { 
          transform: 'translateY(0px) scale(1)', 
          opacity: 0.8 
        },
        { 
          transform: 'translateY(-30px) scale(0)', 
          opacity: 0 
        }
      ], {
        duration: 1500,
        easing: 'ease-out'
      }).onfinish = () => particle.remove();
    }
  }

  // スキルカテゴリのホバー時の動的効果
  const skillCategories = document.querySelectorAll('.skill-category');
  skillCategories.forEach(category => {
    category.addEventListener('mouseenter', () => {
      const skillBars = category.querySelectorAll('.skill-progress');
      skillBars.forEach(bar => {
        bar.style.animationPlayState = 'running';
      });
    });
  });

  // スムーズスクロール機能（ナビゲーションがある場合）
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ページロード時のヘッダーアニメーション
  const headline = document.querySelector('.headline');
  const heroSubtitle = document.querySelector('.hero-subtitle');
  
  if (headline) {
    headline.style.opacity = '0';
    headline.style.transform = 'translateY(30px)';
    headline.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    
    setTimeout(() => {
      headline.style.opacity = '1';
      headline.style.transform = 'translateY(0)';
    }, 300);
  }

  if (heroSubtitle) {
    heroSubtitle.style.opacity = '0';
    heroSubtitle.style.transform = 'translateY(20px)';
    heroSubtitle.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
    setTimeout(() => {
      heroSubtitle.style.opacity = '1';
      heroSubtitle.style.transform = 'translateY(0)';
    }, 600);
  }

  // プロフィール画像のホバー回転効果
  const avatarIcon = document.querySelector('.avatar-icon');
  if (avatarIcon) {
    const profileImage = document.querySelector('.image-placeholder');
    profileImage.addEventListener('mouseenter', () => {
      avatarIcon.style.transform = 'rotate(360deg)';
      avatarIcon.style.transition = 'transform 0.8s ease';
    });

    profileImage.addEventListener('mouseleave', () => {
      avatarIcon.style.transform = 'rotate(0deg)';
    });
  }

  console.log('📋 About Me page loaded successfully!');
});