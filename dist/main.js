/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/dom.js":
/*!****************************!*\
  !*** ./src/modules/dom.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   moveFigure: () => (/* binding */ moveFigure)
/* harmony export */ });
/* harmony import */ var _travails__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./travails */ "./src/modules/travails.js");
/* eslint-disable no-alert */
/* eslint-disable no-use-before-define */
/* eslint-disable import/no-cycle */
/* eslint-disable no-plusplus */



function createDom() {
  const gameBoard = document.querySelector('.game-board');
  for (let row = 8; row >= 1; row--) {
    for (let col = 1; col <= 8; col++) {
      const square = document.createElement('div');

      if ((row % 2 === 0 && col % 2 !== 0)
        || (row % 2 !== 0 && col % 2 === 0)) {
        square.style.background = 'black';
      } else {
        square.style.backgroundColor = 'white';
      }

      square.classList.add('cell');
      square.classList.add(`cell-${row}-${col}`);
      gameBoard.appendChild(square);
    }
  }

  const letterMarks = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const letters = document.querySelectorAll('.letters');
  const numbers = document.querySelectorAll('.numbers');

  for (let i = letterMarks.length - 1; i >= 0; i--) {
    const letterSpace = document.createElement('p');
    letterSpace.textContent = letterMarks[i];
    letters[0].appendChild(letterSpace);
  }

  for (let i = 0; i < letterMarks.length; i++) {
    const letterSpace = document.createElement('p');
    letterSpace.textContent = letterMarks[i];
    letters[1].appendChild(letterSpace);
  }

  for (let i = 1; i < 9; i++) {
    const numberSpace = document.createElement('p');
    numberSpace.textContent = i;
    numbers[1].appendChild(numberSpace);
  }

  for (let i = 8; i >= 1; i--) {
    const numberSpace = document.createElement('p');
    numberSpace.textContent = i;
    numbers[0].appendChild(numberSpace);
  }

  let isChoosingStart = false;
  let isChoosingEnd = false;
  const img = document.createElement('img');
  img.src = 'images/knight-figure-2D.png';
  const screen = document.querySelector('.timer-screen h2');
  const knightPlace = document.querySelector('.place-knight');
  const endPlace = document.querySelector('.select-end');
  const buttonMove = document.querySelector('.travail');
  const reset = document.querySelector('.reset');
  let data = [];

  knightPlace.addEventListener('click', () => {
    isChoosingStart = true;
    knightPlace.disabled = true;
    screen.textContent = 'Select one field';
  });

  endPlace.addEventListener('click', () => {
    isChoosingEnd = true;
    endPlace.disabled = true;
    screen.textContent = 'Select one field';
  });

  reset.addEventListener('click', () => {
    isChoosingEnd = false;
    isChoosingStart = false;
    endPlace.disabled = false;
    knightPlace.disabled = false;
    data = [];
    screen.textContent = '';
    const image = document.querySelector('.knight-figure');
    if (image) {
      document.querySelector('.game-board').removeChild(image);
    }
  });

  buttonMove.addEventListener('click', () => {
    screen.textContent = '';
    (0,_travails__WEBPACK_IMPORTED_MODULE_0__.moveKnight)(data[0], data[1]);
    data = [];
  });

  document.addEventListener('click', (e) => {
    if (isChoosingStart) {
      const clickedElement = e.target;
      const classes = clickedElement.classList;

      if (classes.contains('cell')) {
        screen.textContent = '';
        isChoosingStart = false;
        knightPlace.disabled = false;
        const numClass = classes[1];
        img.classList.add('knight-figure');
        document.querySelector('.game-board').appendChild(img);
        const numsOnly = numClass.split('-');
        const rowNum = numsOnly[1] - 1;
        const colNum = numsOnly[2] - 1;
        const fullLocation = [colNum, rowNum];
        moveFigure(fullLocation);
        data.shift();
        data.unshift(fullLocation);
      }
    } else if (isChoosingEnd) {
      const clickedElement = e.target;
      const classes = clickedElement.classList;

      if (classes.contains('cell')) {
        screen.textContent = 'Press travail';
        isChoosingEnd = false;
        endPlace.disabled = false;
        const numClass = classes[1];
        const numsOnly = numClass.split('-');
        const rowNum = numsOnly[1] - 1;
        const colNum = numsOnly[2] - 1;
        const fullLocation = [colNum, rowNum];
        if (data.length === 2) {
          data.pop();
        } else if (data.length === 0) {
          alert('Please place your knight first');
          return;
        }
        data.push(fullLocation);
      }
    }
  });
}

function moveFigure(arr) {
  const middleImg = document.querySelector('.middle img');
  const cell = document.querySelector('.cell');
  const cellWidth = cell.offsetWidth;
  const cellSize = cellWidth;
  middleImg.style.left = `${arr[0] * cellSize}px`;
  middleImg.style.bottom = `${arr[1] * cellSize}px`;
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

  const toAdd = `${letters[arr[0]]}${arr[1] + 1}`;
  const display = document.querySelector('.timer-screen h2');
  display.textContent += ` ${toAdd}`;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createDom);


/***/ }),

/***/ "./src/modules/travails.js":
/*!*********************************!*\
  !*** ./src/modules/travails.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   moveKnight: () => (/* binding */ moveKnight)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/modules/dom.js");
/* eslint-disable func-names */
/* eslint-disable no-alert */
/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-loop-func */
/* eslint-disable no-plusplus */
/* eslint-disable no-constructor-return */



class Node {
  constructor(position, path) {
    if (position[0] > 7 || position[0] < 0 || position[1] > 7 || position[1] < 0) {
      return null;
    }
    this.position = position;
    this.path = path;
  }
}

function moveKnight(start = [], target = []) {
  if (start.length !== 2 || target.length !== 2) {
    alert('Please place your knight first');
    return;
  }
  const node = new Node(start, [start]);
  const q = [node];
  let currentNode = q.shift();

  while (currentNode.position[0] !== target[0] || currentNode.position[1] !== target[1]) {
    const allMoves = [
      [currentNode.position[0] + 1, currentNode.position[1] - 2],
      [currentNode.position[0] + 2, currentNode.position[1] - 1],
      [currentNode.position[0] + 2, currentNode.position[1] + 1],
      [currentNode.position[0] + 1, currentNode.position[1] + 2],
      [currentNode.position[0] - 1, currentNode.position[1] + 2],
      [currentNode.position[0] - 2, currentNode.position[1] + 1],
      [currentNode.position[0] - 2, currentNode.position[1] - 1],
      [currentNode.position[0] - 1, currentNode.position[1] - 2],
    ];

    allMoves.forEach((move) => {
      const newNode = new Node(move, currentNode.path.concat([move]));

      if (newNode.position) {
        q.push(newNode);
      }
    });

    currentNode = q.shift();
  }

  for (let i = 0; i < currentNode.path.length; i++) {
    (function (index) {
      setTimeout(() => {
        (0,_dom__WEBPACK_IMPORTED_MODULE_0__.moveFigure)(currentNode.path[index]);
      }, i * 600);
    }(i));
  }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/dom */ "./src/modules/dom.js");


(0,_modules_dom__WEBPACK_IMPORTED_MODULE_0__["default"])();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7O0FBRXdDOztBQUV4QztBQUNBO0FBQ0Esb0JBQW9CLFVBQVU7QUFDOUIsc0JBQXNCLFVBQVU7QUFDaEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7O0FBRUE7QUFDQSxtQ0FBbUMsSUFBSSxHQUFHLElBQUk7QUFDOUM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSx1Q0FBdUMsUUFBUTtBQUMvQztBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0Isd0JBQXdCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtCQUFrQixPQUFPO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtCQUFrQixRQUFRO0FBQzFCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLElBQUkscURBQVU7QUFDZDtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixrQkFBa0I7QUFDOUMsOEJBQThCLGtCQUFrQjtBQUNoRDs7QUFFQSxtQkFBbUIsZ0JBQWdCLEVBQUUsV0FBVztBQUNoRDtBQUNBLDZCQUE2QixNQUFNO0FBQ25DOztBQUVBLGlFQUFlLFNBQVMsRUFBQzs7Ozs7Ozs7Ozs7Ozs7OztBQzNKekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRW1DOztBQUVuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBLGtCQUFrQiw2QkFBNkI7QUFDL0M7QUFDQTtBQUNBLFFBQVEsZ0RBQVU7QUFDbEIsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBOzs7Ozs7O1VDM0RBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOc0M7O0FBRXRDLHdEQUFTIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8va25pZ2h0cy10cmF2YWlscy8uL3NyYy9tb2R1bGVzL2RvbS5qcyIsIndlYnBhY2s6Ly9rbmlnaHRzLXRyYXZhaWxzLy4vc3JjL21vZHVsZXMvdHJhdmFpbHMuanMiLCJ3ZWJwYWNrOi8va25pZ2h0cy10cmF2YWlscy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9rbmlnaHRzLXRyYXZhaWxzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9rbmlnaHRzLXRyYXZhaWxzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8va25pZ2h0cy10cmF2YWlscy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2tuaWdodHMtdHJhdmFpbHMvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbm8tYWxlcnQgKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVzZS1iZWZvcmUtZGVmaW5lICovXG4vKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tY3ljbGUgKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXBsdXNwbHVzICovXG5cbmltcG9ydCB7IG1vdmVLbmlnaHQgfSBmcm9tICcuL3RyYXZhaWxzJztcblxuZnVuY3Rpb24gY3JlYXRlRG9tKCkge1xuICBjb25zdCBnYW1lQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZS1ib2FyZCcpO1xuICBmb3IgKGxldCByb3cgPSA4OyByb3cgPj0gMTsgcm93LS0pIHtcbiAgICBmb3IgKGxldCBjb2wgPSAxOyBjb2wgPD0gODsgY29sKyspIHtcbiAgICAgIGNvbnN0IHNxdWFyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICBpZiAoKHJvdyAlIDIgPT09IDAgJiYgY29sICUgMiAhPT0gMClcbiAgICAgICAgfHwgKHJvdyAlIDIgIT09IDAgJiYgY29sICUgMiA9PT0gMCkpIHtcbiAgICAgICAgc3F1YXJlLnN0eWxlLmJhY2tncm91bmQgPSAnYmxhY2snO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3F1YXJlLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICd3aGl0ZSc7XG4gICAgICB9XG5cbiAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKCdjZWxsJyk7XG4gICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChgY2VsbC0ke3Jvd30tJHtjb2x9YCk7XG4gICAgICBnYW1lQm9hcmQuYXBwZW5kQ2hpbGQoc3F1YXJlKTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBsZXR0ZXJNYXJrcyA9IFsnQScsICdCJywgJ0MnLCAnRCcsICdFJywgJ0YnLCAnRycsICdIJ107XG4gIGNvbnN0IGxldHRlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubGV0dGVycycpO1xuICBjb25zdCBudW1iZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm51bWJlcnMnKTtcblxuICBmb3IgKGxldCBpID0gbGV0dGVyTWFya3MubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICBjb25zdCBsZXR0ZXJTcGFjZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBsZXR0ZXJTcGFjZS50ZXh0Q29udGVudCA9IGxldHRlck1hcmtzW2ldO1xuICAgIGxldHRlcnNbMF0uYXBwZW5kQ2hpbGQobGV0dGVyU3BhY2UpO1xuICB9XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZXR0ZXJNYXJrcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGxldHRlclNwYWNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIGxldHRlclNwYWNlLnRleHRDb250ZW50ID0gbGV0dGVyTWFya3NbaV07XG4gICAgbGV0dGVyc1sxXS5hcHBlbmRDaGlsZChsZXR0ZXJTcGFjZSk7XG4gIH1cblxuICBmb3IgKGxldCBpID0gMTsgaSA8IDk7IGkrKykge1xuICAgIGNvbnN0IG51bWJlclNwYWNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIG51bWJlclNwYWNlLnRleHRDb250ZW50ID0gaTtcbiAgICBudW1iZXJzWzFdLmFwcGVuZENoaWxkKG51bWJlclNwYWNlKTtcbiAgfVxuXG4gIGZvciAobGV0IGkgPSA4OyBpID49IDE7IGktLSkge1xuICAgIGNvbnN0IG51bWJlclNwYWNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIG51bWJlclNwYWNlLnRleHRDb250ZW50ID0gaTtcbiAgICBudW1iZXJzWzBdLmFwcGVuZENoaWxkKG51bWJlclNwYWNlKTtcbiAgfVxuXG4gIGxldCBpc0Nob29zaW5nU3RhcnQgPSBmYWxzZTtcbiAgbGV0IGlzQ2hvb3NpbmdFbmQgPSBmYWxzZTtcbiAgY29uc3QgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gIGltZy5zcmMgPSAnaW1hZ2VzL2tuaWdodC1maWd1cmUtMkQucG5nJztcbiAgY29uc3Qgc2NyZWVuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRpbWVyLXNjcmVlbiBoMicpO1xuICBjb25zdCBrbmlnaHRQbGFjZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGFjZS1rbmlnaHQnKTtcbiAgY29uc3QgZW5kUGxhY2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0LWVuZCcpO1xuICBjb25zdCBidXR0b25Nb3ZlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRyYXZhaWwnKTtcbiAgY29uc3QgcmVzZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVzZXQnKTtcbiAgbGV0IGRhdGEgPSBbXTtcblxuICBrbmlnaHRQbGFjZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBpc0Nob29zaW5nU3RhcnQgPSB0cnVlO1xuICAgIGtuaWdodFBsYWNlLmRpc2FibGVkID0gdHJ1ZTtcbiAgICBzY3JlZW4udGV4dENvbnRlbnQgPSAnU2VsZWN0IG9uZSBmaWVsZCc7XG4gIH0pO1xuXG4gIGVuZFBsYWNlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGlzQ2hvb3NpbmdFbmQgPSB0cnVlO1xuICAgIGVuZFBsYWNlLmRpc2FibGVkID0gdHJ1ZTtcbiAgICBzY3JlZW4udGV4dENvbnRlbnQgPSAnU2VsZWN0IG9uZSBmaWVsZCc7XG4gIH0pO1xuXG4gIHJlc2V0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGlzQ2hvb3NpbmdFbmQgPSBmYWxzZTtcbiAgICBpc0Nob29zaW5nU3RhcnQgPSBmYWxzZTtcbiAgICBlbmRQbGFjZS5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIGtuaWdodFBsYWNlLmRpc2FibGVkID0gZmFsc2U7XG4gICAgZGF0YSA9IFtdO1xuICAgIHNjcmVlbi50ZXh0Q29udGVudCA9ICcnO1xuICAgIGNvbnN0IGltYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmtuaWdodC1maWd1cmUnKTtcbiAgICBpZiAoaW1hZ2UpIHtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lLWJvYXJkJykucmVtb3ZlQ2hpbGQoaW1hZ2UpO1xuICAgIH1cbiAgfSk7XG5cbiAgYnV0dG9uTW92ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBzY3JlZW4udGV4dENvbnRlbnQgPSAnJztcbiAgICBtb3ZlS25pZ2h0KGRhdGFbMF0sIGRhdGFbMV0pO1xuICAgIGRhdGEgPSBbXTtcbiAgfSk7XG5cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgIGlmIChpc0Nob29zaW5nU3RhcnQpIHtcbiAgICAgIGNvbnN0IGNsaWNrZWRFbGVtZW50ID0gZS50YXJnZXQ7XG4gICAgICBjb25zdCBjbGFzc2VzID0gY2xpY2tlZEVsZW1lbnQuY2xhc3NMaXN0O1xuXG4gICAgICBpZiAoY2xhc3Nlcy5jb250YWlucygnY2VsbCcpKSB7XG4gICAgICAgIHNjcmVlbi50ZXh0Q29udGVudCA9ICcnO1xuICAgICAgICBpc0Nob29zaW5nU3RhcnQgPSBmYWxzZTtcbiAgICAgICAga25pZ2h0UGxhY2UuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgY29uc3QgbnVtQ2xhc3MgPSBjbGFzc2VzWzFdO1xuICAgICAgICBpbWcuY2xhc3NMaXN0LmFkZCgna25pZ2h0LWZpZ3VyZScpO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZS1ib2FyZCcpLmFwcGVuZENoaWxkKGltZyk7XG4gICAgICAgIGNvbnN0IG51bXNPbmx5ID0gbnVtQ2xhc3Muc3BsaXQoJy0nKTtcbiAgICAgICAgY29uc3Qgcm93TnVtID0gbnVtc09ubHlbMV0gLSAxO1xuICAgICAgICBjb25zdCBjb2xOdW0gPSBudW1zT25seVsyXSAtIDE7XG4gICAgICAgIGNvbnN0IGZ1bGxMb2NhdGlvbiA9IFtjb2xOdW0sIHJvd051bV07XG4gICAgICAgIG1vdmVGaWd1cmUoZnVsbExvY2F0aW9uKTtcbiAgICAgICAgZGF0YS5zaGlmdCgpO1xuICAgICAgICBkYXRhLnVuc2hpZnQoZnVsbExvY2F0aW9uKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzQ2hvb3NpbmdFbmQpIHtcbiAgICAgIGNvbnN0IGNsaWNrZWRFbGVtZW50ID0gZS50YXJnZXQ7XG4gICAgICBjb25zdCBjbGFzc2VzID0gY2xpY2tlZEVsZW1lbnQuY2xhc3NMaXN0O1xuXG4gICAgICBpZiAoY2xhc3Nlcy5jb250YWlucygnY2VsbCcpKSB7XG4gICAgICAgIHNjcmVlbi50ZXh0Q29udGVudCA9ICdQcmVzcyB0cmF2YWlsJztcbiAgICAgICAgaXNDaG9vc2luZ0VuZCA9IGZhbHNlO1xuICAgICAgICBlbmRQbGFjZS5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICBjb25zdCBudW1DbGFzcyA9IGNsYXNzZXNbMV07XG4gICAgICAgIGNvbnN0IG51bXNPbmx5ID0gbnVtQ2xhc3Muc3BsaXQoJy0nKTtcbiAgICAgICAgY29uc3Qgcm93TnVtID0gbnVtc09ubHlbMV0gLSAxO1xuICAgICAgICBjb25zdCBjb2xOdW0gPSBudW1zT25seVsyXSAtIDE7XG4gICAgICAgIGNvbnN0IGZ1bGxMb2NhdGlvbiA9IFtjb2xOdW0sIHJvd051bV07XG4gICAgICAgIGlmIChkYXRhLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgIGRhdGEucG9wKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBhbGVydCgnUGxlYXNlIHBsYWNlIHlvdXIga25pZ2h0IGZpcnN0Jyk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGRhdGEucHVzaChmdWxsTG9jYXRpb24pO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtb3ZlRmlndXJlKGFycikge1xuICBjb25zdCBtaWRkbGVJbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWlkZGxlIGltZycpO1xuICBjb25zdCBjZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNlbGwnKTtcbiAgY29uc3QgY2VsbFdpZHRoID0gY2VsbC5vZmZzZXRXaWR0aDtcbiAgY29uc3QgY2VsbFNpemUgPSBjZWxsV2lkdGg7XG4gIG1pZGRsZUltZy5zdHlsZS5sZWZ0ID0gYCR7YXJyWzBdICogY2VsbFNpemV9cHhgO1xuICBtaWRkbGVJbWcuc3R5bGUuYm90dG9tID0gYCR7YXJyWzFdICogY2VsbFNpemV9cHhgO1xuICBjb25zdCBsZXR0ZXJzID0gWydBJywgJ0InLCAnQycsICdEJywgJ0UnLCAnRicsICdHJywgJ0gnXTtcblxuICBjb25zdCB0b0FkZCA9IGAke2xldHRlcnNbYXJyWzBdXX0ke2FyclsxXSArIDF9YDtcbiAgY29uc3QgZGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50aW1lci1zY3JlZW4gaDInKTtcbiAgZGlzcGxheS50ZXh0Q29udGVudCArPSBgICR7dG9BZGR9YDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlRG9tO1xuIiwiLyogZXNsaW50LWRpc2FibGUgZnVuYy1uYW1lcyAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tYWxlcnQgKi9cbi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby1jeWNsZSAqL1xuLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L3ByZWZlci1kZWZhdWx0LWV4cG9ydCAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tbG9vcC1mdW5jICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wbHVzcGx1cyAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tY29uc3RydWN0b3ItcmV0dXJuICovXG5cbmltcG9ydCB7IG1vdmVGaWd1cmUgfSBmcm9tICcuL2RvbSc7XG5cbmNsYXNzIE5vZGUge1xuICBjb25zdHJ1Y3Rvcihwb3NpdGlvbiwgcGF0aCkge1xuICAgIGlmIChwb3NpdGlvblswXSA+IDcgfHwgcG9zaXRpb25bMF0gPCAwIHx8IHBvc2l0aW9uWzFdID4gNyB8fCBwb3NpdGlvblsxXSA8IDApIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XG4gICAgdGhpcy5wYXRoID0gcGF0aDtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbW92ZUtuaWdodChzdGFydCA9IFtdLCB0YXJnZXQgPSBbXSkge1xuICBpZiAoc3RhcnQubGVuZ3RoICE9PSAyIHx8IHRhcmdldC5sZW5ndGggIT09IDIpIHtcbiAgICBhbGVydCgnUGxlYXNlIHBsYWNlIHlvdXIga25pZ2h0IGZpcnN0Jyk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IG5vZGUgPSBuZXcgTm9kZShzdGFydCwgW3N0YXJ0XSk7XG4gIGNvbnN0IHEgPSBbbm9kZV07XG4gIGxldCBjdXJyZW50Tm9kZSA9IHEuc2hpZnQoKTtcblxuICB3aGlsZSAoY3VycmVudE5vZGUucG9zaXRpb25bMF0gIT09IHRhcmdldFswXSB8fCBjdXJyZW50Tm9kZS5wb3NpdGlvblsxXSAhPT0gdGFyZ2V0WzFdKSB7XG4gICAgY29uc3QgYWxsTW92ZXMgPSBbXG4gICAgICBbY3VycmVudE5vZGUucG9zaXRpb25bMF0gKyAxLCBjdXJyZW50Tm9kZS5wb3NpdGlvblsxXSAtIDJdLFxuICAgICAgW2N1cnJlbnROb2RlLnBvc2l0aW9uWzBdICsgMiwgY3VycmVudE5vZGUucG9zaXRpb25bMV0gLSAxXSxcbiAgICAgIFtjdXJyZW50Tm9kZS5wb3NpdGlvblswXSArIDIsIGN1cnJlbnROb2RlLnBvc2l0aW9uWzFdICsgMV0sXG4gICAgICBbY3VycmVudE5vZGUucG9zaXRpb25bMF0gKyAxLCBjdXJyZW50Tm9kZS5wb3NpdGlvblsxXSArIDJdLFxuICAgICAgW2N1cnJlbnROb2RlLnBvc2l0aW9uWzBdIC0gMSwgY3VycmVudE5vZGUucG9zaXRpb25bMV0gKyAyXSxcbiAgICAgIFtjdXJyZW50Tm9kZS5wb3NpdGlvblswXSAtIDIsIGN1cnJlbnROb2RlLnBvc2l0aW9uWzFdICsgMV0sXG4gICAgICBbY3VycmVudE5vZGUucG9zaXRpb25bMF0gLSAyLCBjdXJyZW50Tm9kZS5wb3NpdGlvblsxXSAtIDFdLFxuICAgICAgW2N1cnJlbnROb2RlLnBvc2l0aW9uWzBdIC0gMSwgY3VycmVudE5vZGUucG9zaXRpb25bMV0gLSAyXSxcbiAgICBdO1xuXG4gICAgYWxsTW92ZXMuZm9yRWFjaCgobW92ZSkgPT4ge1xuICAgICAgY29uc3QgbmV3Tm9kZSA9IG5ldyBOb2RlKG1vdmUsIGN1cnJlbnROb2RlLnBhdGguY29uY2F0KFttb3ZlXSkpO1xuXG4gICAgICBpZiAobmV3Tm9kZS5wb3NpdGlvbikge1xuICAgICAgICBxLnB1c2gobmV3Tm9kZSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjdXJyZW50Tm9kZSA9IHEuc2hpZnQoKTtcbiAgfVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY3VycmVudE5vZGUucGF0aC5sZW5ndGg7IGkrKykge1xuICAgIChmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBtb3ZlRmlndXJlKGN1cnJlbnROb2RlLnBhdGhbaW5kZXhdKTtcbiAgICAgIH0sIGkgKiA2MDApO1xuICAgIH0oaSkpO1xuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBjcmVhdGVEb20gZnJvbSAnLi9tb2R1bGVzL2RvbSc7XG5cbmNyZWF0ZURvbSgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9