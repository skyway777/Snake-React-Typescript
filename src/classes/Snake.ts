import { DotType, Direction, Coordinate } from '@src/types';
import { IFieldObject } from '@src/interfaces';

export default class Snake extends Array<Coordinate> implements IFieldObject {
  public dotType = DotType.Snake;
  constructor(initialElement: Coordinate) {
    super();

    this.push(initialElement);
  }
  // Calculates new head coordinate depends on increment/decrement
  private static calcNewCoordinate = (current: number, max: number, toIncrement: boolean): number => {
    if (toIncrement) {
      return (current >= max - 1) ? 0 : ++current;
    }
    return (current <= 0) ? max - 1 : --current;
  }

  public crashed = (): boolean => {
    // incorrect or uninitialized object
    if (!this.length || this.length <= 0) {
      return false;
    }

    const head = this[0];
    const foundIndex = this.findIndex((el, index) => {
      // coordinates not equals and not head
      return el.x === head.x && el.y === head.y && index > 0;
    });

    return foundIndex > -1;
  }

  public getNewHead = (direction: Direction, height: number, width: number): Coordinate => {
    const snake: Snake = this;
    if (!snake || snake.length === 0) {
      throw new Error('Snake is undefined or incorrect');
    }

    const head = snake[0];
    const newHead = { ...head };
    // move forward one step in the correct direction, wrapping if needed
    switch (direction) {
      case Direction.Up:
        newHead.y = Snake.calcNewCoordinate(newHead.y, height, false); break;
      case Direction.Down:
        newHead.y = Snake.calcNewCoordinate(newHead.y, height, true); break;
      case Direction.Left:
        newHead.x = Snake.calcNewCoordinate(newHead.x, width, false); break;
      case Direction.Right:
        newHead.x = Snake.calcNewCoordinate(newHead.x, width, true); break;
    }
    // translate new x/y coords back into array index
    return newHead;
  }

  public onPoint(x: number, y: number): boolean {
    const snake: Snake = this;
    if (!snake || snake.length === 0) {
      return false;
    }

    let result = false;
    snake.forEach((segment) => {
      if ((segment.x === x) && (segment.y === y)) {
        result = true;
      }
    });
    return result;
  }
}
