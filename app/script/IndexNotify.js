import React, {
	Component
} from 'react';
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

export default IndexNotify