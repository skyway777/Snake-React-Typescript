import * as React from 'react';
import { Dot, Options, Field } from '@src/components';
import { Coordinate, DotType, Direction } from '@src/types';
import { Snake, FoodPoint } from '@src/classes';
import './game.scss';

type GameState = {
  snake: Snake,
  foodPoint?: FoodPoint
  gameOver: boolean,
  direction: number,
  speed: number,
  height: number,
  newHeight: number,
  width: number,
  newWidth: number,
  start: Coordinate,
  cellSize: number,
};

const INIT_SPEED = 5;
const INIT_SIZE = 3;
const INIT_HEIGHT = 20;
const INIT_WIDTH = 25;
const INIT_CELLCIZE = 15;
const INIT_START_LOCATION = { x: 5, y: 5 };

export default class Game extends React.Component<{}, GameState> {
  protected _initialState: GameState;
  protected _nextDirection: number | null;
  protected _refreshTimer: any;

  constructor(props: {}) {
    super(props);
    const maxDotWidth = window.innerWidth / 40;
    const maxDotHeight = window.innerHeight / 40;

    const cellSize = (maxDotWidth < maxDotHeight) ? maxDotWidth : maxDotHeight;
    // TODO: Add events on resize screen

    this.state = {
      snake: new Snake(INIT_START_LOCATION),
      gameOver: false,
      direction: Direction.Right,
      speed: INIT_SPEED,
      height: INIT_HEIGHT,
      newHeight: INIT_HEIGHT,
      width: INIT_WIDTH,
      newWidth: INIT_WIDTH,
      start: INIT_START_LOCATION,
      cellSize: cellSize,
      foodPoint: undefined,
    };
    // saving initial state for restarting game
    this._initialState = { ...this.state };
  }

  render() {
    return (
      <div
        className="game"
        tabIndex={0} // keyboard events enable
        ref={div => div && div.focus()} // focus on load
        onKeyPress={(e) => { this._handleKey(e); }}
      >

        <Options
          className="game__options"
          width={this.state.newWidth}
          height={this.state.newHeight}
          points={this.state.snake.length - 4}
          onSave={() => { this.handleSave(); }}
          onChangeHeight={(height) => { this.onChangeHeight(height); }}
          onChangeWidth={(width) => { this.onChangeWidth(width); }}
        />

        <Field
          className="game__field"
          objects={[this.state.snake, this.state.foodPoint]}
          cellSize={this.state.cellSize}
          gameOver={this.state.gameOver}
          width={this.state.width}
          height={this.state.height}
          onRepeat={() => { this._reset(); }}
        />
      </div>
    );
  }

  componentDidMount() {
    this._resume();
  }
  componentWillUnmount() {
    clearInterval(this._refreshTimer);
  }

  protected _reset() {
    this.setState({ ...this._initialState, snake: new Snake(this.state.start) });
    this._nextDirection = null;
    this._resume();
  }

  protected _resume() {
    const refreshTime = 500 / this.state.speed; // speed depends on timer
    this._refreshTimer = setInterval(
      this._refresh.bind(this),
      refreshTime,
    );
  }

  protected _gameOver() {
    this.setState({ gameOver: true });
    clearInterval(this._refreshTimer);
  }

  protected _refresh() {
    let direction = this.state.direction;

    const snake = this.state.snake;
    const head = snake.getNewHead(direction, this.state.height, this.state.width);

    if (snake.crashed() || this.state.gameOver) {
      return this._gameOver();
    }

    // food has reached or snake in initial size
    const toEat = this.state.foodPoint && this.state.foodPoint.onPoint(head.x, head.y) || snake.length === INIT_SIZE;
    // snake growing only in eat moments and on initialization
    const toGrow = toEat || snake.length <= INIT_SIZE;
    // add new head in new/old direction
    snake.unshift(head);

    if (toEat) {
      this.setState({
        foodPoint: FoodPoint.generateFoodPoint(snake, this.state.width, this.state.height),
      });
    }

    if (!toGrow) {
      const tail = snake.pop();
    }

    if (this._nextDirection) {
      direction = this._nextDirection;
      this._nextDirection = null;
    }

    this.setState({
      snake: snake,
      direction: direction,
    });
  }

  protected _handleKey(event: any) {
    const keyCode = event.nativeEvent.keyCode;
    const directionDiff = Math.abs(this.state.direction - keyCode);
    const compareLeftRight = Math.abs(Direction.Left - Direction.Right);
    const compareUpDown = Math.abs(Direction.Up - Direction.Down);
    // if key is invalid, or the same, or in the opposite direction, ignore it
    if ((keyCode in Direction) && ([0, compareLeftRight, compareUpDown].indexOf(directionDiff) === -1)) {
      this._nextDirection = keyCode;
    }
  }

  protected handleSave(): void {
    this._initialState = {
      ...this._initialState,
      width: this.state.newWidth,
      newWidth: this.state.newWidth,
      height: this.state.newHeight,
      newHeight: this.state.newHeight,
    };
    clearInterval(this._refreshTimer);
    this._reset();
  }

  protected onChangeHeight(height: number): void {
    this.setState({ newHeight: height });
  }
  protected onChangeWidth(width: number): void {
    this.setState({ newWidth: width });
  }
}
