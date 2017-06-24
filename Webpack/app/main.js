import React from 'react';
import {render} from 'react-dom';
import LoginPopup from './LoginPopup';
import Login from './Login';
import './main.css'
import './login_popup.css';
import './close.png';
import './index.temp.html';
render(<LoginPopup loginEvent={Login.post} loginEvent={Login.post}/>,document.getElementById('root'));