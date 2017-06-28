import React, {
	Component
} from 'react'
import {
	render
} from 'react-dom';

let action = null
let pagesize = 12

class IndexCon extends Component {
	render() {
		action = this.props.action;
		let list = !this.props.action ? null : this.props.action.getListData(pagesize);
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

class Hot extends Component {
	render() {
		let hot = this.props.hot;
		return (
			<div className="cus-rg">
				<div className="idx-g-cus-bxs rg-u-tt">结构介绍</div>
				<HotMove move={hot.move} />
				<div className="idx-g-cus-bxs rg-u-tt">最热排行</div>
				<HotList list={hot.ht_lst} />
			</div>
		)
	}
}

class HotMove extends Component {
	render() {
		let move = this.props.move
		return (
			<div className="idx-g-cus-bxs rg-u-mv">观看下面的视频来了解吧：<a href={move.href}><img src={move.img} alt="" /></a></div>
		)
	}
}

class HotList extends Component {
	render() {
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

class HotListItem extends Component {
	render() {
		let item = this.props.item;
		return (
			<li>
				<img src={item.img} alt="" />
				<span className="hot-info">
					<span className="hot-tt">{item.title}</span>
					<span className="hot-tms">{item.hot_num}</span>
				</span>
			</li>
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

class ListTab extends Component {
	handleClick(id, key) {
		let lsc = document.getElementById(id);
		if (lsc) {
			let list = lsc.parentNode.children;
			let tblis = lsc.parentElement.previousElementSibling.getElementsByTagName('li');
			let tbCur = 0;
			for (let i = tblis.length - 1; i >= 0; i--) {
				tblis[i].className = tblis[i].className.replace('cus-tab-act', '');
				if (tblis[i].getAttribute('data-target') == key) {
					tbCur = i;
				}
			}
			for (let i = list.length - 1; i >= 0; i--) {
				list[i].style.display = 'none';
			}
			lsc.style.display = 'block';
			tblis[tbCur].className += ' cus-tab-act';
		}
	}
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
							return <li key={key} data-target={key} onClick={()=>{this.handleClick('tab'+key,key);}} className={cls}>{item}</li>
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
						<div id={"tb_c"+key} key={key}>
							<div className="cus-ls">
								{
									this.props.list[item].data.map((dt)=>{
										return(
											<ListItem key={dt.index} data={dt} />
										)
									})
								}
							</div>
						</div>
						<ListPage tb={"tb_c"+key} owner={item} num={this.props.list[item].total_num}/>
					</div>
					)
				})
			}
			</div>
		)
	}
}

class ListItem extends Component {
	render() {
		let dt = this.props.data;
		return (
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

class ListPage extends Component {
	constructor(){
		super()
		this.state={
			owner_tb:'',
			cur_pg:1,
			max_pg:1
		}
	}
	pgMove(plus){
		let pageUl = this.refs.pageUl.children;
		let page = this.state.cur_pg + plus;
		page = page < 1 ? 1 : page > this.state.max_pg ? this.state.max_pg : page;
		this.setState({cur_pg:page},()=>{
			this.changePage(pageUl[page-1]);
		})
	}
	changePage(li) {
		this.resetLiStyle(li);
		let num = parseInt(li.innerHTML);
		let prods = action.getListRange(this.props.owner, num, pagesize);
		let reRenderTb=(list)=>{
			let res= [];
			list.map((item)=>{
				res.push(<ListItem key={item.index} data={item} />);
			})
			return res;
		}
		render(<div className="cus-ls">{reRenderTb(prods)}</div>,document.getElementById(this.state.owner_tb));
	}
	resetLiStyle(li) {
		let lis = li.parentNode.children;
		for (let i = lis.length - 1; i >= 0; i--) {
			lis[i].className = lis[i].className.replace('cus-pgs-cur', '');
		}
		li.className = 'cus-pgs-cur';
	}
	render() {
		let num = this.props.num;
		let max = Math.ceil(num / 12);
		this.state.owner_tb = this.props.tb;
		this.state.max_pg = max;
		let ls = (max) => {
			let res = [];
			for (let i = 1; i <= max; i++) {
				res.push(<li key={i} onClick={(e)=>{this.changePage(e.target);}} className={i == 1 ? "cus-pgs-cur" : ""}>{i}</li>);
			}
			return res;
		};
		return (
			<div className="cus-pgs">
			<span className="pgs-prev" onClick={()=>{this.pgMove(-1);}}></span>
			<ul ref="pageUl">
				{
					ls(max)
				}
			</ul>
			<span className="pgs-nxt" onClick={()=>{this.pgMove(1);}}></span>
		</div>
		)
	}
}

export default IndexCon