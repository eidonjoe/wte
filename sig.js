'use strict'
/*
timestamp	long	进行接口调用时的时间戳，即当前时间戳 （时间戳：当前距离Epoch（1970年1月1日） 以秒计算的时间，即unix-timestamp）
consumer_key	string	eleme分配给APP的consumer_key
sig	string	输入参数计算后的签名结果
 */
const crypto = require('crypto');
const utf8 = require('utf8');
let shasum = crypto.createHash('sha1');

let consumer_key = '0170804777';
let consumer_secret = '87217cb263701f90316236c4df00d9352fb1da76';
let timestamp = new Date().valueOf();
let baseUrl = 'http://ppe-openapi.ele.me';
let path = '/restaurants/';

/**
 * consumer_key=7284397484&timestamp=1374908054
 */
let stringA = 'consumer_key=' + consumer_key + '&timestamp=' + timestamp;

/**
 * ? + 字符串A + consumer_secret
 * ?consumer_key=7284397484&timestamp=13749080544d31ba58fd73c71db697ab5e4946d52d
 */
let stringB = baseUrl + path + '?' + stringA + consumer_secret;

let utf8Buffer = new Buffer(stringB);
let hexString = utf8Buffer.toString('Hex');

shasum.update(hexString);
let sha1String = shasum.digest('hex');

/**
 * ?consumer_key=7284397484&sig=67bc70f748b9d82140bcf9115afc698dfd04b472&timestamp=1374908054
 */
let url = baseUrl + path + '?consumer_key=' + consumer_key + '&sig=' + sha1String + '&timestamp=' + timestamp;
console.log(url);