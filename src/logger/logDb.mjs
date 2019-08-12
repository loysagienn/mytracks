import {getDb} from 'db';

const logsQueue = [];

const prepareData = (data) => {
    if (!data.timestamp) {
        data.timestamp = Date.now();
    }

    return data;
};

let logDb = (level, data) => logsQueue.push([level, data]);

getDb().then((db) => {
    logDb = (level, data) => {
        data = prepareData(data);

        if (level === 'error') {
            db.logError(data).catch(() => console.log('log error'));
        } else {
            db.logInfo(data).catch(() => console.log('log error'));
        }
    };

    logsQueue.forEach(([level, data]) => logDb(level, data));
});


export default (level, data) => logDb(level, data);
