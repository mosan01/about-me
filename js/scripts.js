document.addEventListener('DOMContentLoaded', () => {
  // モバイルメニューの機能
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (mobileMenuToggle && navMenu) {
    // デバッグ用ログ
    console.log('モバイルメニュー要素が見つかりました');
    
    mobileMenuToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      console.log('ハンバーガーメニューがクリックされました');
      
      mobileMenuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      
      // ボディのスクロールを制御
      if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
    
    // メニュー項目をクリックしたらメニューを閉じる
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
    
    // 画面外をクリックしたらメニューを閉じる
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('active') && 
          !mobileMenuToggle.contains(e.target) && 
          !navMenu.contains(e.target)) {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
    
    // ESCキーでメニューを閉じる
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  } else {
    console.log('モバイルメニュー要素が見つかりませんでした');
  }

  // カーソルトレイル機能（モバイルでは無効）
  const cursor = document.querySelector('.cursor-trail');
  if (cursor && !window.matchMedia('(max-width: 768px)').matches && !('ontouchstart' in window)) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.top = `${e.clientY}px`;
      cursor.style.left = `${e.clientX}px`;
    });
  } else if (cursor) {
    cursor.style.display = 'none';
  }

  // タイピングアニメーション（ホームページのみ）
  const typingWords = document.getElementById('typing-words');
  if (typingWords) {
    const words = ['プログラマー', 'ゲーマー', '音楽愛好家', 'アニメファン', '映画好き'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeWriter() {
      const currentWord = words[wordIndex];
      
      if (isDeleting) {
        typingWords.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingWords.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        setTimeout(() => isDeleting = true, 2000);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }

      const speed = isDeleting ? 100 : 150;
      setTimeout(typeWriter, speed);
    }

    typeWriter();
  }

  // 統計カウンターアニメーション
  const statNumbers = document.querySelectorAll('.stat-number');
  const progressBars = document.querySelectorAll('.progress');
  
  function animateStats() {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'));
      const duration = 2000;
      const startTime = performance.now();
      
      function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(target * progress);
        
        stat.textContent = current;
        
        if (progress < 1) {
          requestAnimationFrame(updateNumber);
        }
      }
      
      requestAnimationFrame(updateNumber);
    });

    // プログレスバーアニメーション
    setTimeout(() => {
      progressBars.forEach(bar => {
        if (bar.classList.contains('programming-progress')) {
          bar.style.width = '80%';
        } else if (bar.classList.contains('anime-progress')) {
          bar.style.width = '75%';
        } else if (bar.classList.contains('music-progress')) {
          bar.style.width = '95%';
        } else if (bar.classList.contains('movies-progress')) {
          bar.style.width = '25%';
        }
      });
    }, 500);
  }

  // Intersection Observerで統計が見えたらアニメーション開始
  const statsSection = document.querySelector('.stats-dashboard');
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateStats();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    observer.observe(statsSection);
  }

  // ナビゲーションカードの3Dエフェクト
  const navCards = document.querySelectorAll('.nav-card');
  navCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `translateY(-15px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
    });
  });

  // スライドショー（ホームページのみ）
  const images = document.querySelectorAll('.slide img');
  if (images.length > 0) {
    let index = 0;

    function showSlide(i) {
      images.forEach((img, idx) => {
        img.classList.toggle('active', idx === i);
      });
    }

    showSlide(index);

    setInterval(() => {
      index = (index + 1) % images.length;
      showSlide(index);
    }, 3000);
  }

  // コンタクトフォーム送信処理
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('メッセージを受け取りました！ありがとうございます。');
    });
  }

  // 音楽カード再生ボタン
  const musicCovers = document.querySelectorAll('.music-cover');
  musicCovers.forEach(cover => {
    cover.addEventListener('click', () => {
      const playButton = cover.querySelector('.play-button');
      if (playButton.textContent === '▶') {
        playButton.textContent = '⏸';
        cover.style.animation = 'pulse 2s infinite';
      } else {
        playButton.textContent = '▶';
        cover.style.animation = 'none';
      }
    });
  });

  // VALORANTロゴのクリック効果
  const valorantLogos = document.querySelectorAll('.valorant-logo');
  valorantLogos.forEach(logo => {
    logo.addEventListener('click', () => {
      logo.style.animation = 'none';
      setTimeout(() => {
        logo.style.animation = 'scan 1s ease-in-out';
      }, 10);
    });

    // ランダムグリッチ効果
    setInterval(() => {
      if (Math.random() < 0.1) { // 10%の確率
        logo.style.textShadow = '0 0 10px #ff4655, 2px 0 0 #00d4ff, -2px 0 0 #ff4655';
        setTimeout(() => {
          logo.style.textShadow = '0 0 10px rgba(255, 70, 85, 0.5)';
        }, 100);
      }
    }, 3000);
  });
});

// フッターのホバーアニメーション
const footerLinks = document.querySelectorAll('.footer-nav a');
footerLinks.forEach(link => {
  link.addEventListener('mouseenter', () => {
    link.style.backgroundColor = 'rgba(255, 70, 85, 0.2)';
  });
  link.addEventListener('mouseleave', () => {
    link.style.backgroundColor = '';
  });
});

// CSS アニメーション追加
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
`;
document.head.appendChild(style);
