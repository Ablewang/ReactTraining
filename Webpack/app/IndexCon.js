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
		let hot = this.props.hot;
		return (
			<div className="cus-rg">
				<div className="idx-g-cus-bxs rg-u-tt">结构介绍</div>
				<HotMove move={hot.move} />
				<div class="idx-g-cus-bxs rg-u-tt">最热排行</div>
				<HotList list={hot.ht_lst} />
			</div>
		)
	}
}

class HotMove extends Component{
	render(){
		let move = this.props.move
		return (
			<div className="idx-g-cus-bxs rg-u-mv">观看下面的视频来了解吧：<a href={move.href}><img src={move.img} alt="" /></a></div>
		)
	}
}

class HotList extends Component{
	render(){
		let list = this.props.list;
		return (
			<div className="idx-g-cus-bxs rg-u-hot">
				<ul>
					{
						list.map((itm)=>{
							return <HotListItem key={itm.index} item={itm} />
						})
					}
				</ul>
			</div>
		)
	}
}

class HotListItem extends Component{
	render(){
		let item = this.props.item;
		return (
			<li>
				<img src={item.img} alt="" />
				<span class="hot-info">
					<span className="hot-tt">{item.title}</span>
					<span className="hot-tms">{item.hot_num}</span>
				</span>
			</li>
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
			<div className="cus-tbc">
			{
				Object.keys(this.props.list).map((item)=>{
					let sty = first ? {display:"block"} : {display:"none"};
					let key = this.props.list[item].index;
					first = false;
					return (
					<div id={"tab"+key} key={key}  className="cus-lsc"  style={sty}>
						<div className="cus-ls">
							{
								this.props.list[item].data.map((dt)=>{
									return(
										<ListItem key={dt.index} data={dt} />
									)
								})
							}
						</div>
						<ListPage num={this.props.list[item].total_num}/>
					</div>
					)
				})
			}
			</div>
		)
	}
}

class ListItem extends Component{
	render(){
		let dt = this.props.data;
		return(
			<div key={dt.index} className="idx-g-cus-bxs ls-itm">
				<img className="itm-img" src={dt.img} alt="" />
				<span className="itm-tt">{dt.title}</span>
				<span className="itm-grp">{dt.group}</span>
				<span><span className="itm-sale">{dt.saled}</span></span>
				<span className="itm-pric">￥{dt.price.toFixed(2)}</span>
			</div>
		)
	}
}

class ListPage extends Component{
	render(){
		let num = this.props.num;
		let max = Math.ceil(num /12);
		var ls = (max)=>{
					let res = [];
					for (var i = 1; i <= max; i++) {
						res.push(<li key={i} className={i == 1 ? "cus-pgs-cur" : ""}>{i}</li>);
					}
					return res;
				};
		return (
		<div className="cus-pgs">
			<span className="pgs-prev"></span>
			<ul>
				{
					ls(max)
				}
			</ul>
			<span className="pgs-nxt"></span>
		</div>
		)
	}
}

export default IndexCon