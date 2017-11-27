import * as React from 'react';
import { Game } from '@src/containers';

type Props = {
};

export class App extends React.Component<Props, {}> {
  render() {
    return (
      <div>
        <Game />
      </div>
    );
  }
}
