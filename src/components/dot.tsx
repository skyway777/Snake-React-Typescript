import * as React from 'react';
import { DotType } from '@src/types';
import './dot.scss';

export interface IDotProps {
  type: DotType,
  size: number,
}

export function Dot({ type = DotType.Empty, size = 30 }: IDotProps) {
  return (
    <div className={`dot dot_${type}`} style={{ width: `${size}px`, height: `${size}px` }} />
  );
}

export default Dot;
