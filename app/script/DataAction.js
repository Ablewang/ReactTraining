import IndexConfig from '../data/index_config.json'

let DataAction = {
	getLoginInfo:()=>{
		return !IndexConfig ? null : IndexConfig.login_inf;
	},
	getAccountInfo:()=>{
		return !IndexConfig ? null : IndexConfig.account;
	},
	login:({username,password})=>{
		let accounts = DataAction.getAccountInfo();
		let res = false;
		if (accounts.hasOwnProperty(username)) {
			res = accounts[username] == password;
		}
		if (res) {
			DataAction.updateLoginInfo(username,true);
		}
		return res;
	},
	logout:()=>{
		DataAction.updateLoginInfo('',false);
	},
	updateLoginInfo:(username,is_login)=>{
		let loginInfor = DataAction.getLoginInfo();
		loginInfor.is_login = is_login;
		loginInfor.cur_acc = username;
	},
	getNotify: () => {
		if (!IndexConfig || IndexConfig.notify_num <= 0) {
			return null;
		}
		var notify = null;
		for (var i = 0; i < IndexConfig.notify.length; i++) {
			if (!IndexConfig.notify[i].no_notify) {
				notify = IndexConfig.notify[i];
				break;
			}
		}
		return notify;
	},
	setNoNotify: (index) => {
		if (IndexConfig) {
			for (var i = 0; i < IndexConfig.notify.length; i++) {
				if (IndexConfig.notify[i].index == index) {
					IndexConfig.notify[i].no_notify = true;
					break;
				}
			}
		}
	},
	getHeaderInfo: () => {
		return !IndexConfig ? null : IndexConfig.header;
	},
	getFunsInfo: () => {
		return !IndexConfig ? null : IndexConfig.funs;
	},
	setFollow: (follow) => {
		if (IndexConfig) {
			IndexConfig.funs.is_follow = follow;
			IndexConfig.funs.funs_num += follow ? 1 : -1;
		}
	},
	getProdsInfo: () => {
		return !IndexConfig ? null : IndexConfig.prods;
	},
	getShowImgs: () => {
		return !IndexConfig ? null : IndexConfig.show_img;
	},
	getListKind:()=>{
		let kind = [];
		if (IndexConfig) {
			Object.keys(IndexConfig.lst_data).map(function(res){
				kind.push(res);
			})
		}
		return kind;
	},
	getListRangeData: (owner, page, pagesize) => {
		let res = {};
		if (IndexConfig) {
			if (IndexConfig.lst_data[owner]) {
				res = DataAction.cloneObj(IndexConfig.lst_data[owner]);
				res.data = res.data.slice((page - 1) * pagesize, page * pagesize);
			}
		}
		return res;
	},
	getListData: (pagesize) => {
		let res = {};
		if (IndexConfig) {
			Object.keys(IndexConfig.lst_data).map((item) => {
				res[item] = DataAction.cloneObj(IndexConfig.lst_data[item]);
				res[item].data = DataAction.getListRange(item, 1, pagesize);
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
		let res = [];
		if (IndexConfig) {
			res =  DataAction.cloneObj(IndexConfig.lst_hot);
			let take = DataAction.getRandomList(res.ht_lst.length,8).sort((a,b)=>{return b - a;});
			let list = [];
			for (var i = take.length - 1; i >= 0; i--) {
				list.push(res.ht_lst[take[i]]);
			}
			res.ht_lst = list;
		}
		return res;
	},
	getRandomList:(max,size)=>{
		var list =[];
		var res =[];
		for (var i = 0; i < max; i++) {
			list.push(i);
		}
		let take = size > max ? max :size;
		for (var i = take; i >= 0; i--) {
			let rand = Math.floor(max * Math.random());
			res.push(list[rand]);
			list[rand] = list[--max];
		}
		return res;
	},
	getFooterInfo: () => {
		return !IndexConfig ? null : IndexConfig.footer;
	},
	getBannerList: () => {
		return !IndexConfig ? null : IndexConfig.banner_lst;
	},
	cloneObj(obj) {
		let n_obj = {};
		Object.keys(obj).map((item) => {
			n_obj[item] = obj[item];
		})
		return n_obj;
	}
}

export default DataAction