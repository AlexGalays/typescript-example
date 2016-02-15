import * as React from 'react';
import { render } from 'react-dom';
import { Router } from 'abyssa';
import ReactState from 'abyssa/lib/ReactState';

import App from './App';
import Index from './Index';
import Blue from './Blue';
import Green from './Green';
import Red from './Red';


const State = ReactState(document.getElementById('react'));

Router({
	app: State('', App, {
		index: State('', Index),
		blue: State('blue/:id', Blue, {
			green: State('green', Green),
			red: State('red', Red)
		})
	})
})
.configure({ urlSync: 'hash' })
.init();
