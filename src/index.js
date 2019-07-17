import React from 'react';
import ReactDOM from 'react-dom';
import App from '~/modules/app';
import './styles/global.scss';
import './initIcons';

const Index = () => (
  <main>
    <App />
  </main>
);

ReactDOM.render(<Index />, document.getElementById('index'));
