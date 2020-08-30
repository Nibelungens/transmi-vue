module.exports = {
    devServer: {
        proxy: {
            '^/api': {
                target: 'http://192.168.1.100:9001',
                pathRewrite: {'^/api': '/transmission/rpc'},
                changeOrigin: true,
                secure: false
            }
        }
    }
}