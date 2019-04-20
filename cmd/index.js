//hexo 原始文件保存提交
var os = require('os');
const { exec,execSync } = require('child_process');

var commandSync = function(){
    var args = Array.prototype.slice.call(arguments);
    args.map(function(item){
        execSync(item, (err, stdout, stderr) => {
            if(err) {
                console.log(stdout);
                return;
            }
            console.log(`${stdout} ok`);
        })
    })
}
commandSync('hexo g','hexo d','git add .','git commit -m "ok"', 'git push')