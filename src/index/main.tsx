import * as React from 'react';
import { render } from 'react-dom';
import { version } from '../../package.json';

const App = () => <div>v{version}</div>;

render(<App />, document.getElementById('app-root'));
