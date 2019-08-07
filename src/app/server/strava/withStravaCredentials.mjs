import {mergeRight} from 'ramda';
import {updateToken} from 'stravaApi';
import log from 'logger';
import removeAthleteCredentials from './removeAthleteCredentials';


const EXPIRES_SHIFT = 60; // one minute

const withStravaCredentials = async (koaCtx, next) => {
    const {athleteId} = koaCtx.state;

    // если в сессии нет athleteId - пользователь не авторизован
    if (!athleteId) {
        return next();
    }

    const credentials = await koaCtx.db.getAthleteCredentials(athleteId);

    // athleteId есть, но по какой-то причине мы деавторизовали пользователя
    if (!credentials) {
        return next();
    }

    const {expiresAt, refreshToken} = credentials;

    const now = Date.now() / 1000;

    // если срок действия токена больше минуты - все ок, иначе обновляем токен
    if (expiresAt - EXPIRES_SHIFT > now) {
        koaCtx.state.stravaCredentials = credentials;

        return next();
    }

    let result;

    try {
        result = await updateToken(refreshToken);
    } catch (error) {
        log.error({
            key: 'strava-update-token',
            error,
        });

        await removeAthleteCredentials(koaCtx.db, credentials);

        return next();
    }

    const newCredentials = mergeRight(credentials, result);

    await koaCtx.db.addAthleteCredentials(newCredentials);

    log.info({
        key: 'strava-credentials-updated',
        athleteId,
    });

    koaCtx.state.stravaCredentials = newCredentials;

    return next();
};

export default withStravaCredentials;
