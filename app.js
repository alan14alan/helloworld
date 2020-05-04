

const fs = require("fs");
const axios = require('axios');
var columnify = require('columnify');
const stockinfo = require('./stockinfo');
const runapp = require('./runapp');

let startTime = new Date();
let precnt = 0;
// const a = function () {
//     let run = new runapp();
//     //run.query();
// };
// const a = function () {
//     //console.log('start: ' + (new Date() - startTime));
//     axios.get('http://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=tse_2356.tw|tse_1301.tw|tse_6505.tw|tse_1902.tw')
//         .then(response => {
//             //console.log(response.data.msgArray);
//             let data = response.data.msgArray;
//             let ary = [];
//             let cnt = 0;
//             data.forEach(row => {
//                 ary.push(new stockinfo(row));
//                 cnt += row.z;
//             });
//             if (precnt !== cnt) {
//                 console.log(columnify(ary));
//                 precnt = cnt;
//             }
//             //console.log('end: ' + (new Date() - startTime));
//         })
//         .catch(error => {
//             console.log(error);
//         });

// };

//a();
let run = new runapp();
run.readstockcode();
run.query();
setInterval(run.query, 1500);