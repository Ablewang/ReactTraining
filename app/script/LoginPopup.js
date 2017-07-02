import React, {
	Component
} from 'react';
import '../css/popup.css';
import Popup from './Popup';
import DataAction from './DataAction'
import PopupCommonFun from './PopupCommonFun'

class LoginPopup extends Component {
	constructor(props) {
		super(props)
		this.state={
			popup_unique: new Date().getTime()
		}
	}
	render() {
		return (
			<Popup shade_close={true} title="登录网易云课堂" unique={this.state.popup_unique} content={
				<Login popup_unique={this.state.popup_unique} setLoginState={this.props.setLoginState}/>
			}/>
		);
	}
}

class Login extends Component {
	constructor(props) {
		super(props)
		this.state={
			popup_unique: new Date().getTime(),
			username : "",
			password : "",
			error:"",
			logined:false
		}
	}
	componentWillMount(){
		this.setState({
			popup_unique:this.props.popup_unique
		})
	}
	LoginFun() {
		var data = {
			username: this.state.username,
			password: this.state.password
		};
		if (!DataAction.login(data)) {
			this.setState({
				error:"用户名或密码错误"
			})
		}else{
			this.setState({error:""})
			this.props.setLoginState(true);
			PopupCommonFun.closePopup(this.state.popup_unique);
		}
	}
	render() {
		return (
			<div className='content_continer'>
				<div className='login_input'>
					<input type="text" className='username' onChange={(e)=>{this.state.username=e.target.value;}} placeholder="账号" />
					<input type="password" className='password' onChange={(e)=>{this.state.password=e.target.value;}}  placeholder="密码" />
				</div>
				<div className='login_btn'>
					<input type="button" value="登录" onClick={()=>{this.LoginFun();}} />
				</div>
				<div id="login_error" className="login_error">{this.state.error}</div>
			</div>
		);
	}
}

export default LoginPopup