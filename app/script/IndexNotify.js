import React, {
	Component
} from 'react';
class IndexNotify extends Component {
	constructor() {
		super()
		this.state = {
			index: 0
		};
	}
	setNoNotify() {
		this.props.action.setNoNotify(this.state.index);
		let ntcs = document.getElementsByClassName('idx-g-ntc');
		if (ntcs && ntcs.length) {
			for (let i = ntcs.length - 1; i >= 0; i--) {

				if (ntcs[i].getAttribute('data-index') == this.state.index) {
					ntcs[i].parentNode.removeChild(ntcs[i]);
					break;
				}
			}
		}
		this.state.index = 0;
	}
	render() {

		let notify = this.props.action.getNotify();
		this.state.index = !notify ? 0 : notify.index;
		return !notify ? '' : (
			<div data-index={notify.index} className="idx-g-ntc">
				<span>{notify.text}<a target="__blank" href={notify.url}>立即查看></a></span>
				<span className="u-cls" onClick={()=>this.setNoNotify()} >不再提醒</span>
			</div>
		)
	}
}

export default IndexNotify