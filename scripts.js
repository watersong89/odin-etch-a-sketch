/*Variable Declarations*/

const defaultSize = 16;

let mouseDown = false;

const colorWheel = document.querySelector('.color-wheel');
const eraserSelector = document.querySelector('#eraser-selector');
const rainbowSelector = document.querySelector('#rainbow-selector');
const drawSelector = document.querySelector('#draw-selector');
const clearBtn = document.querySelector('.clearBtn');
const rowLengthSubmitBtn = document.querySelector('.row-length-submit');
const rowLengthInput = document.querySelector('#row-length');


/*Functions*/

function generateGrid(rowLength) {
  let totalCells = rowLength * rowLength;
  let percentage = 650 / rowLength;
  clearGrid();
  for (let i = 0; i < totalCells; i++) {
    const container = document.querySelector('.js-container');
    let myDiv = document.createElement('div');
    myDiv.classList.add('myDiv');
    container.appendChild(myDiv);
    myDiv.style.width = `${percentage}px`;
    myDiv.style.height = `${percentage}px`;
    myDiv.addEventListener('mouseenter', () => {
      if (mouseDown) {
        if (drawSelector.checked) {
          myDiv.style.backgroundColor = colorWheel.value;
        } else if (eraserSelector.checked) {
          myDiv.style.backgroundColor = 'white';
        } else if (rainbowSelector.checked) {
          let randomColor = Math.floor(Math.random() * 16777215).toString(16);
          myDiv.style.backgroundColor = "#" + randomColor;
        }
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

function eraseGrid() {
  let rowLength = rowLengthInput.value;
  if (rowLength === '') {
    generateGrid(defaultSize);
  } else {
    generateGrid(rowLength);
  }
}

console.log(rowLengthInput.value);

/*Event Listeners*/

rowLengthSubmitBtn.addEventListener('click', () => {
  clearGrid();
  let rowLength = rowLengthInput.value;
  if (rowLength > 100 || rowLength < 1) {
    alert('The number must be between 1 and 100.')
  } else {
    generateGrid(rowLength);
  }
})

document.addEventListener('mousedown', () => {
  mouseDown = true;
})

document.addEventListener('mouseup', () => {
  mouseDown = false;
})

clearBtn.addEventListener('click', () => {
  eraseGrid();
})


/*On-Load behaviours*/

window.onload = () => {
  generateGrid(defaultSize);
}