/*Variable Declarations*/

const defaultSize = 16;
const cellsArray = [];

let mouseDown = false;

const colorWheel = document.querySelector('.color-wheel');
const colorValue = colorWheel.value;
const eraserSelector = document.querySelector('#eraser-selector');
const rainbowSelector = document.querySelector('#rainbow-selector');
const drawSelector = document.querySelector('#draw-selector');
const clearBtn = document.querySelector('.clearBtn');
const clearBtnSmall = document.querySelector('.clearBtnSmall');
const rowLengthSubmitBtn = document.querySelector('.row-length-submit');
const rowLengthInput = document.querySelector('#row-length');
const lightenSelector = document.querySelector('#lighten-selector')
const darkenSelector = document.querySelector('#darken-selector')
const noneSelector = document.querySelector('#none-selector')
const container = document.querySelector('.js-container');

/*Functions*/

function createContainer () {
  let width = container.style.width;
  width = '70vw';
  container.style.height = width;
  let maxWidth = container.style.maxWidth;
  maxWidth = '800px';
  container.style.maxHeight = maxWidth;
}

function getInnerWidth(elem) {
  return parseFloat(window.getComputedStyle(elem).width);
}

function generateGrid(rowLength) {
  createContainer();

  let totalCells = rowLength * rowLength;
  let percentage = getInnerWidth(container) / rowLength;
  clearGrid();
  
  for (let i = 0; i < totalCells; i++) {
    const cells = document.createElement('div');
    cells.classList.add('myDiv');
    container.appendChild(cells);
    cells.style.width = `${percentage}px`;
    cells.style.height = `${percentage}px`;
    cells.addEventListener('mouseenter', () => {
      if (mouseDown) {
        if (drawSelector.checked) {
          cells.style.backgroundColor = colorWheel.value;
          cells.classList.add('js-is-changed')
        } else if (eraserSelector.checked) {
          cells.style.backgroundColor = '#BAD9D6';
          cells.classList.remove('js-is-changed')
        } else if (rainbowSelector.checked) {
          let randomColor = Math.floor(Math.random() * 16777215).toString(16);
          cells.style.backgroundColor = "#" + randomColor;
          cells.classList.add('js-is-changed')
        }
      } else return;
    });
    cellsArray.push(cells);
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
  let num = parseInt(col, 16); let r = (num >> 16) + amt;
  if (r > 255) r = 255;
  else if (r < 0) r = 0;
  let b = ((num >> 8) & 0x00FF) + amt;
  if (b > 255) b = 255;
  else if (b < 0) b = 0;
  let g = (num & 0x0000FF) + amt;
  if (g > 255) g = 255;
  else if (g < 0) g = 0;
  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
}

function RGBToHex(rgb) {
  // Choose correct separator
  let sep = rgb.indexOf(",") > -1 ? "," : " ";
  // Turn "rgb(r,g,b)" into [r,g,b]
  rgb = rgb.substr(4).split(")")[0].split(sep);

  let r = (+rgb[0]).toString(16),
    g = (+rgb[1]).toString(16),
    b = (+rgb[2]).toString(16);

  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;

  return "#" + r + g + b;
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

document.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    rowLengthSubmitBtn.click();
  } else return;
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

clearBtnSmall.addEventListener('click', () => {
  eraseGrid();
})

container.addEventListener('click', (e) => {
  let originalColor = RGBToHex(e.target.style.backgroundColor);
  if (e.target.classList.contains('js-is-changed')) {
    if (noneSelector.checked) {
      return;
    } else if (lightenSelector.checked) {
      e.target.style.backgroundColor = LightenDarkenColor(originalColor, 26);
    } else if (darkenSelector.checked) {
      e.target.style.backgroundColor = LightenDarkenColor(originalColor, -26);
    }
  } else return;
})

window.addEventListener('resize', () => {
  generateGrid(defaultSize);
})

/*On-Load behaviours*/

window.onload = () => {
  generateGrid(defaultSize);
}