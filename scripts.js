function generateGrid (rowLength) {
let totalCells = rowLength * rowLength;
let percentage = 650 / rowLength;

for (let i = 0; i < totalCells; i++) {
  const container = document.querySelector('.js-container');
  let myDiv = document.createElement('div');
  myDiv.classList.add('myDiv');
  container.appendChild(myDiv);
  myDiv.style.width = `${percentage}px`;
  myDiv.style.height = `${percentage}px`;
}
}

generateGrid(16);

// let rowInput = document.querySelector('input');

// rowInput.addEventListener('click', () => {

// })