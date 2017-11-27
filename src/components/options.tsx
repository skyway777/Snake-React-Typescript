import * as React from 'react';
import ReactDOM from 'react-dom';
import { Slider } from 'reactrangeslider';
// import 'react-rangeslider/lib/index.css'
import './options.scss';

export interface IOptionsProps {
  width: number,
  height: number,
  points: number,
  className: string,
  onChangeWidth?: (event: any) => void,
  onChangeHeight?: (event: any) => void,
  onSave?: () => void,
}

export default function Options({ className, width = 20, height = 20, points, onChangeWidth, onChangeHeight, onSave }: IOptionsProps) {
  return (
    <div className={`option__container ${className}`}>
      <div className="option__col">
        <h1>The Snake Game</h1>
        <span className="option option_score"> Score: {(points > 0) ? points : 0}</span>
        <span className="option option_width">
          Width:{width}
          <Slider
            value={width}
            min={10}
            max={40}
            trackStyle={{ top: 6 }}
            handleStyle={{ width: 15, height: 15 }}
            onChange={onChangeWidth}
          />
        </span>
        <span className="option option_height">
          Height:{height}
          <Slider
            value={height}
            min={10}
            max={30}
            trackStyle={{ top: 6 }}
            handleStyle={{ width: 15, height: 15 }}
            onChange={onChangeHeight}
          />
        </span>
        <button onClick={onSave}>Save settings and restart</button>
      </div>
      <img src="/static/img/keys.png" className="option option__col option__img" />
    </div>
  );
}
