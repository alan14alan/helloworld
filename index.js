#!/usr/bin/env node

const program = require('commander');
const fs = require('fs');
const runapp = require('./runapp');
const axios = require('axios');
const stockinfo = require('./stockinfo');
var columnify = require('columnify');
var moment = require('moment');

let stockcode = [];
let stockurl = [];
let precnt = 0;
// const run = new runapp();
program
    .version('0.1.0')
    .option('-a, --add <type>')
    .option('-t, --test', 'testtest')
    .option('-r, --run')
    .option('-d, --delete <type>')
    .option('-g, --get <type>')
    .parse(process.argv);

//console.log(program.opts());
if (program.add) {
    //console.log(program.add);
    let stockcode = [];
    fs.readFile('stockcode.txt', 'utf-8', (err, data) => {
        //console.log(data);
        stockcode = data.split(',');
        if (!stockcode.includes(program.add)) {
            stockcode.push(program.add);
        }
        console.log(stockcode);
        fs.writeFile('stockcode.txt', stockcode.join(','), 'utf-8', (err) => { });  // 寫出test.txt
    });
}
if (program.delete) {
    let stockcode = [];
    fs.readFile('stockcode.txt', 'utf-8', (err, data) => {
        //console.log(data);
        stockcode = data.split(',');
        if (stockcode.includes(program.delete)) {
            stockcode = stockcode.filter(code => (code !== program.delete));
        }
        console.log(stockcode);
        fs.writeFile('stockcode.txt', stockcode.join(','), 'utf-8', (err) => { });  // 寫出test.txt
    });
}
if (program.test) {
    console.log('test');
}
if (program.run) {
    console.log('start run /// ctrl+c 結束程式 mycli -a XXXX 加入  mycli -d XXXX 刪除 ');
    console.log('start run /// ctrl+c 結束程式 mycli -a XXXX 加入  mycli -d XXXX 刪除 ');
    console.log('start run /// ctrl+c 結束程式 mycli -a XXXX 加入  mycli -d XXXX 刪除 ');
    let run = new runapp();
    run.readstockcode().then(() => {
        //console.log(run.stockurl);
        setInterval(run.query, 1500);
    });
}
if (program.get) {
    //https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=20190930&stockNo=2356
    let today = moment().format("YYYYMMDD");
    let sub31date = moment().subtract(31, 'days').format("YYYYMMDD");
    console.log(today);
    console.log(sub31date); 
    // axios.get(`https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=20190930&stockNo=2356`)    
    //     .then(response => {
    //         //console.log(response.data.msgArray);
    //         let data = response.data.msgArray;
    //         let ary = [];
    //         let cnt = 0;
    //         data.forEach(row => {
    //             ary.push(new stockinfo(row));
    //             cnt += row.z;
    //         });
    //         if (precnt !== cnt) {
    //             console.log(columnify(ary));
    //             precnt = cnt;
    //         }
    //         //console.log('end: ' + (new Date() - startTime));
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     });
}