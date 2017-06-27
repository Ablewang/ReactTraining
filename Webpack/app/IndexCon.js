import React, {
	Component
} from 'react'

class IndexCon extends Component {
	render() {
		let list = !this.props.action ? null : this.props.action.getListData();
		let hot = !this.props.action ? null : this.props.action.getHotData();
		return (
			<div className="idx-g-cus">
				<List list={list} />
				<Hot hot={hot} />
				<div className="cls"></div>
			</div>
		)
	}
}

class List extends Component {
	render() {
		return (
			<div className="cus-dit">
				<ListTab list={this.props.list} />
				<ListTable list={this.props.list} />
			</div>
		)
	}
}
class Hot extends Component {
	render() {
		return (
			<div className="cus-rg">
			</div>
		)
	}
}


class ListTab extends Component {
	render() {
		let first = true;
		return (
			<div className="cus-tab">
				<ul>
					{

						Object.keys(this.props.list).map((item)=>{
							let cls = first ? "idx-g-cus-bxs cus-tab-act" : "idx-g-cus-bxs";
							let key = this.props.list[item].index;
							first = false;
							return <li key={key} className={cls}><a href={"#tab"+key}>{item}</a></li>
						})
					}
				</ul>
			</div>
		)
	}
}

class ListTable extends Component {
	render() {
		let first = true;
		return (
			<div className="cus-lsc">
				{

					Object.keys(this.props.list).map((item)=>{
						let sty = first ? {display:"block"} : {display:"none"};
						let key = this.props.list[item].index;
						first = false;
						return (
							<div id={"tab"+key} key={key} className="cus-ls" style={sty}>
								{
									this.props.list[item].data.map((dt)=>{
										return(
											<div key={dt.index} className="idx-g-cus-bxs ls-itm">
												<img className="itm-img" src={dt.img} alt="" />
												<span className="itm-tt">{dt.title}</span>
												<span className="itm-grp">{dt.group}</span>
												<span><span className="itm-sale">{dt.saled}</span></span>
												<span className="itm-pric">￥{dt.price.toFixed(2)}</span>
											</div>
										)
									})
								}
							</div>
						)
					})
				}
			</div>
		)
	}
}
export default IndexCon