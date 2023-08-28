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
/* eslint-disable no-console */
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
    const image = document.querySelector(".knight-figure");
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
        img.classList.add("knight-figure");
        document.querySelector('.game-board').appendChild(img);
        const numsOnly = numClass.split('-');
        const rowNum = numsOnly[1] - 1;
        const colNum = numsOnly[2] - 1;
        const fullLocation = [colNum, rowNum];
        console.log(fullLocation);
        moveFigure(fullLocation);
        data.shift();
        data.unshift(fullLocation);
        console.log(data);
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
        console.log(data);
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
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
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

  console.log(`You have made it in ${currentNode.path.length - 1} moves. Your moves are:`);

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
/* harmony import */ var _modules_travails__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/travails */ "./src/modules/travails.js");



(0,_modules_dom__WEBPACK_IMPORTED_MODULE_0__["default"])();


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTs7QUFFd0M7O0FBRXhDO0FBQ0E7QUFDQSxvQkFBb0IsVUFBVTtBQUM5QixzQkFBc0IsVUFBVTtBQUNoQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTs7QUFFQTtBQUNBLG1DQUFtQyxJQUFJLEdBQUcsSUFBSTtBQUM5QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHVDQUF1QyxRQUFRO0FBQy9DO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtCQUFrQix3QkFBd0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCLE9BQU87QUFDekI7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCLFFBQVE7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsSUFBSSxxREFBVTtBQUNkO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFTztBQUNQO0FBQ0E7QUFDQSw0QkFBNEIsa0JBQWtCO0FBQzlDLDhCQUE4QixrQkFBa0I7QUFDaEQ7O0FBRUEsbUJBQW1CLGdCQUFnQixFQUFFLFdBQVc7QUFDaEQ7QUFDQSw2QkFBNkIsTUFBTTtBQUNuQzs7QUFFQSxpRUFBZSxTQUFTLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6SnpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRW1DOztBQUVuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBLHFDQUFxQyw2QkFBNkI7O0FBRWxFLGtCQUFrQiw2QkFBNkI7QUFDL0M7QUFDQTtBQUNBLFFBQVEsZ0RBQVU7QUFDbEIsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBOzs7Ozs7O1VDM0RBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTnNDO0FBQ1U7O0FBRWhELHdEQUFTIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8va25pZ2h0cy10cmF2YWlscy8uL3NyYy9tb2R1bGVzL2RvbS5qcyIsIndlYnBhY2s6Ly9rbmlnaHRzLXRyYXZhaWxzLy4vc3JjL21vZHVsZXMvdHJhdmFpbHMuanMiLCJ3ZWJwYWNrOi8va25pZ2h0cy10cmF2YWlscy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9rbmlnaHRzLXRyYXZhaWxzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9rbmlnaHRzLXRyYXZhaWxzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8va25pZ2h0cy10cmF2YWlscy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2tuaWdodHMtdHJhdmFpbHMvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tcGx1c3BsdXMgKi9cblxuaW1wb3J0IHsgbW92ZUtuaWdodCB9IGZyb20gJy4vdHJhdmFpbHMnO1xuXG5mdW5jdGlvbiBjcmVhdGVEb20oKSB7XG4gIGNvbnN0IGdhbWVCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lLWJvYXJkJyk7XG4gIGZvciAobGV0IHJvdyA9IDg7IHJvdyA+PSAxOyByb3ctLSkge1xuICAgIGZvciAobGV0IGNvbCA9IDE7IGNvbCA8PSA4OyBjb2wrKykge1xuICAgICAgY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgIGlmICgocm93ICUgMiA9PT0gMCAmJiBjb2wgJSAyICE9PSAwKVxuICAgICAgICB8fCAocm93ICUgMiAhPT0gMCAmJiBjb2wgJSAyID09PSAwKSkge1xuICAgICAgICBzcXVhcmUuc3R5bGUuYmFja2dyb3VuZCA9ICdibGFjayc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzcXVhcmUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3doaXRlJztcbiAgICAgIH1cblxuICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoJ2NlbGwnKTtcbiAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKGBjZWxsLSR7cm93fS0ke2NvbH1gKTtcbiAgICAgIGdhbWVCb2FyZC5hcHBlbmRDaGlsZChzcXVhcmUpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGxldHRlck1hcmtzID0gWydBJywgJ0InLCAnQycsICdEJywgJ0UnLCAnRicsICdHJywgJ0gnXTtcbiAgY29uc3QgbGV0dGVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5sZXR0ZXJzJyk7XG4gIGNvbnN0IG51bWJlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubnVtYmVycycpO1xuXG4gIGZvciAobGV0IGkgPSBsZXR0ZXJNYXJrcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIGNvbnN0IGxldHRlclNwYWNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIGxldHRlclNwYWNlLnRleHRDb250ZW50ID0gbGV0dGVyTWFya3NbaV07XG4gICAgbGV0dGVyc1swXS5hcHBlbmRDaGlsZChsZXR0ZXJTcGFjZSk7XG4gIH1cblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxldHRlck1hcmtzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgbGV0dGVyU3BhY2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgbGV0dGVyU3BhY2UudGV4dENvbnRlbnQgPSBsZXR0ZXJNYXJrc1tpXTtcbiAgICBsZXR0ZXJzWzFdLmFwcGVuZENoaWxkKGxldHRlclNwYWNlKTtcbiAgfVxuXG4gIGZvciAobGV0IGkgPSAxOyBpIDwgOTsgaSsrKSB7XG4gICAgY29uc3QgbnVtYmVyU3BhY2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgbnVtYmVyU3BhY2UudGV4dENvbnRlbnQgPSBpO1xuICAgIG51bWJlcnNbMV0uYXBwZW5kQ2hpbGQobnVtYmVyU3BhY2UpO1xuICB9XG5cbiAgZm9yIChsZXQgaSA9IDg7IGkgPj0gMTsgaS0tKSB7XG4gICAgY29uc3QgbnVtYmVyU3BhY2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgbnVtYmVyU3BhY2UudGV4dENvbnRlbnQgPSBpO1xuICAgIG51bWJlcnNbMF0uYXBwZW5kQ2hpbGQobnVtYmVyU3BhY2UpO1xuICB9XG5cbiAgbGV0IGlzQ2hvb3NpbmdTdGFydCA9IGZhbHNlO1xuICBsZXQgaXNDaG9vc2luZ0VuZCA9IGZhbHNlO1xuICBjb25zdCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgaW1nLnNyYyA9ICdpbWFnZXMva25pZ2h0LWZpZ3VyZS0yRC5wbmcnO1xuICBjb25zdCBzY3JlZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGltZXItc2NyZWVuIGgyJyk7XG4gIGNvbnN0IGtuaWdodFBsYWNlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYWNlLWtuaWdodCcpO1xuICBjb25zdCBlbmRQbGFjZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3QtZW5kJyk7XG4gIGNvbnN0IGJ1dHRvbk1vdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudHJhdmFpbCcpO1xuICBjb25zdCByZXNldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXNldCcpO1xuICBsZXQgZGF0YSA9IFtdO1xuXG4gIGtuaWdodFBsYWNlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGlzQ2hvb3NpbmdTdGFydCA9IHRydWU7XG4gICAga25pZ2h0UGxhY2UuZGlzYWJsZWQgPSB0cnVlO1xuICAgIHNjcmVlbi50ZXh0Q29udGVudCA9ICdTZWxlY3Qgb25lIGZpZWxkJztcbiAgfSk7XG5cbiAgZW5kUGxhY2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgaXNDaG9vc2luZ0VuZCA9IHRydWU7XG4gICAgZW5kUGxhY2UuZGlzYWJsZWQgPSB0cnVlO1xuICAgIHNjcmVlbi50ZXh0Q29udGVudCA9ICdTZWxlY3Qgb25lIGZpZWxkJztcbiAgfSk7XG5cbiAgcmVzZXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgaXNDaG9vc2luZ0VuZCA9IGZhbHNlO1xuICAgIGlzQ2hvb3NpbmdTdGFydCA9IGZhbHNlO1xuICAgIGVuZFBsYWNlLmRpc2FibGVkID0gZmFsc2U7XG4gICAga25pZ2h0UGxhY2UuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICBkYXRhID0gW107XG4gICAgc2NyZWVuLnRleHRDb250ZW50ID0gJyc7XG4gICAgY29uc3QgaW1hZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmtuaWdodC1maWd1cmVcIik7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWUtYm9hcmQnKS5yZW1vdmVDaGlsZChpbWFnZSk7XG5cbiAgfSk7XG5cbiAgYnV0dG9uTW92ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBzY3JlZW4udGV4dENvbnRlbnQgPSAnJztcbiAgICBtb3ZlS25pZ2h0KGRhdGFbMF0sIGRhdGFbMV0pO1xuICAgIGRhdGEgPSBbXTtcbiAgfSk7XG5cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgIGlmIChpc0Nob29zaW5nU3RhcnQpIHtcbiAgICAgIGNvbnN0IGNsaWNrZWRFbGVtZW50ID0gZS50YXJnZXQ7XG4gICAgICBjb25zdCBjbGFzc2VzID0gY2xpY2tlZEVsZW1lbnQuY2xhc3NMaXN0O1xuXG4gICAgICBpZiAoY2xhc3Nlcy5jb250YWlucygnY2VsbCcpKSB7XG4gICAgICAgIHNjcmVlbi50ZXh0Q29udGVudCA9ICcnO1xuICAgICAgICBpc0Nob29zaW5nU3RhcnQgPSBmYWxzZTtcbiAgICAgICAga25pZ2h0UGxhY2UuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgY29uc3QgbnVtQ2xhc3MgPSBjbGFzc2VzWzFdO1xuICAgICAgICBpbWcuY2xhc3NMaXN0LmFkZChcImtuaWdodC1maWd1cmVcIik7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lLWJvYXJkJykuYXBwZW5kQ2hpbGQoaW1nKTtcbiAgICAgICAgY29uc3QgbnVtc09ubHkgPSBudW1DbGFzcy5zcGxpdCgnLScpO1xuICAgICAgICBjb25zdCByb3dOdW0gPSBudW1zT25seVsxXSAtIDE7XG4gICAgICAgIGNvbnN0IGNvbE51bSA9IG51bXNPbmx5WzJdIC0gMTtcbiAgICAgICAgY29uc3QgZnVsbExvY2F0aW9uID0gW2NvbE51bSwgcm93TnVtXTtcbiAgICAgICAgY29uc29sZS5sb2coZnVsbExvY2F0aW9uKTtcbiAgICAgICAgbW92ZUZpZ3VyZShmdWxsTG9jYXRpb24pO1xuICAgICAgICBkYXRhLnNoaWZ0KCk7XG4gICAgICAgIGRhdGEudW5zaGlmdChmdWxsTG9jYXRpb24pO1xuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzQ2hvb3NpbmdFbmQpIHtcbiAgICAgIGNvbnN0IGNsaWNrZWRFbGVtZW50ID0gZS50YXJnZXQ7XG4gICAgICBjb25zdCBjbGFzc2VzID0gY2xpY2tlZEVsZW1lbnQuY2xhc3NMaXN0O1xuXG4gICAgICBpZiAoY2xhc3Nlcy5jb250YWlucygnY2VsbCcpKSB7XG4gICAgICAgIHNjcmVlbi50ZXh0Q29udGVudCA9ICdQcmVzcyB0cmF2YWlsJztcbiAgICAgICAgaXNDaG9vc2luZ0VuZCA9IGZhbHNlO1xuICAgICAgICBlbmRQbGFjZS5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICBjb25zdCBudW1DbGFzcyA9IGNsYXNzZXNbMV07XG4gICAgICAgIGNvbnN0IG51bXNPbmx5ID0gbnVtQ2xhc3Muc3BsaXQoJy0nKTtcbiAgICAgICAgY29uc3Qgcm93TnVtID0gbnVtc09ubHlbMV0gLSAxO1xuICAgICAgICBjb25zdCBjb2xOdW0gPSBudW1zT25seVsyXSAtIDE7XG4gICAgICAgIGNvbnN0IGZ1bGxMb2NhdGlvbiA9IFtjb2xOdW0sIHJvd051bV07XG4gICAgICAgIGlmIChkYXRhLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgIGRhdGEucG9wKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBhbGVydCgnUGxlYXNlIHBsYWNlIHlvdXIga25pZ2h0IGZpcnN0Jyk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGRhdGEucHVzaChmdWxsTG9jYXRpb24pO1xuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbW92ZUZpZ3VyZShhcnIpIHtcbiAgY29uc3QgbWlkZGxlSW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1pZGRsZSBpbWcnKTtcbiAgY29uc3QgY2VsbFNpemUgPSA1MjtcbiAgbWlkZGxlSW1nLnN0eWxlLmxlZnQgPSBgJHthcnJbMF0gKiBjZWxsU2l6ZX1weGA7XG4gIG1pZGRsZUltZy5zdHlsZS5ib3R0b20gPSBgJHthcnJbMV0gKiBjZWxsU2l6ZX1weGA7XG4gIGNvbnN0IGxldHRlcnMgPSBbJ0EnLCAnQicsICdDJywgJ0QnLCAnRScsICdGJywgJ0cnLCAnSCddO1xuXG4gIGNvbnN0IHRvQWRkID0gYCR7bGV0dGVyc1thcnJbMF1dfSR7YXJyWzFdICsgMX1gO1xuICBjb25zdCBkaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRpbWVyLXNjcmVlbiBoMicpO1xuICBkaXNwbGF5LnRleHRDb250ZW50ICs9IGAgJHt0b0FkZH1gO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVEb207XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvcHJlZmVyLWRlZmF1bHQtZXhwb3J0ICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1sb29wLWZ1bmMgKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXBsdXNwbHVzICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zdHJ1Y3Rvci1yZXR1cm4gKi9cblxuaW1wb3J0IHsgbW92ZUZpZ3VyZSB9IGZyb20gJy4vZG9tJztcblxuY2xhc3MgTm9kZSB7XG4gIGNvbnN0cnVjdG9yKHBvc2l0aW9uLCBwYXRoKSB7XG4gICAgaWYgKHBvc2l0aW9uWzBdID4gNyB8fCBwb3NpdGlvblswXSA8IDAgfHwgcG9zaXRpb25bMV0gPiA3IHx8IHBvc2l0aW9uWzFdIDwgMCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcbiAgICB0aGlzLnBhdGggPSBwYXRoO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtb3ZlS25pZ2h0KHN0YXJ0ID0gW10sIHRhcmdldCA9IFtdKSB7XG4gIGlmIChzdGFydC5sZW5ndGggIT09IDIgfHwgdGFyZ2V0Lmxlbmd0aCAhPT0gMikge1xuICAgIGFsZXJ0KCdQbGVhc2UgcGxhY2UgeW91ciBrbmlnaHQgZmlyc3QnKTtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3Qgbm9kZSA9IG5ldyBOb2RlKHN0YXJ0LCBbc3RhcnRdKTtcbiAgY29uc3QgcSA9IFtub2RlXTtcbiAgbGV0IGN1cnJlbnROb2RlID0gcS5zaGlmdCgpO1xuXG4gIHdoaWxlIChjdXJyZW50Tm9kZS5wb3NpdGlvblswXSAhPT0gdGFyZ2V0WzBdIHx8IGN1cnJlbnROb2RlLnBvc2l0aW9uWzFdICE9PSB0YXJnZXRbMV0pIHtcbiAgICBjb25zdCBhbGxNb3ZlcyA9IFtcbiAgICAgIFtjdXJyZW50Tm9kZS5wb3NpdGlvblswXSArIDEsIGN1cnJlbnROb2RlLnBvc2l0aW9uWzFdIC0gMl0sXG4gICAgICBbY3VycmVudE5vZGUucG9zaXRpb25bMF0gKyAyLCBjdXJyZW50Tm9kZS5wb3NpdGlvblsxXSAtIDFdLFxuICAgICAgW2N1cnJlbnROb2RlLnBvc2l0aW9uWzBdICsgMiwgY3VycmVudE5vZGUucG9zaXRpb25bMV0gKyAxXSxcbiAgICAgIFtjdXJyZW50Tm9kZS5wb3NpdGlvblswXSArIDEsIGN1cnJlbnROb2RlLnBvc2l0aW9uWzFdICsgMl0sXG4gICAgICBbY3VycmVudE5vZGUucG9zaXRpb25bMF0gLSAxLCBjdXJyZW50Tm9kZS5wb3NpdGlvblsxXSArIDJdLFxuICAgICAgW2N1cnJlbnROb2RlLnBvc2l0aW9uWzBdIC0gMiwgY3VycmVudE5vZGUucG9zaXRpb25bMV0gKyAxXSxcbiAgICAgIFtjdXJyZW50Tm9kZS5wb3NpdGlvblswXSAtIDIsIGN1cnJlbnROb2RlLnBvc2l0aW9uWzFdIC0gMV0sXG4gICAgICBbY3VycmVudE5vZGUucG9zaXRpb25bMF0gLSAxLCBjdXJyZW50Tm9kZS5wb3NpdGlvblsxXSAtIDJdLFxuICAgIF07XG5cbiAgICBhbGxNb3Zlcy5mb3JFYWNoKChtb3ZlKSA9PiB7XG4gICAgICBjb25zdCBuZXdOb2RlID0gbmV3IE5vZGUobW92ZSwgY3VycmVudE5vZGUucGF0aC5jb25jYXQoW21vdmVdKSk7XG5cbiAgICAgIGlmIChuZXdOb2RlLnBvc2l0aW9uKSB7XG4gICAgICAgIHEucHVzaChuZXdOb2RlKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGN1cnJlbnROb2RlID0gcS5zaGlmdCgpO1xuICB9XG5cbiAgY29uc29sZS5sb2coYFlvdSBoYXZlIG1hZGUgaXQgaW4gJHtjdXJyZW50Tm9kZS5wYXRoLmxlbmd0aCAtIDF9IG1vdmVzLiBZb3VyIG1vdmVzIGFyZTpgKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGN1cnJlbnROb2RlLnBhdGgubGVuZ3RoOyBpKyspIHtcbiAgICAoZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgbW92ZUZpZ3VyZShjdXJyZW50Tm9kZS5wYXRoW2luZGV4XSk7XG4gICAgICB9LCBpICogNjAwKTtcbiAgICB9KGkpKTtcbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgY3JlYXRlRG9tIGZyb20gJy4vbW9kdWxlcy9kb20nO1xuaW1wb3J0IHsgbW92ZUtuaWdodCB9IGZyb20gJy4vbW9kdWxlcy90cmF2YWlscyc7XG5cbmNyZWF0ZURvbSgpO1xuXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=