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
    document.querySelector('.game-board').removeChild(image);
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
  const cellSize = 52;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7O0FBRXdDOztBQUV4QztBQUNBO0FBQ0Esb0JBQW9CLFVBQVU7QUFDOUIsc0JBQXNCLFVBQVU7QUFDaEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7O0FBRUE7QUFDQSxtQ0FBbUMsSUFBSSxHQUFHLElBQUk7QUFDOUM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSx1Q0FBdUMsUUFBUTtBQUMvQztBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0Isd0JBQXdCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtCQUFrQixPQUFPO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtCQUFrQixRQUFRO0FBQzFCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsSUFBSSxxREFBVTtBQUNkO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFTztBQUNQO0FBQ0E7QUFDQSw0QkFBNEIsa0JBQWtCO0FBQzlDLDhCQUE4QixrQkFBa0I7QUFDaEQ7O0FBRUEsbUJBQW1CLGdCQUFnQixFQUFFLFdBQVc7QUFDaEQ7QUFDQSw2QkFBNkIsTUFBTTtBQUNuQzs7QUFFQSxpRUFBZSxTQUFTLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2SnpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVtQzs7QUFFbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQSxrQkFBa0IsNkJBQTZCO0FBQy9DO0FBQ0E7QUFDQSxRQUFRLGdEQUFVO0FBQ2xCLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTs7Ozs7OztVQzNEQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTnNDOztBQUV0Qyx3REFBUyIsInNvdXJjZXMiOlsid2VicGFjazovL2tuaWdodHMtdHJhdmFpbHMvLi9zcmMvbW9kdWxlcy9kb20uanMiLCJ3ZWJwYWNrOi8va25pZ2h0cy10cmF2YWlscy8uL3NyYy9tb2R1bGVzL3RyYXZhaWxzLmpzIiwid2VicGFjazovL2tuaWdodHMtdHJhdmFpbHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8va25pZ2h0cy10cmF2YWlscy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8va25pZ2h0cy10cmF2YWlscy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2tuaWdodHMtdHJhdmFpbHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9rbmlnaHRzLXRyYXZhaWxzLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIG5vLWFsZXJ0ICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11c2UtYmVmb3JlLWRlZmluZSAqL1xuLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLWN5Y2xlICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wbHVzcGx1cyAqL1xuXG5pbXBvcnQgeyBtb3ZlS25pZ2h0IH0gZnJvbSAnLi90cmF2YWlscyc7XG5cbmZ1bmN0aW9uIGNyZWF0ZURvbSgpIHtcbiAgY29uc3QgZ2FtZUJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWUtYm9hcmQnKTtcbiAgZm9yIChsZXQgcm93ID0gODsgcm93ID49IDE7IHJvdy0tKSB7XG4gICAgZm9yIChsZXQgY29sID0gMTsgY29sIDw9IDg7IGNvbCsrKSB7XG4gICAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgaWYgKChyb3cgJSAyID09PSAwICYmIGNvbCAlIDIgIT09IDApXG4gICAgICAgIHx8IChyb3cgJSAyICE9PSAwICYmIGNvbCAlIDIgPT09IDApKSB7XG4gICAgICAgIHNxdWFyZS5zdHlsZS5iYWNrZ3JvdW5kID0gJ2JsYWNrJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNxdWFyZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnd2hpdGUnO1xuICAgICAgfVxuXG4gICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZCgnY2VsbCcpO1xuICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoYGNlbGwtJHtyb3d9LSR7Y29sfWApO1xuICAgICAgZ2FtZUJvYXJkLmFwcGVuZENoaWxkKHNxdWFyZSk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgbGV0dGVyTWFya3MgPSBbJ0EnLCAnQicsICdDJywgJ0QnLCAnRScsICdGJywgJ0cnLCAnSCddO1xuICBjb25zdCBsZXR0ZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmxldHRlcnMnKTtcbiAgY29uc3QgbnVtYmVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5udW1iZXJzJyk7XG5cbiAgZm9yIChsZXQgaSA9IGxldHRlck1hcmtzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgY29uc3QgbGV0dGVyU3BhY2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgbGV0dGVyU3BhY2UudGV4dENvbnRlbnQgPSBsZXR0ZXJNYXJrc1tpXTtcbiAgICBsZXR0ZXJzWzBdLmFwcGVuZENoaWxkKGxldHRlclNwYWNlKTtcbiAgfVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGV0dGVyTWFya3MubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBsZXR0ZXJTcGFjZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBsZXR0ZXJTcGFjZS50ZXh0Q29udGVudCA9IGxldHRlck1hcmtzW2ldO1xuICAgIGxldHRlcnNbMV0uYXBwZW5kQ2hpbGQobGV0dGVyU3BhY2UpO1xuICB9XG5cbiAgZm9yIChsZXQgaSA9IDE7IGkgPCA5OyBpKyspIHtcbiAgICBjb25zdCBudW1iZXJTcGFjZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBudW1iZXJTcGFjZS50ZXh0Q29udGVudCA9IGk7XG4gICAgbnVtYmVyc1sxXS5hcHBlbmRDaGlsZChudW1iZXJTcGFjZSk7XG4gIH1cblxuICBmb3IgKGxldCBpID0gODsgaSA+PSAxOyBpLS0pIHtcbiAgICBjb25zdCBudW1iZXJTcGFjZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBudW1iZXJTcGFjZS50ZXh0Q29udGVudCA9IGk7XG4gICAgbnVtYmVyc1swXS5hcHBlbmRDaGlsZChudW1iZXJTcGFjZSk7XG4gIH1cblxuICBsZXQgaXNDaG9vc2luZ1N0YXJ0ID0gZmFsc2U7XG4gIGxldCBpc0Nob29zaW5nRW5kID0gZmFsc2U7XG4gIGNvbnN0IGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICBpbWcuc3JjID0gJ2ltYWdlcy9rbmlnaHQtZmlndXJlLTJELnBuZyc7XG4gIGNvbnN0IHNjcmVlbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50aW1lci1zY3JlZW4gaDInKTtcbiAgY29uc3Qga25pZ2h0UGxhY2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxhY2Uta25pZ2h0Jyk7XG4gIGNvbnN0IGVuZFBsYWNlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlbGVjdC1lbmQnKTtcbiAgY29uc3QgYnV0dG9uTW92ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50cmF2YWlsJyk7XG4gIGNvbnN0IHJlc2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc2V0Jyk7XG4gIGxldCBkYXRhID0gW107XG5cbiAga25pZ2h0UGxhY2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgaXNDaG9vc2luZ1N0YXJ0ID0gdHJ1ZTtcbiAgICBrbmlnaHRQbGFjZS5kaXNhYmxlZCA9IHRydWU7XG4gICAgc2NyZWVuLnRleHRDb250ZW50ID0gJ1NlbGVjdCBvbmUgZmllbGQnO1xuICB9KTtcblxuICBlbmRQbGFjZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBpc0Nob29zaW5nRW5kID0gdHJ1ZTtcbiAgICBlbmRQbGFjZS5kaXNhYmxlZCA9IHRydWU7XG4gICAgc2NyZWVuLnRleHRDb250ZW50ID0gJ1NlbGVjdCBvbmUgZmllbGQnO1xuICB9KTtcblxuICByZXNldC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBpc0Nob29zaW5nRW5kID0gZmFsc2U7XG4gICAgaXNDaG9vc2luZ1N0YXJ0ID0gZmFsc2U7XG4gICAgZW5kUGxhY2UuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICBrbmlnaHRQbGFjZS5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIGRhdGEgPSBbXTtcbiAgICBzY3JlZW4udGV4dENvbnRlbnQgPSAnJztcbiAgICBjb25zdCBpbWFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5rbmlnaHQtZmlndXJlJyk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWUtYm9hcmQnKS5yZW1vdmVDaGlsZChpbWFnZSk7XG4gIH0pO1xuXG4gIGJ1dHRvbk1vdmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgc2NyZWVuLnRleHRDb250ZW50ID0gJyc7XG4gICAgbW92ZUtuaWdodChkYXRhWzBdLCBkYXRhWzFdKTtcbiAgICBkYXRhID0gW107XG4gIH0pO1xuXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICBpZiAoaXNDaG9vc2luZ1N0YXJ0KSB7XG4gICAgICBjb25zdCBjbGlja2VkRWxlbWVudCA9IGUudGFyZ2V0O1xuICAgICAgY29uc3QgY2xhc3NlcyA9IGNsaWNrZWRFbGVtZW50LmNsYXNzTGlzdDtcblxuICAgICAgaWYgKGNsYXNzZXMuY29udGFpbnMoJ2NlbGwnKSkge1xuICAgICAgICBzY3JlZW4udGV4dENvbnRlbnQgPSAnJztcbiAgICAgICAgaXNDaG9vc2luZ1N0YXJ0ID0gZmFsc2U7XG4gICAgICAgIGtuaWdodFBsYWNlLmRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgIGNvbnN0IG51bUNsYXNzID0gY2xhc3Nlc1sxXTtcbiAgICAgICAgaW1nLmNsYXNzTGlzdC5hZGQoJ2tuaWdodC1maWd1cmUnKTtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWUtYm9hcmQnKS5hcHBlbmRDaGlsZChpbWcpO1xuICAgICAgICBjb25zdCBudW1zT25seSA9IG51bUNsYXNzLnNwbGl0KCctJyk7XG4gICAgICAgIGNvbnN0IHJvd051bSA9IG51bXNPbmx5WzFdIC0gMTtcbiAgICAgICAgY29uc3QgY29sTnVtID0gbnVtc09ubHlbMl0gLSAxO1xuICAgICAgICBjb25zdCBmdWxsTG9jYXRpb24gPSBbY29sTnVtLCByb3dOdW1dO1xuICAgICAgICBtb3ZlRmlndXJlKGZ1bGxMb2NhdGlvbik7XG4gICAgICAgIGRhdGEuc2hpZnQoKTtcbiAgICAgICAgZGF0YS51bnNoaWZ0KGZ1bGxMb2NhdGlvbik7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChpc0Nob29zaW5nRW5kKSB7XG4gICAgICBjb25zdCBjbGlja2VkRWxlbWVudCA9IGUudGFyZ2V0O1xuICAgICAgY29uc3QgY2xhc3NlcyA9IGNsaWNrZWRFbGVtZW50LmNsYXNzTGlzdDtcblxuICAgICAgaWYgKGNsYXNzZXMuY29udGFpbnMoJ2NlbGwnKSkge1xuICAgICAgICBzY3JlZW4udGV4dENvbnRlbnQgPSAnUHJlc3MgdHJhdmFpbCc7XG4gICAgICAgIGlzQ2hvb3NpbmdFbmQgPSBmYWxzZTtcbiAgICAgICAgZW5kUGxhY2UuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgY29uc3QgbnVtQ2xhc3MgPSBjbGFzc2VzWzFdO1xuICAgICAgICBjb25zdCBudW1zT25seSA9IG51bUNsYXNzLnNwbGl0KCctJyk7XG4gICAgICAgIGNvbnN0IHJvd051bSA9IG51bXNPbmx5WzFdIC0gMTtcbiAgICAgICAgY29uc3QgY29sTnVtID0gbnVtc09ubHlbMl0gLSAxO1xuICAgICAgICBjb25zdCBmdWxsTG9jYXRpb24gPSBbY29sTnVtLCByb3dOdW1dO1xuICAgICAgICBpZiAoZGF0YS5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICBkYXRhLnBvcCgpO1xuICAgICAgICB9IGVsc2UgaWYgKGRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgYWxlcnQoJ1BsZWFzZSBwbGFjZSB5b3VyIGtuaWdodCBmaXJzdCcpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBkYXRhLnB1c2goZnVsbExvY2F0aW9uKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbW92ZUZpZ3VyZShhcnIpIHtcbiAgY29uc3QgbWlkZGxlSW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1pZGRsZSBpbWcnKTtcbiAgY29uc3QgY2VsbFNpemUgPSA1MjtcbiAgbWlkZGxlSW1nLnN0eWxlLmxlZnQgPSBgJHthcnJbMF0gKiBjZWxsU2l6ZX1weGA7XG4gIG1pZGRsZUltZy5zdHlsZS5ib3R0b20gPSBgJHthcnJbMV0gKiBjZWxsU2l6ZX1weGA7XG4gIGNvbnN0IGxldHRlcnMgPSBbJ0EnLCAnQicsICdDJywgJ0QnLCAnRScsICdGJywgJ0cnLCAnSCddO1xuXG4gIGNvbnN0IHRvQWRkID0gYCR7bGV0dGVyc1thcnJbMF1dfSR7YXJyWzFdICsgMX1gO1xuICBjb25zdCBkaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRpbWVyLXNjcmVlbiBoMicpO1xuICBkaXNwbGF5LnRleHRDb250ZW50ICs9IGAgJHt0b0FkZH1gO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVEb207XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBmdW5jLW5hbWVzICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1hbGVydCAqL1xuLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLWN5Y2xlICovXG4vKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvcHJlZmVyLWRlZmF1bHQtZXhwb3J0ICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1sb29wLWZ1bmMgKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXBsdXNwbHVzICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zdHJ1Y3Rvci1yZXR1cm4gKi9cblxuaW1wb3J0IHsgbW92ZUZpZ3VyZSB9IGZyb20gJy4vZG9tJztcblxuY2xhc3MgTm9kZSB7XG4gIGNvbnN0cnVjdG9yKHBvc2l0aW9uLCBwYXRoKSB7XG4gICAgaWYgKHBvc2l0aW9uWzBdID4gNyB8fCBwb3NpdGlvblswXSA8IDAgfHwgcG9zaXRpb25bMV0gPiA3IHx8IHBvc2l0aW9uWzFdIDwgMCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcbiAgICB0aGlzLnBhdGggPSBwYXRoO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtb3ZlS25pZ2h0KHN0YXJ0ID0gW10sIHRhcmdldCA9IFtdKSB7XG4gIGlmIChzdGFydC5sZW5ndGggIT09IDIgfHwgdGFyZ2V0Lmxlbmd0aCAhPT0gMikge1xuICAgIGFsZXJ0KCdQbGVhc2UgcGxhY2UgeW91ciBrbmlnaHQgZmlyc3QnKTtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3Qgbm9kZSA9IG5ldyBOb2RlKHN0YXJ0LCBbc3RhcnRdKTtcbiAgY29uc3QgcSA9IFtub2RlXTtcbiAgbGV0IGN1cnJlbnROb2RlID0gcS5zaGlmdCgpO1xuXG4gIHdoaWxlIChjdXJyZW50Tm9kZS5wb3NpdGlvblswXSAhPT0gdGFyZ2V0WzBdIHx8IGN1cnJlbnROb2RlLnBvc2l0aW9uWzFdICE9PSB0YXJnZXRbMV0pIHtcbiAgICBjb25zdCBhbGxNb3ZlcyA9IFtcbiAgICAgIFtjdXJyZW50Tm9kZS5wb3NpdGlvblswXSArIDEsIGN1cnJlbnROb2RlLnBvc2l0aW9uWzFdIC0gMl0sXG4gICAgICBbY3VycmVudE5vZGUucG9zaXRpb25bMF0gKyAyLCBjdXJyZW50Tm9kZS5wb3NpdGlvblsxXSAtIDFdLFxuICAgICAgW2N1cnJlbnROb2RlLnBvc2l0aW9uWzBdICsgMiwgY3VycmVudE5vZGUucG9zaXRpb25bMV0gKyAxXSxcbiAgICAgIFtjdXJyZW50Tm9kZS5wb3NpdGlvblswXSArIDEsIGN1cnJlbnROb2RlLnBvc2l0aW9uWzFdICsgMl0sXG4gICAgICBbY3VycmVudE5vZGUucG9zaXRpb25bMF0gLSAxLCBjdXJyZW50Tm9kZS5wb3NpdGlvblsxXSArIDJdLFxuICAgICAgW2N1cnJlbnROb2RlLnBvc2l0aW9uWzBdIC0gMiwgY3VycmVudE5vZGUucG9zaXRpb25bMV0gKyAxXSxcbiAgICAgIFtjdXJyZW50Tm9kZS5wb3NpdGlvblswXSAtIDIsIGN1cnJlbnROb2RlLnBvc2l0aW9uWzFdIC0gMV0sXG4gICAgICBbY3VycmVudE5vZGUucG9zaXRpb25bMF0gLSAxLCBjdXJyZW50Tm9kZS5wb3NpdGlvblsxXSAtIDJdLFxuICAgIF07XG5cbiAgICBhbGxNb3Zlcy5mb3JFYWNoKChtb3ZlKSA9PiB7XG4gICAgICBjb25zdCBuZXdOb2RlID0gbmV3IE5vZGUobW92ZSwgY3VycmVudE5vZGUucGF0aC5jb25jYXQoW21vdmVdKSk7XG5cbiAgICAgIGlmIChuZXdOb2RlLnBvc2l0aW9uKSB7XG4gICAgICAgIHEucHVzaChuZXdOb2RlKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGN1cnJlbnROb2RlID0gcS5zaGlmdCgpO1xuICB9XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjdXJyZW50Tm9kZS5wYXRoLmxlbmd0aDsgaSsrKSB7XG4gICAgKGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIG1vdmVGaWd1cmUoY3VycmVudE5vZGUucGF0aFtpbmRleF0pO1xuICAgICAgfSwgaSAqIDYwMCk7XG4gICAgfShpKSk7XG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGNyZWF0ZURvbSBmcm9tICcuL21vZHVsZXMvZG9tJztcblxuY3JlYXRlRG9tKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=