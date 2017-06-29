import accounts from './data/accounts.json';
import './jquery-1.8.3.min.js';

let Login = {
	validate(data) {
		return !data.username || !data.password ? '请输入正确账号' : '';
	},
	post: (data) => {
		var valid = Login.validate(data);
		if (valid.length > 0) {
			alert(valid);
		} else {
			$.get('http://study.163.com/webDev/login.html', {
				userName: data.username,
				password: data.password
			}, function(result) {
				alert(result);
			}).error(function(error, msg) {
				alert('服务器请求失败！错误信息：' + msg);
			})
		}
	}
}

export default Login