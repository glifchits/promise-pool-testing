import agent from 'superagent';
import defaults from 'superagent-defaults';
import Promise from 'bluebird';
import { queue } from 'd3-queue';
import $ from 'jquery';

Promise.promisifyAll(agent);
const request = defaults(agent);

var url = 'http://localhost:8888/';

const start = new Date();
console.log('started', start);

queue(2)
  .defer(function(callback) {
    $.get(url, {json: JSON.stringify({value: 1}), delay: 1}, function(data) { callback(null, data); });
  })
  .defer(function(callback) {
    $.get(url, {json: JSON.stringify({value: 3}), delay: 2}, function(data) { callback(null, data); });
  })
  .defer(function(callback) {
    $.get(url, {json: JSON.stringify({value: 1}), delay: 1}, function(data) { callback(null, data); });
  })
  .defer(function(callback) {
    $.get(url, {json: JSON.stringify({value: 1}), delay: 1}, function(data) { callback(null, data); });
  })
  .defer(function(callback) {
    $.get(url, {json: JSON.stringify({value: 1}), delay: 1}, function(data) { callback(null, data); });
  })
  .defer(function(callback) {
    $.get(url, {json: JSON.stringify({value: 1}), delay: 1}, function(data) { callback(null, data); });
  })
  .await((err, results) => {
      if (err) throw err;
      const end = new Date();
      console.log(`finished after ${((end-start)/1000).toFixed(2)} sec`);
  })
  /*
  .awaitAll((err, results) => {
      const end = new Date();
      console.log(`finished after ${((end-start)/1000).toFixed(2)} sec`);
  });
  */
