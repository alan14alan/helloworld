const chalk = require('chalk');
class stockinfo {

    // 股票代碼;
    // 公司簡稱;
    // 成交價;
    // 漲跌;
    // 百分比;
    // 當盤成交量;
    // 累積成交量;
    // 開盤價;
    // 最高價;
    // 最低價;
    // 昨收;

    constructor(row) {
        //'c','n','z','tv','v','o','h','l','y'
        this.股票代碼 = row.c;
        this.公司簡稱 = row.n;
        this.成交價 = row.z;
        this.漲跌 = (row.z - row.y) > 0
            ? chalk.red((row.z - row.y).toFixed(2))
            : chalk.green((row.z - row.y).toFixed(2));
        this.百分比 = (row.z - row.y) > 0
            ? chalk.red((((row.z - row.y) / row.y) * 100).toFixed(2))
            : chalk.green((((row.z - row.y) / row.y) * 100).toFixed(2));
        this.當盤成交量 = row.tv;
        this.累積成交量 = row.v;
        this.開盤價 = row.o;
        this.最高價 = row.h;
        this.最低價 = row.l;
        this.昨收 = row.y;
    }
}
module.exports = stockinfo;