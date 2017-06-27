import React, {
	Component
} from 'react'

class IndexHeader extends Component {
	render() {
		var header = !this.props.action ? null : this.props.action.getHeaderInfo();
		return !header ? '<span></span>' : (
			<div  className="idx-g-nav">
				<IconHeader title={header.title} /> 
				<FunsHeader isfollow = {header.is_follow} />
				<NavHeader navList = {header.nav_lst} />
			</div>
		)
	}
}

class IconHeader extends Component {
	render() {
		return (
			<div className="u-ttc">
				<span className="u-icon">EDU</span>
				<div className="u-split"></div>
				<span className="u-tt">{this.props.title}</span>
			</div>
		)
	}
}

class FunsHeader extends Component {
	render() {
		var flwClass = this.props.isfollow ? "u-flw-img unflw" : 'u-flw-img flw';
		return (
			<div className="u-flw">
				<div className={flwClass}><span></span><a href=""></a></div>
				<span className="sp-funs">粉丝</span>
				<span className="sp-funs-cnt">45</span>
			</div>
		)
	}
}

class NavHeader extends Component {
	render() {
		var flwClass = this.props.isfollow ? "u-flw-img unflw" : 'u-flw-img flw';
		return (
			<div className="u-nav">
				<ul>
					{
						this.props.navList.map((item)=>{
							return <li key={item}>{item}</li>
						})
					}
				</ul>
				<div className="u-nav-sc"></div>
			</div>
		)
	}

}

export default IndexHeader