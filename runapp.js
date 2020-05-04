const fs = require("fs");
const axios = require('axios');
var columnify = require('columnify');
const stockinfo = require('./stockinfo');
class runapp {

    constructor() {
        this.stockcode = [];
        this.stockurl = [];
        this.precnt = 0;
        this.priceMap = new Map();
        //this.readstockcode();
        this.query = this.query.bind(this);
    }

    query() {
        //console.log('query');
        //  console.log(this.stockurl);
        //  console.log(this.stockcode);
        let url = this.stockurl.join('|');
        axios.get('http://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=' + url)
            //tse_2356.tw|
            .then(response => {
                //console.log(response.data.msgArray);
                let data = response.data.msgArray;
                let ary = [];
                let cnt = 0;
                data.forEach(row => {
                    if (row.z !== '-') {
                        this.priceMap.set(row.c, row.z);
                        cnt += row.z;
                        ary.push(new stockinfo(row));
                    } else {
                        let prePrice = this.priceMap.get(row.c);
                        row.z = prePrice;
                        cnt += row.z;
                        ary.push(new stockinfo(row));
                    }
                });
                if (this.precnt !== cnt) {
                    console.log(columnify(ary));
                    this.precnt = cnt;
                }
                //console.log('end: ' + (new Date() - startTime));
            })
            .catch(error => {
                console.log(error);
            });

    }
    read() {
        return new Promise((resolve, reject) => {
            fs.readFile('stockcode.txt', 'utf-8', (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    }
    readstockcode() {
        console.log('init');
        return new Promise((resolve) => {
            resolve(
                this.read().then((data) => {
                    this.stockcode = data.split(',');
                    this.stockurl = this.stockcode.map(code => {
                        return `tse_${code}.tw`;
                    });
                    console.log(this.stockurl);
                })
            )
        })
        // this.read().then((data) => {
        //     this.stockcode = data.split(',');
        //     this.stockurl = this.stockcode.map(code => {
        //         return `tse_${code}.tw`;
        //     });
        //     console.log(this.stockurl);
        // });
        // fs.readFile('stockcode.txt', 'utf-8', (err, data) => {
        //     this.stockcode = data.split(',');
        //     this.stockurl = this.stockcode.map(code => {
        //         return `tse_${code}.tw`;
        //     });
        //     console.log(this.stockurl);
        //     this.query();
        // });
    }

}
module.exports = runapp;