import React, {
	Component
} from 'react'

class Carousel extends Component {
	constructor() {
		super()
		this.state = {
			current_index: 0,
			img_cnt: 0,
			timmer: null
		}
	}
	componentDidMount() {
		if (this.refs.image) {
			let wt = document.body.scorllWidth;
			this.refs.image.style.width = (wt * this.state.img_cnt) + 'px';
			this.startTimmer();
		}
	}
	startTimmer() {
		this.state.timmer = setInterval(() => {
			let idx = this.state.current_index + 1;
			idx %= this.state.img_cnt;
			var btns = !this.refs.btn ? [null] : this.refs.btn.getElementsByTagName('li');
			this.handelCarousel(btns[idx]);
		}, 2000)
	}
	stopTimmer() {
		clearInterval(this.state.timmer);
	}

	//轮播处理
	handelCarousel(curLi) {
		let btnLst = curLi.parentNode.children;
		let curIdx = 0;
		for (let i = 0; i < btnLst.length; i++) {
			if (curLi == btnLst[i]) {
				curIdx = i;
			}
			btnLst[i].className = btnLst[i].className.replace('bnr-btn-clk', '');
		}
		curLi.className += 'bnr-btn-clk';
		this.handelMoveImg(curIdx);
	}

	//图片移动
	handelMoveImg(idx) {
		if (idx != this.state.current_index) {
			this.setState({
				current_index: idx
			}, () => {
				if (this.refs.image) {
					let wt = this.refs.image.getElementsByTagName('li')[0].offsetWidth;
					this.refs.image.style.left = -this.state.current_index * wt + 'px';
				}
			});
		}
	}

	//轮播圆圈按钮鼠标悬浮
	handelBtnMouseOver(e) {
		let curLi = e.target;
		if (curLi) {
			this.stopTimmer();
			this.handelCarousel(curLi);
		}
	}

	//轮播圆圈按钮鼠标离开
	handelBtnMouseOut() {
		this.startTimmer();
	}
	render() {
		let imgs = !this.props.action ? null : this.props.action.getBannerList();
		let btnLst = (max) => {
			let btnls = [];
			for (let i = 1; i <= max; i++) {
				let clsn = i == 1 ? 'bnr-btn-clk' : ''
				btnls.push(<li key={i} className={clsn} onMouseOver={(e)=>{this.handelBtnMouseOver(e);}}  onMouseOut={(e)=>{this.handelBtnMouseOut(e);}}></li>)
			}
			return btnls;
		}
		this.state.img_cnt = !imgs ? 0 : imgs.length;
		return !imgs ? '' : (
			<div ref="banner" className="idx-g-bnr">
				<div className="bnr-imgs">
					<ul ref="image">
						{
							imgs.map((item)=>{

								return <li key={item} onMouseOver={()=>{this.stopTimmer();}} onMouseOut={()=>{this.startTimmer();}} ><img src={item} alt="" /></li>
							})
						}
					</ul>
				</div>
				<div className="bnr-btn">
					<ul ref="btn">
						{
							btnLst(imgs.length)
						}
					</ul>
				</div>
			</div>
		)
	}
}


export default Carousel