document.addEventListener('DOMContentLoaded', () => {
  const musicCards = document.querySelectorAll('.music-card');
  const youtubePlayer = document.getElementById('youtube-player');
  const youtubeIframe = document.getElementById('youtube-iframe');
  const currentTrack = document.getElementById('current-track');
  const closePlayer = document.getElementById('close-player');
  
  let currentPlayingCard = null;

  // 音楽の情報
  const musicData = {
    'dQw4w9WgXcQ': 'エレクトロニック - 集中用BGM',
    'jfKfPfyJRdk': 'LoFi Hip Hop - 作業用BGM',
    '2WPCLda_erI': 'ゲーム音楽 - VALORANT OST'
  };

  // デバッグ用：要素が見つかるかチェック
  console.log('YouTube Player:', youtubePlayer);
  console.log('Music Cards:', musicCards.length);

  // 音楽カードクリックイベント
  musicCards.forEach(card => {
    card.addEventListener('click', () => {
      const youtubeId = card.dataset.youtube;
      console.log('Clicked card with YouTube ID:', youtubeId);
      
      if (currentPlayingCard) {
        currentPlayingCard.classList.remove('playing');
      }
      
      card.classList.add('playing');
      currentPlayingCard = card;
      
      // YouTubeプレイヤーを表示
      showYouTubePlayer(youtubeId);
    });
  });

  // YouTube プレイヤーを表示する関数
  function showYouTubePlayer(videoId) {
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
    console.log('Setting iframe src to:', embedUrl);
    
    youtubeIframe.src = embedUrl;
    currentTrack.textContent = musicData[videoId] || '再生中...';
    youtubePlayer.classList.add('active');
    
    console.log('YouTube player should now be visible');
  }

  // プレイヤーを閉じる
  if (closePlayer) {
    closePlayer.addEventListener('click', () => {
      console.log('Closing player');
      youtubePlayer.classList.remove('active');
      youtubeIframe.src = '';
      
      if (currentPlayingCard) {
        currentPlayingCard.classList.remove('playing');
        currentPlayingCard = null;
      }
    });
  }

  // ESCキーでプレイヤーを閉じる
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && youtubePlayer.classList.contains('active')) {
      closePlayer.click();
    }
  });

  // プレイヤー外をクリックして閉じる
  youtubePlayer.addEventListener('click', (e) => {
    if (e.target === youtubePlayer) {
      closePlayer.click();
    }
  });
});
