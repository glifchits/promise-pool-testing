import agent from 'superagent';
import defaults from 'superagent-defaults';
import Promise from 'bluebird';
import Queue from 'promise-queue';

Promise.promisifyAll(agent);
const request = defaults(agent);

var url = 'http://localhost:8888/';

const start = new Date();
console.log('started', start);

/*
    return request.get(url).endAsync().then(res => callback(null, res)).catch(callback);
*/

Queue.configure(Promise); // use bluebird promise

let q = new Queue(2 /* concurrent */, Infinity /* max in queue */);

for (let i = 0; i < 10; i++) {
    q.add(() => {
        console.log('requested', i);
        return request.get(url).endAsync()
            .then(() => {
                const end = new Date();
                console.log(`${i} finished after ${((end-start)/1000).toFixed(2)} sec`);
            });
    });
}


