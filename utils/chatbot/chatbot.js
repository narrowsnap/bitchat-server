const cp = require('child_process')

exports.Chat = (sentence) => {
    try {
        let out = cp.spawnSync('python3', ['test.py', sentence], {cwd: '/home/richard/narrowsnap/chatbot/stage2'})
        out = out.stdout.toString().match(/\$\$[^ -~]*\$\$/)[0].replace(/\$/g,'');
        return out;
    } catch (e) {
        console.log(e)
        return "出错"
    }
}