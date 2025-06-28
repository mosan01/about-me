document.addEventListener('DOMContentLoaded', () => {
  // カーソルトレイル機能
  const cursor = document.querySelector('.cursor-trail');
  if (cursor) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.top = `${e.clientY}px`;
      cursor.style.left = `${e.clientX}px`;
    });
  }

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
