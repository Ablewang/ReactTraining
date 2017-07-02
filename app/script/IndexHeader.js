import React, {
	Component
} from 'react'
import {render} from 'react-dom'
import Popup from './Popup';
import Login from './LoginPopup';

class IndexHeader extends Component {
	constructor(){
		super()
		this.setFollow = this.setFollow.bind(this)
		this.setLoginState = this.setLoginState.bind(this)
		this.login = this.login.bind(this)
		this.state = {
			hd_info :null,
			fun_info :null,
			login_info:null
		}
	}
	componentWillMount(){
		this.setState({
			hd_info:!this.props.action ? null : this.props.action.getHeaderInfo(),
			fun_info:!this.props.action ? null : this.props.action.getFunsInfo(),
			login_info:!this.props.action ? null : this.props.action.getLoginInfo()
		})
	}
	setLoginState(state){
		if (state) {
			this.setState({
				login_info:!this.props.action ? null : this.props.action.getLoginInfo()
			})
		}
	}
	login(){
		render(<Login setLoginState={this.setLoginState}/>,document.getElementById('popup'));
	}
	logout(){
		this.props.action.logout();
		this.setState({
			login_info:!this.props.action ? null : this.props.action.getLoginInfo()
		})
	}
	setFollow(follow){
		this.props.action.setFollow(follow);
		this.setState({
			fun_info:!this.props.action ? null : this.props.action.getFunsInfo()
		})
	}


	render() {
		let lg_info = this.state.login_info;
		return !this.state.hd_info ? '<span></span>' : (
			<div>
				{
					lg_info.is_login ? <IndexNotify action={this.props.action}/> : <span></span>
				}
				<div className="idx-g-nav">
					<IconHeader title={this.state.hd_info.title} /> 
					<FunsHeader funs={this.state.fun_info} setFollow={this.setFollow} login={this.login} login_info={this.state.login_info}/>
					<NavHeader navList = {this.state.hd_info.nav_lst} />
				</div>
				<div className="account">
					{lg_info.is_login ? (<span>欢迎 {lg_info.cur_acc} | <span className="log-action" onClick={()=>{this.logout();}}>退出</span></span>):(<span>游客 | <span className="log-action" onClick={()=>{this.login();}}>登录</span></span>)}
				</div>
			</div>
		)
	}
}

class IndexNotify extends Component {
	constructor() {
		super()
		this.state = {
			unnotify_l: []
		};
	}
	setNoNotify(index) {
		this.props.action.setNoNotify(index);
		let list = this.state.unnotify_l;
		list.push(index);
		this.setState({
			unnotify_l:list
		})
	}
	render() {
		let notify = this.props.action.getNotify();
		return !notify ? (<span></span>) : (
			<div className="idx-g-ntc">
				<span>{notify.text}<a target="__blank" href={notify.url}>立即查看></a></span>
				<span className="u-cls" onClick={()=>this.setNoNotify(notify.index)} >不再提醒</span>
			</div>
		)
	}
}

class IconHeader extends Component {
	render() {
		return (
			<div className="u-ttc">
				<span className="u-icon">EDU</span>
				<div className="u-split"></div>
				<span className="u-tt">{this.props.title}</span>
			</div>
		)
	}
}

class FunsHeader extends Component {
	handelFollow(isfollow){
		this.props.login_info.is_login ? this.props.setFollow(isfollow) : this.props.login();
	}
	render() {
		var funs = this.props.funs;
		return (
			<div className="u-flw">
				<div className={funs.is_follow?"u-flw-img unflw" : 'u-flw-img flw'} onClick={()=>{funs.is_follow? this.handelFollow(false) : this.handelFollow(true)}}><span></span><a href="javascript:void(0);"></a></div>
				<span className="sp-funs">粉丝</span>
				<span className="sp-funs-cnt">{funs.funs_num}</span>
			</div>
		)
	}
}

class NavHeader extends Component {
	render() {
		var flwClass = this.props.isfollow ? "u-flw-img unflw" : 'u-flw-img flw';
		return (
			<div className="u-nav">
				<ul>
					{
						this.props.navList.map((item)=>{
							return <li key={item}>{item}</li>
						})
					}
				</ul>
				<div className="u-nav-sc"></div>
			</div>
		)
	}

}

export default IndexHeader