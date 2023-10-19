const defaultSize = 16;

let mouseDown = false;

const colorWheel = document.querySelector('.color-wheel');

function generateGrid(rowLength) {
  let totalCells = rowLength * rowLength;
  let percentage = 650 / rowLength;

  for (let i = 0; i < totalCells; i++) {
    const container = document.querySelector('.js-container');
    let myDiv = document.createElement('div');
    myDiv.classList.add('myDiv');
    container.appendChild(myDiv);
    myDiv.style.width = `${percentage}px`;
    myDiv.style.height = `${percentage}px`;
    myDiv.addEventListener('mouseenter', () => {
      if (mouseDown) {
      myDiv.style.backgroundColor = colorWheel.value;
      } else return;
    })
  }
}

function clearGrid() {
  const container = document.querySelector('.js-container');
  while (container.firstChild) {
    container.removeChild(container.lastChild);
  }
}

const rowLengthSubmitBtn = document.querySelector('.row-length-submit');
const rowLengthInput = document.querySelector('#row-length');

rowLengthSubmitBtn.addEventListener('click', () => {
  clearGrid();
  let rowLength = rowLengthInput.value;
  if (rowLength > 100 || rowLength < 1) {
    alert('The number must be between 1 and 100.')
  } else {
  generateGrid(rowLength);
  }
})

window.onload = () => {
  generateGrid(defaultSize);
}

document.addEventListener('mousedown', () => {
  mouseDown = true;
})

document.addEventListener('mouseup', () => {
  mouseDown = false;
})