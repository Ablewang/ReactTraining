import DataAction from './DataAction'
import React from 'react';
import {
	render
} from 'react-dom';
import LoginPopup from './LoginPopup';
import Login from './Login';

import IndexNotify from './IndexNotify';
import IndexHeader from './IndexHeader';
import IndexProds from './IndexProds';
import IndexShow from './IndexShow';
import IndexCon from './IndexCon';
import IndexFooter from './IndexFooter';

import './css/main.css'
import './css/login_popup.css';
import './index.temp.html';

render(<IndexNotify action={DataAction}/>, document.getElementById('root'));

render(<IndexHeader action={DataAction}/>, document.getElementById('header'));

render(<IndexProds action={DataAction}/>, document.getElementById('prods'));

render(<IndexShow action={DataAction}/>, document.getElementById('shw'));

render(<IndexCon action={DataAction}/>, document.getElementById('lst'));

render(<IndexFooter action={DataAction}/>, document.getElementById('ft'));


// render(<LoginPopup loginEvent={Login.post} loginEvent={Login.post}/>, <document className="getE"></document>lementById('root'));