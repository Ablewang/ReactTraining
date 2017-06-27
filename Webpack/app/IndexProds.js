import React, {
	Component
} from 'react';

class IndexProds extends Component {
	render() {
		var prods = !this.props.action ? null : this.props.action.getProdsInfo();
		return !prods ? '' : (
			<div className="idx-g-prod">
			{
				prods.map((item)=>{return(
				<div key={item.index} className="u-prod">
						<div className="prod-img"></div>
						<div className="prod-cnt">
							<span className="prod-tt">{item.title}</span>
							<span className="prod-indc">{item.intro}</span>
							<span className="prod-more">了解更多 ></span>
						</div>
					</div>
					) 
				})
			}
			</div>
		);
	}
}
export default IndexProds