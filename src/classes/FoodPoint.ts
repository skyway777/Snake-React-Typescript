import { Coordinate, Snake } from '@src/types';
import { IFieldObject } from '@src/interfaces';
import { DotType } from '@src/types/DotType';

export default class FoodPoint extends Coordinate implements IFieldObject {
  public dotType = DotType.Food;
  public static generateFoodPoint = (snake: Snake, width: number, height: number): Coordinate => {
    const MAX_TRYINGS = width * height; // set max attemps to avoid recursion
    const newPoint = new FoodPoint();

    let i = 0;
    do {
      newPoint.x = Math.floor(Math.random() * width);
      newPoint.y = Math.floor(Math.random() * height);
      i++;
    }
    // repeat until not on snake and max tryings was not reached
    while (snake.onPoint(newPoint.x, newPoint.y) && (i < MAX_TRYINGS));

    return newPoint;
  }

  public onPoint(x: number, y: number) {
    if ((this.x === x) && (this.y === y)) {
      return true;
    }
    return false;
  }
}
