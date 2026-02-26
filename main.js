document.addEventListener('DOMContentLoaded', () => {
  const generateBtn = document.getElementById('generate-btn');
  const numbersContainer = document.getElementById('lotto-numbers');

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
      
      // Assign range classes for different colors
      if (num <= 10) ball.classList.add('range-10');
      else if (num <= 20) ball.classList.add('range-20');
      else if (num <= 30) ball.classList.add('range-30');
      else if (num <= 40) ball.classList.add('range-40');
      else ball.classList.add('range-max');

      ball.textContent = num;
      // Stagger animation
      ball.style.animationDelay = `${index * 0.1}s`;
      numbersContainer.appendChild(ball);
    });
  }
});
