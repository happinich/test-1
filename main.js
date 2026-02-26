document.addEventListener('DOMContentLoaded', () => {
  const generateBtn = document.getElementById('generate-btn');
  const numbersContainer = document.getElementById('lotto-numbers');
  const themeToggle = document.getElementById('theme-toggle');
  
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
});
