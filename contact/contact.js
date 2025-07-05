// Contact Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.querySelector('.submit-btn');
    const btnText = document.querySelector('.btn-text');
    const inputs = document.querySelectorAll('input, textarea, select');

    // フォーム送信処理
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // バリデーション
        if (validateForm()) {
            submitForm();
        }
    });

    // フォームバリデーション
    function validateForm() {
        let isValid = true;
        
        inputs.forEach(input => {
            const value = input.value.trim();
            
            // 必須フィールドチェック
            if (input.hasAttribute('required') && !value) {
                showError(input, 'この項目は必須です');
                isValid = false;
            } else if (input.type === 'email' && value && !isValidEmail(value)) {
                showError(input, 'メールアドレスの形式が正しくありません');
                isValid = false;
            } else {
                clearError(input);
            }
        });
        
        return isValid;
    }

    // メールアドレス形式チェック
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // エラー表示
    function showError(input, message) {
        clearError(input);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = '#ff4655';
        errorDiv.style.fontSize = '0.9rem';
        errorDiv.style.marginTop = '0.5rem';
        errorDiv.style.animation = 'fadeIn 0.3s ease';
        
        input.parentNode.appendChild(errorDiv);
        input.style.borderColor = '#ff4655';
        input.style.boxShadow = '0 0 10px rgba(255, 70, 85, 0.3)';
    }

    // エラークリア
    function clearError(input) {
        const errorMessage = input.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
        input.style.borderColor = '#333';
        input.style.boxShadow = 'none';
    }

    // フォーム送信処理
    function submitForm() {
        // 送信中状態にする
        submitBtn.disabled = true;
        btnText.textContent = '送信中...';
        submitBtn.style.background = 'linear-gradient(45deg, #666, #888)';
        
        // 送信アニメーション
        const loadingDots = document.createElement('span');
        loadingDots.className = 'loading-dots';
        loadingDots.innerHTML = '<span>.</span><span>.</span><span>.</span>';
        btnText.appendChild(loadingDots);
        
        // 点滅アニメーション
        const dots = loadingDots.querySelectorAll('span');
        dots.forEach((dot, index) => {
            dot.style.animation = `loadingDot 1.5s ${index * 0.2}s infinite`;
        });
        
        // 実際の送信処理（ここではダミー）
        setTimeout(() => {
            // 成功処理
            showSuccessMessage();
            resetForm();
        }, 2000);
    }

    // 成功メッセージ表示
    function showSuccessMessage() {
        const successDiv = document.createElement('div');
        successDiv.className = 'form-success';
        successDiv.innerHTML = `
            <p>送信が完了しました。</p>
        `;
        
        document.body.appendChild(successDiv);
        
        // 3秒後に削除
        setTimeout(() => {
            successDiv.remove();
        }, 3000);
    }

    // フォームリセット
    function resetForm() {
        // フォームの全ての入力内容をクリア
        contactForm.reset();
        
        // 個別に各入力フィールドを確実にクリア
        inputs.forEach(input => {
            input.value = '';
            clearError(input);
        });
        
        // 送信ボタンを元の状態に戻す
        submitBtn.disabled = false;
        btnText.textContent = '送信';
        submitBtn.style.background = 'linear-gradient(45deg, #ff4655, #ff6b77)';
        
        // ローディングドットを削除
        const loadingDots = btnText.querySelector('.loading-dots');
        if (loadingDots) {
            loadingDots.remove();
        }
    }

    // 入力時のリアルタイムバリデーション
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.value.trim()) {
                if (this.type === 'email' && !isValidEmail(this.value)) {
                    showError(this, 'メールアドレスの形式が正しくありません');
                } else {
                    clearError(this);
                }
            } else if (this.hasAttribute('required')) {
                showError(this, 'この項目は必須です');
            } else {
                clearError(this);
            }
        });

        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                showError(this, 'この項目は必須です');
            }
        });
    });

    // フォーカス時のエフェクト
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.2s ease';
        });

        input.addEventListener('blur', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes loadingDot {
        0%, 20% { opacity: 0; }
        50% { opacity: 1; }
        100% { opacity: 0; }
    }
    
    .loading-dots {
        margin-left: 0.5rem;
    }
    
    .loading-dots span {
        display: inline-block;
        margin: 0 1px;
    }
    
    .error-message {
        animation: fadeIn 0.3s ease;
    }
`;
document.head.appendChild(style);
