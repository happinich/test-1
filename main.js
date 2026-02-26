document.addEventListener('DOMContentLoaded', () => {
  const generateBtn = document.getElementById('generate-btn');
  const numbersContainer = document.getElementById('lotto-numbers');
  const themeToggle = document.getElementById('theme-toggle');
  const inquiryForm = document.getElementById('inquiry-form');
  const formStatus = document.getElementById('form-status');
  
  // Theme Logic
  const currentTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);

  themeToggle.addEventListener('click', () => {
    const theme = document.documentElement.getAttribute('data-theme');
    const newTheme = theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });

  // Lotto Logic
  generateBtn.addEventListener('click', () => {
    const numbers = generateLottoNumbers();
    displayNumbers(numbers);
  });

  function generateLottoNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
      const randomNum = Math.floor(Math.random() * 45) + 1;
      numbers.add(randomNum);
    }
    return Array.from(numbers).sort((a, b) => a - b);
  }

  function displayNumbers(numbers) {
    numbersContainer.innerHTML = '';
    numbers.forEach((num, index) => {
      const ball = document.createElement('div');
      ball.className = 'lotto-ball';
      
      if (num <= 10) ball.classList.add('range-10');
      else if (num <= 20) ball.classList.add('range-20');
      else if (num <= 30) ball.classList.add('range-30');
      else if (num <= 40) ball.classList.add('range-40');
      else ball.classList.add('range-max');

      ball.textContent = num;
      ball.style.animationDelay = `${index * 0.1}s`;
      numbersContainer.appendChild(ball);
    });
  }

  // Form Logic
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = new FormData(e.target);
      
      formStatus.textContent = '보내는 중...';
      formStatus.style.color = 'var(--primary-color)';

      try {
        const response = await fetch(e.target.action, {
          method: inquiryForm.method,
          body: data,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          formStatus.textContent = '감사합니다! 문의가 성공적으로 전송되었습니다.';
          formStatus.style.color = '#4CAF50';
          inquiryForm.reset();
        } else {
          const result = await response.json();
          formStatus.textContent = result.errors ? result.errors.map(error => error.message).join(", ") : '오류가 발생했습니다.';
          formStatus.style.color = '#f44336';
        }
      } catch (error) {
        formStatus.textContent = '서버 통신 중 오류가 발생했습니다.';
        formStatus.style.color = '#f44336';
      }
    });
  }
});
