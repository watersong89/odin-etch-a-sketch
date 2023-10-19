/*Variable Declarations*/

const defaultSize = 16;

let mouseDown = false;
let lightDarkValue = 5;

const colorWheel = document.querySelector('.color-wheel');
const colorValue = colorWheel.value;
const eraserSelector = document.querySelector('#eraser-selector');
const rainbowSelector = document.querySelector('#rainbow-selector');
const drawSelector = document.querySelector('#draw-selector');
const clearBtn = document.querySelector('.clearBtn');
const rowLengthSubmitBtn = document.querySelector('.row-length-submit');
const rowLengthInput = document.querySelector('#row-length');
const lightenSelector = document.querySelector('#lighten-selector')
const darkenSelector = document.querySelector('#darken-selector')
const noneSelector = document.querySelector('#none-selector')

/*Functions*/

function generateGrid(rowLength) {
  let totalCells = rowLength * rowLength;
  let percentage = 650 / rowLength;
  clearGrid();
  for (let i = 0; i < totalCells; i++) {
    const container = document.querySelector('.js-container');
    const cells = document.createElement('div');
    cells.classList.add('myDiv');
    container.appendChild(cells);
    cells.style.width = `${percentage}px`;
    cells.style.height = `${percentage}px`;
    cells.addEventListener('mouseenter', () => {
      if (mouseDown) {
        if (drawSelector.checked) {
          cells.style.backgroundColor = colorWheel.value;
        } else if (eraserSelector.checked) {
          cells.style.backgroundColor = 'white';
        } else if (rainbowSelector.checked) {
          let randomColor = Math.floor(Math.random() * 16777215).toString(16);
          cells.style.backgroundColor = "#" + randomColor;
        }
      } else return;
    })

    /*This is the beginnings of code to allow lightening and darkening of colors. Doesn't currently work in rainbow mode, also doesn't lighten or darken more than one increment */
  cells.addEventListener('click', () => {
    if (noneSelector.checked) {
      return;
    } else if (lightenSelector.checked) {
      cells.style.backgroundColor = LightenDarkenColor(colorWheel.value, 10);
      lightDarkValue++;
    } else if (darkenSelector.checked) {
      cells.style.backgroundColor = LightenDarkenColor(colorWheel.value, -10);
      lightDarkValue--;
    }
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

/*Below function taken from https://css-tricks.com/snippets/javascript/lighten-darken-color/ - still don't understand how it works!*/

function LightenDarkenColor(col, amt) {
  let usePound = false;
  if (col[0] == "#") {
      col = col.slice(1);
      usePound = true;
  }
  let num = parseInt(col,16);let r = (num >> 16) + amt;
  if (r > 255) r = 255;
  else if  (r < 0) r = 0;
  let b = ((num >> 8) & 0x00FF) + amt;
  if (b > 255) b = 255;
  else if  (b < 0) b = 0;
  let g = (num & 0x0000FF) + amt;
  if (g > 255) g = 255;
  else if (g < 0) g = 0;
  return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
}

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