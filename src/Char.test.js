import React from 'react';
import ReactDOM from 'react-dom';
import { Char } from './Char';

it('renders without crashing', () => {
  const div = document.createElement('div');
  let match = {params: {id: 1}};
  ReactDOM.render(<Char match={match} characters={[]} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

