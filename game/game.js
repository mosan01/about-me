document.addEventListener('DOMContentLoaded', () => {
  // スライドショー機能
  const slides = document.querySelectorAll('.game-slide');
  const indicators = document.querySelectorAll('.indicator');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  let currentSlide = 0;

  // ゲームサイトのURL
  const gameUrls = {
    'valorant': 'https://playvalorant.com/ja-jp/',
    'apex': 'https://www.ea.com/ja-jp/games/apex-legends',
    'fortnite': 'https://www.fortnite.com/'
  };

  // スライドを表示する関数
  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle('active', i === index);
    });
  }

  // 次のスライドに移動
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  // 前のスライドに移動
  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  // 手動操作時に自動スライドを一時停止して再開
  function resetAutoSlide() {
    stopAutoSlide();
    setTimeout(() => {
      startAutoSlide();
    }, 100);
  }

  // ボタンイベント
  if (nextBtn) nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoSlide();
  });
  if (prevBtn) prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoSlide();
  });

  // インジケータークリックイベント
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      currentSlide = index;
      showSlide(currentSlide);
      resetAutoSlide();
    });
  });

  // スライドクリックでゲームサイトへ
  slides.forEach(slide => {
    slide.addEventListener('click', () => {
      const gameType = slide.dataset.game;
      if (gameUrls[gameType]) {
        window.open(gameUrls[gameType], '_blank');
        
        // クリック効果
        slide.style.transform = 'scale(0.98)';
        setTimeout(() => {
          slide.style.transform = 'scale(1)';
        }, 150);
        
        // 自動スライドを一時停止して再開
        resetAutoSlide();
      }
    });
  });

  // 自動スライド（3秒間隔）
  let autoSlideInterval;
  
  function startAutoSlide() {
    // 既存のインターバルをクリア
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
    }
    autoSlideInterval = setInterval(nextSlide, 3000);
  }
  
  function stopAutoSlide() {
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
      autoSlideInterval = null;
    }
  }

  // 自動スライド開始
  startAutoSlide();

  // マウスホバーで自動スライドを停止
  const slideshowContainer = document.querySelector('.game-slideshow');
  if (slideshowContainer) {
    slideshowContainer.addEventListener('mouseenter', () => {
      stopAutoSlide();
    });

    slideshowContainer.addEventListener('mouseleave', () => {
      startAutoSlide();
    });
  }

  // キーボード操作
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
      resetAutoSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
      resetAutoSlide();
    }
  });

  // ゲームリンクカードのクリックイベント
  const gameCards = document.querySelectorAll('.game-link-card');
  
  gameCards.forEach(card => {
    card.addEventListener('click', () => {
      const url = card.dataset.url;
      if (url) {
        // 新しいタブでゲームサイトを開く
        window.open(url, '_blank');
        
        // クリック効果のアニメーション
        card.style.transform = 'translateY(-5px) scale(0.95)';
        setTimeout(() => {
          card.style.transform = '';
        }, 150);
      }
    });

    // ホバー時の追加効果
    card.addEventListener('mouseenter', () => {
      const icon = card.querySelector('.game-icon');
      if (icon) {
        icon.style.transform = 'scale(1.1) rotate(5deg)';
        icon.style.transition = 'transform 0.3s ease';
      }
    });

    card.addEventListener('mouseleave', () => {
      const icon = card.querySelector('.game-icon');
      if (icon) {
        icon.style.transform = 'scale(1) rotate(0deg)';
      }
    });
  });

  // ゲームカードの3D効果
  gameCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // 画像のエラーハンドリング
  const gameImages = document.querySelectorAll('.game-slide img');
  gameImages.forEach(img => {
    img.addEventListener('error', function() {
      this.style.display = 'none';
      console.log(`画像が見つかりません: ${this.src}`);
    });
    
    img.addEventListener('load', function() {
      this.style.display = 'block';
      console.log(`画像が読み込まれました: ${this.src}`);
    });
  });

  // 初期表示
  showSlide(0);
});
