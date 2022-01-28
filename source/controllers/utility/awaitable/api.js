/***
 *
 * @param duration
 *
 * @return {Promise<Boolean>}
 *
 * @constructor
 *
 */

export const Awaitable = async (duration) => {
    const $ = new Promise(async (resolve, reject) => {
        await setTimeout[Object.getOwnPropertySymbols(setTimeout)[0]](duration);

        resolve(true);
    });

    return $;
};
