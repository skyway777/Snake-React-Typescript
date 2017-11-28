import * as React from 'react';
import { DotType } from '@src/types';
import { IFieldObject } from '@src/interfaces';
import { Dot } from '@src/components';

import './field.scss';

export interface IFieldProps {
  objects: Array<IFieldObject | undefined>
  width: number,
  height: number,
  cellSize: number,
  className: string,
  gameOver: boolean,

  onRepeat(): void
}

export default function Field({ objects, width, height, cellSize, className, gameOver, onRepeat }: IFieldProps) {
  const grid = [];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let dotType = DotType.Empty;

      for (const obj of objects) {
        if (obj && obj.onPoint(x, y)) {
          dotType = obj.dotType;
        }
      }
      grid.push(<Dot key={`cell_${x}_${y}`} type={dotType} size={cellSize} />);
    }
  }
  return (
    <div
      className={`${className} field ` + (gameOver ? 'field_gameover ' : '')}
      style={{ width: width * cellSize, height: height * cellSize }}
    >
      {gameOver && <span className="field_gameover__text" onClick={onRepeat}> Game Over. Repeat?</span>}
      {grid}
    </div>
  );
}
