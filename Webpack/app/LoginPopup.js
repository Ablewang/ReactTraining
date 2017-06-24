import React,{Component} from 'react';
import config from './config.json';
class LoginPopup extends Component{
	constructor(props){
		super(props)
		this.username = ""
		this.password = ""
	}
	Login(){
		var data ={username:this.username,password:this.password};
		this.props.loginEvent(data);
	}
	render(){
		return (
			<div className='content_continer'>
				<div className="login_close"></div>	
				<div className="login_title">登录网易云课堂</div>
				<div className='login_input'>
					<input type="text" className='username' onChange={(e)=>{this.username=e.target.value;}} placeholder="账号" />
					<input type="password" className='password' onChange={(e)=>{this.password=e.target.value;}}  placeholder="密码" />
				</div>
				<div className='login_btn'>
					<input type="button" value="登录" onClick={()=>{this.Login();}} />
				</div>
			</div>
		);
	}
}

export default LoginPopup