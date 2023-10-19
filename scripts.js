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



const rowLengthSubmitBtn = document.querySelector('.row-length-submit');
const rowLengthInput = document.querySelector('#row-length');

rowLengthSubmitBtn.addEventListener('click', () => {
  let rowLength = rowLengthInput.value;
  generateGrid(rowLength);
})

