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
	getListData: () => {
		return !IndexConfig ? null : IndexConfig.lst_data;
	},
	getHotData: () => {
		return !IndexConfig ? null : IndexConfig.lst_hot;
	},
	getFooterInfo: () => {
		return !IndexConfig ? null : IndexConfig.footer;
	}
}

export default DataAction