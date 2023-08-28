/* eslint-disable func-names */
/* eslint-disable no-alert */
/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-loop-func */
/* eslint-disable no-plusplus */
/* eslint-disable no-constructor-return */

import { moveFigure } from './dom';

class Node {
  constructor(position, path) {
    if (position[0] > 7 || position[0] < 0 || position[1] > 7 || position[1] < 0) {
      return null;
    }
    this.position = position;
    this.path = path;
  }
}

export function moveKnight(start = [], target = []) {
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
        moveFigure(currentNode.path[index]);
      }, i * 600);
    }(i));
  }
}
