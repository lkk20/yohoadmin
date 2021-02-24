const path = require('path')

function resolve(dir) {
	return path.join(__dirname, dir)
}
//配置别名
module.exports = {
	lintOnSave: true,
	publicPath: './'
}
