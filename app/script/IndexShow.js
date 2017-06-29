import React, {
	Component
} from 'react';
class IndexShow extends Component {
	render() {
		var showImgs = !this.props.action ? null : this.props.action.getShowImgs();
		return !showImgs ? '' : (
			<div className="idx-g-shw">
				<ul>
					{
						showImgs.map((img)=>{return <li key={img}><img src={img} alt="" /></li>})
					}
				</ul>
			</div>
		)
	}
}

export default IndexShow