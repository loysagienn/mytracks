
import request from 'request-promise-native';
import {toCamelCase} from 'helpers';
import {getDateFromMonthKey} from 'helpers/date';
import {API_URL} from './constants';
import processError from './processError';


export default ({accessToken}, month, countPerPage = 100, page = 1) => {
    const date = getDateFromMonthKey(month);
    const startTimestamp = date.getTime() / 1000;
    const endTimestamp = date.setMonth(date.getMonth() + 1) / 1000;

    return request({
        method: 'GET',
        uri: `${API_URL}/athlete/activities`,
        qs: {
            access_token: accessToken,
            page,
            per_page: countPerPage,
            before: endTimestamp,
            after: startTimestamp,
        },
        json: true,
    }).then(toCamelCase).catch(processError);
};
