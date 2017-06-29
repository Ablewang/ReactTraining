import IndexConfig from './data/index_config.json'
import './jquery-1.8.3.min.js';

let DataAction = {
	getNotify: (config) => {
		if (!IndexConfig || IndexConfig.notify_num <= 0) {
			return null;
		}
		var notify = null;
		for (var i = 0; i < IndexConfig.notify.length; i++) {
			if (!IndexConfig.notify[i].no_notify) {
				IndexConfig.notify[i].no_notify = true;
				IndexConfig.notify_num--;
				notify = IndexConfig.notify[i];
				break;
			}
		}
		return notify;
	},
	setNoNotify: (index) => {
		if (!IndexConfig) {
			for (var i = 0; i < IndexConfig.notify.length; i++) {
				if (IndexConfig.notify[i].index == index) {
					IndexConfig.notify[i].no_notify = true;
					IndexConfig.notify_num--;
					break;
				}
			}
		}
	},
	getHeaderInfo: () => {
		return !IndexConfig ? null : IndexConfig.header;
	},
	getProdsInfo: () => {
		return !IndexConfig ? null : IndexConfig.prods;
	},
	getShowImgs: () => {
		return !IndexConfig ? null : IndexConfig.show_img;
	},
	getListData: (pagesize) => {
		let res = {};
		if (IndexConfig) {
			Object.keys(IndexConfig.lst_data).map((item)=>{
				res[item] = DataAction.cloneObj(IndexConfig.lst_data[item]);
				res[item].data = DataAction.getListRange(item,1,pagesize);
			})
		}
		return res;
	},
	getListRange: (owner, page, size) => {
		let res = [];
		if (IndexConfig) {
			let list = IndexConfig.lst_data[owner].data;
			res = list.slice((page - 1) * size, page * size);
		}
		return res;
	},
	getHotData: () => {
		return !IndexConfig ? null : IndexConfig.lst_hot;
	},
	getFooterInfo: () => {
		return !IndexConfig ? null : IndexConfig.footer;
	},
	getBannerList: () => {
		return !IndexConfig ? null : IndexConfig.banner_lst;
	},
	cloneObj(obj){
		let n_obj = {};
		Object.keys(obj).map((item)=>{
			n_obj[item] = obj[item];
		})
		return n_obj;
	}
}

export default DataAction