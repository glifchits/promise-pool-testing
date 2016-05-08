import agent from 'superagent';
import defaults from 'superagent-defaults';
import Promise from 'bluebird';

Promise.promisifyAll(agent);
const request = defaults(agent);

const BASE = 'https://httpbin.org';
const REQUESTS = 10;
const DELAY_MIN = 0;
const DELAY_MAX = 0;
let startTime = null;


function randint(lo, hi) {
    return lo + Math.round(Math.random() * (hi-lo));
}


function secondsSinceStart() {
    const now = new Date();
    return (now - startTime) / 1000;
}


let completed = 0;


function makeRequest(args = {}) {
    const delay = args.delay || 0;
    return request.get(`${BASE}/delay/${delay}`)
        .send(args)
        .endAsync()
        .then(r => {
            completed++;
            console.log(secondsSinceStart().toFixed(3), "ok", r.body.url)
            if (completed === REQUESTS) {
                console.log('done');
            }
        })
        .catch(r => console.error("error", r))
}

startTime = new Date();
console.log('dispatching requests');
for (let i = 0; i < REQUESTS; i++) {
    const delay = randint(DELAY_MIN, DELAY_MAX);
    const p = makeRequest({ idx: i, delay });
    console.log(`requested: delay = ${delay}`);
}
