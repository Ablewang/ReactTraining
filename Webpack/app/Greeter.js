import React,{Component} from 'react'
import config from './config.json';

class Greeter extends Component{
	render(){
		return (
			<div>
			...........this is {config.greetText}
			</div>
		);
	}
}

export default Greeter