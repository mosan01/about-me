// カードのホバーエフェクト強化
const hobbyCards = document.querySelectorAll('.hobby-card');

// カードのホバーエフェクトのための追加アニメーション
hobbyCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-10px) scale(1.02)';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) scale(1)';
  });
});

// カードのアニメーション（スクロール時）
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// 初期状態でカードを非表示にしてアニメーション準備
hobbyCards.forEach((card, index) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(50px)';
  card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
  cardObserver.observe(card);
});

// パーティクル効果（カードホバー時）
const createParticles = (card) => {
  for (let i = 0; i < 5; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = '4px';
    particle.style.height = '4px';
    particle.style.background = '#ff4655';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.opacity = '0.7';
    
    const rect = card.getBoundingClientRect();
    particle.style.left = Math.random() * rect.width + 'px';
    particle.style.top = Math.random() * rect.height + 'px';
    
    card.appendChild(particle);
    
    // アニメーション
    particle.animate([
      { transform: 'translateY(0px)', opacity: 0.7 },
      { transform: 'translateY(-20px)', opacity: 0 }
    ], {
      duration: 1000,
      easing: 'ease-out'
    }).onfinish = () => particle.remove();
  }
};

// カードホバー時のパーティクル効果
hobbyCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    createParticles(card);
  });
});

// ページロード時の初期アニメーション
window.addEventListener('load', () => {
  // ヘッダーのアニメーション
  const headline = document.querySelector('.headline');
  if (headline) {
    headline.style.opacity = '0';
    headline.style.transform = 'translateY(30px)';
    headline.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    
    setTimeout(() => {
      headline.style.opacity = '1';
      headline.style.transform = 'translateY(0)';
    }, 300);
  }
  
  // セクションタイトルのアニメーション
  const sectionTitle = document.querySelector('.hobbies-container h2');
  if (sectionTitle) {
    sectionTitle.style.opacity = '0';
    sectionTitle.style.transform = 'translateY(20px)';
    sectionTitle.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
    setTimeout(() => {
      sectionTitle.style.opacity = '1';
      sectionTitle.style.transform = 'translateY(0)';
    }, 600);
  }
});

console.log('🎮 Hobby.js loaded successfully!');