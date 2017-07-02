import React, {
	Component
} from 'react'
import {
	render
} from 'react-dom';
import Popup from './Popup';
import '../css/move.css';

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
	popupMove(){
		render(<PopupMove />,document.getElementById('popup'));
	}
	render() {
		let move = this.props.move
		return (
			<div className="idx-g-cus-bxs rg-u-mv">观看下面的视频来了解吧：
				<a href={move.href}>
					<div onClick={()=>{this.popupMove();}} className="mv-start">
						<img src={move.img} alt="" />
						<div className="mv-start-circle"><div className="mv-start-tran"></div></div>
					</div>
				</a>
			</div>
		)
	}
}

class PopupMove extends Component{
	constructor(){
		super()
		this.state={
			popup_unique:new Date().getTime(),
			width:0,
			height:0
		}
	}
	componentWillMount(){
		let maxHeight = document.body.clientHeight * 0.6;
		this.setState({
			width:maxHeight*1.57,
			height:maxHeight
		},()=>{console.log(this.state)})
	}
	render(){
		return (
			<Popup shade_close={true} title="请观看下面的视频" unique={this.state.popup_unique} content={
				<div className='move-continer' style={{width:this.state.width,height:this.state.height}}>
					<div className="mv-start-squer-big"><div className="mv-start-tran-big"></div></div>
					<img className="move-img" src="../imgs/move-big.jpg" alt="" />
				</div>
			}/>
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
	constructor() {
		super()
		this.setCurrentTab = this.setCurrentTab.bind(this)
		this.state = {
			cur_tab: ''
		}
	}
	setCurrentTab(tab) {
		this.setState({
			cur_tab: tab
		});
	}
	render() {
		return (
			<div className="cus-dit">
				<ListTab setTab={this.setCurrentTab} list={this.props.list} />
				{
					(!this.state.cur_tab || this.state.cur_tab.length <= 0) ?  '':<ListTable cur_tab={this.state.cur_tab} list={this.props.list} />
				}
			</div>
		)
	}
}

class ListTab extends Component {
	handleClick(e) {
		let curli = e.target;
		if (curli) {
			let list = curli.parentNode.children;
			for (let i = list.length - 1; i >= 0; i--) {
				list[i].className = list[i].className.replace('cus-tab-act', '');
			}
			curli.className += ' cus-tab-act';
			this.props.setTab(curli.innerHTML);
		}
	}
	componentDidMount(){
		this.props.setTab(this.refs.tabs.children[0].innerHTML);
	}
	render() {
		let first = true;
		let kind = action.getListKind();
		return (
			<div className="cus-tab">
				<ul ref="tabs">
					{
						kind.map((item)=>{
							let cls = first ? "idx-g-cus-bxs cus-tab-act" : "idx-g-cus-bxs";
							let key = this.props.list[item].index;
							first = false;
							return <li key={key} data-target={key} onClick={(e)=>{this.handleClick(e);}} className={cls}>{item}</li>
						})
					}
				</ul>
			</div>
		)
	}
}

class ListTable extends Component {
	constructor() {
		super()
		this.setPage = this.setPage.bind(this)
		this.state = {
			cur_lst: [],
			cur_tab: '',
			pagesize: 12,
			cur_pg: 1,
			max_pg: 1
		}
	}
	componentWillMount(){
		this.state.cur_tab = this.props.cur_tab;
		this.setPage(1);
	}
	componentWillReceiveProps(nextProps){
		this.state.cur_tab = nextProps.cur_tab;
		this.setPage(1);
	}
	getMaxColumn(){
		return document.body.scrollWidth > 1585 ? 4 : 3;
	}
	setPage(page) {
		this.setState({
			cur_pg: page,
			cur_lst: action.getListRangeData(this.state.cur_tab, page, this.state.pagesize)
		});
	}
	getWidthWithMargin(obj){
		return obj.offsetWidth + (parseInt(this.getObjectStyle(obj,'marginLeft').replace('px',''))) + (parseInt(this.getObjectStyle(obj,'marginRight').replace('px','')))
	}
	getObjectStyle(obj,style){
		return obj.currentStyle?  obj.currentStyle[style] : document.defaultView.getComputedStyle(obj,null)[style];
	}
	render() {
		let maxColumn = this.getMaxColumn();
		let first = true;
		let item = this.state.cur_lst;
		let tab = this.state.cur_tab;
		let key = item.index;
		let spaceNum = item.data.length % maxColumn ? (maxColumn - item.data.length % maxColumn):0;
		let createSpace = (num)=>{
			let res = [];
			for (var i = 0; i < num ; i++) {
				res.push(<div key={"sapce"+i} className="ls-itm-space"></div>)
			}
			return res;
		}
		return (
			<div ref="list_c" className="cus-tbc">
			{
				<div id={"tab"+key} key={key}  className="cus-lsc">
					<div id={"tb_c"+key} key={key}>
						<div ref="item_l" className="cus-ls">
							{
								item.data.map((dt)=>{
									return(
										<ListItem key={dt.index} data={dt} />
									)
								})
							}
							{
								createSpace(spaceNum)
							}
						</div>
					</div>
					<ListPage mx_pg={Math.ceil(item.total_num / this.state.pagesize)} cur_pg={this.state.cur_pg} setPage={this.setPage}/>
				</div>				
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
	constructor() {
		super()
		this.state = {
			df_mx_pg: 8
		}
	}
	handleClick(e){
		let li = e.target;
		this.resetLiStyle(li);
		this.paging(parseInt(li.innerHTML));
	}
	nextPage(page){
		page += this.props.cur_pg;
		if (page > 0 && page <= this.props.mx_pg) {
			this.paging(page);
		}
	}
	paging(page){
		this.props.setPage(page);
	}
	resetLiStyle(li) {
		let lis = li.parentNode.children;
		for (let i = lis.length - 1; i >= 0; i--) {
			lis[i].className = lis[i].className.replace('cus-pgs-cur', '');
		}
		li.className = 'cus-pgs-cur';
	}
	render() {
		let cur = this.props.cur_pg;
		let max = this.state.df_mx_pg > this.props.mx_pg ?  this.props.mx_pg : this.state.df_mx_pg;
		let ls = (max) => {
			let res = [];
			for (let i = 1; i <= max; i++) {
				res.push(<li key={i} onClick={(e)=>{this.handleClick(e);}} className={i == cur ? "cus-pgs-cur" : ""}>{i}</li>);
			}
			return res;
		};
		return (
			<div className="cus-pgs">
			<span className="pgs-prev" onClick={()=>{this.nextPage(-1);}}></span>
			<ul ref="pageUl">
				{
					ls(max)
				}
			</ul>
			<span className="pgs-nxt" onClick={()=>{this.nextPage(1);}}></span>
		</div>
		)
	}
}

export default IndexCon