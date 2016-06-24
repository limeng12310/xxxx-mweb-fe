var jsonServer = require('json-server');
var server = jsonServer.create();
var fs = require('fs');

// 从命令行参数获取db.json的路径
var dbPath = process.argv.splice(2)[0];
if (!dbPath) {
    console.log('missing arg db.json');
    process.exit();
}
if (!fs.existsSync(dbPath)) {
    console.log('dbPath does not exists');
    process.exit();
}

var router = jsonServer.router(dbPath);
var middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.rewriter({
    '/thorgene-mweb-ios/': '/'
}));
server.use(router);
server.listen(3001, function() {
    console.log('JSON Server is running');
});