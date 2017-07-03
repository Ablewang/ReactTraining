import DataAction from './DataAction'
import React from 'react';
import {
	render
} from 'react-dom';

import IndexHeader from './IndexHeader';
import Carousel from './Carousel';
import IndexProds from './IndexProds';
import IndexShow from './IndexShow';
import IndexCon from './IndexCon';
import IndexFooter from './IndexFooter';

import '../css/main.css'
import '../css/login_popup.css';
import '../index.temp.html';


render(<IndexHeader action={DataAction}/>, document.getElementById('header'));

render(<Carousel action={DataAction}/>, document.getElementById('banner'));

render(<IndexProds action={DataAction}/>, document.getElementById('prods'));

render(<IndexShow action={DataAction}/>, document.getElementById('shw'));

render(<IndexCon action={DataAction}/>, document.getElementById('lst'));

render(<IndexFooter action={DataAction}/>, document.getElementById('ft'));


// render(<LoginPopup loginEvent={Login.post} loginEvent={Login.post}/>, <document className="getE"></document>lementById('root'));