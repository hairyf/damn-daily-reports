// 使用拼接字符串的方式引入 n8n，避免 pkg 引用
// 为了更好的兼容性，node_modules 作为 assets 打包
require('./node_modules' + '/n8n/bin/n8n')
