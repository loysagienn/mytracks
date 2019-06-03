import log from 'logger';

export default async (ctx, next) => {
    const startTime = Date.now();

    const result = await next();

    const processTime = Date.now() - startTime;

    log.info(`request ${ctx.host}${ctx.url} process in ${processTime} ms`);

    return result;
};
