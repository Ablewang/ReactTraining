import React,{Component} from 'react'

class IndexFooter extends Component{
	render(){
		let footer = !this.props.action ? null : this.props.action.getFooterInfo();
		return !footer ? '' :(
			<div className="idx-g-ft">
				<div className="ft-cpy">
					<div className="u-ttc">
						<span className="u-icon">EDU</span>
						<div className="u-split"></div>
						<span className="u-tt">网易教育产品部</span>
					</div>
					<span className="cpy">©2014 icourse163.org 浙ICP备08114786号-1</span>
					<span className="cpy">icourses.cn 京ICP备12020869号-2 京公网安备110102000459-2</span>
				</div>
				<FooterLink link={footer.link}/>
				<div className="ft-abt">
					<span className="ft-tt">我们：</span>
					<span className="ft-con">关于</span>
					<span className="ft-con">联系</span>
					<span className="ft-con">关注</span>
				</div>
				<div className="ft-mr">
					<span className="ft-tt">更多：</span>
					<span className="ft-con">常见问题</span>
					<span className="ft-con">意见反馈</span>
				</div>
			</div>
		)
	}
}

class FooterLink extends Component{
	render(){
		let link = this.props.link;
		return (
			<div className="ft-lnk">
				<span className="ft-tt">友情链接：</span>
				{
					link.map((item)=>{
						return <a key={item.title} target="__blank" className="ft-con" href={item.url}>{item.title}</a>
					})
				}
			</div>
		)
	}
}

export default IndexFooter