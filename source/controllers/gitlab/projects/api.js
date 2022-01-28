import { Call } from "../../../utilities/request.js";

/***
 *
 * @param page
 * @param items
 * @returns {string}
 *
 * @constructor
 *
 */

const URL = (page = 1, items = 1) => {
    const Base = process.env["GitLab-API"];
    const Extension = "projects";
    const Page = (index) => `page=${ index }`;
    const Per = (index) => `per_page=${ index }`;

    return Base + Extension + "?" + Page(page) + "&" + Per(items);
};

/***
 *
 * @returns {Promise<{Status: {number}, Response: [{}], Message: {string}, Headers: {}, Method: {string}, URL: {string}}>}
 *
 * @param page {number}
 * @param items {number}
 *
 * @constructor
 *
 */

export const Query = async (page = 1, items = 1) => {
    const $ = (
        await Call({
            path: process.env["GitLab"]["Projects"] + "?"
                + [ "page", page ].join("=")
                + "&"
                + [ "per_page", items ].join("="),
            host: process.env["GitLab"]["Host"],
            port: 443,
            requestCert: true,
            rejectUnauthorized: false
        }, {
            "PRIVATE-TOKEN": process.env["GitLab"]["Token"]
        })
    );

    $.Response = JSON.parse($.Response);

    return $;
};

/***
 *
 * @returns {Promise<{Data: number}>}
 *
 * @constructor
 *
 */

export const Total = async () => {
    const $ = await Query(1, 1);
    return { Data: Number($.Headers["x-total"]) };
};

/***
 *
 * @param page
 * @param items
 *
 * @returns {Promise<{Data: {Attributes: {}, Projects: *[]}}>}
 *
 * @constructor
 */

export const Projects = async (page = 1, items = 20) => {
    const Data = {
        Attributes: {},
        Projects: []
    };

    const $ = await Query(page, items);

    $.Response.forEach((Project, Index) => {
        Data.Projects.push(Project);
    });

    Data.Attributes["Total-Projects"] = $.Headers["x-total"];
    Data.Attributes["Total-Pages"] = $.Headers["x-total-pages"];
    Data.Attributes["Per-Page-Items"] = $.Headers["x-per-page"];

    const ceiling = Number(Data.Attributes["Total-Pages"]);
    let next = Number($.Headers["x-next-page"]);

    for (next; next <= ceiling; next++) {
        const $ = await Query(next, items);

        $.Response.forEach((Project, Index) => {
            Data.Projects.push(Project);
        });
    }

    return { Data };
};

/***
 *
 * @param page
 * @param items
 *
 * @returns {Promise<{Data: {Pages: {}, Attributes: {}}}>}
 *
 * @constructor
 */

export const Pages = async (page = 1, items = 20) => {
    const Data = {
        Attributes: {},
        Pages: {}
    };

    const $ = await Query(page, items);

    Data.Pages[1] = $.Response;

    Data.Attributes["Total-Projects"] = $.Headers["x-total"];
    Data.Attributes["Total-Pages"] = $.Headers["x-total-pages"];
    Data.Attributes["Per-Page-Items"] = $.Headers["x-per-page"];

    const ceiling = Number(Data.Attributes["Total-Pages"]);
    let next = Number($.Headers["x-next-page"]);

    for (next; next <= ceiling; next++) {
        const $ = await Query(next, items);

        Data.Pages[next] = $.Response;
    }

    return { Data };
};

/***
 *
 * @returns {Promise<{Data: *[]}>}
 *
 * @constructor
 *
 */

export const Empties = async () => {
    const Data = [];

    const $ = (await Projects(1, 100)).Data;

    $.Projects.forEach((Project, Index) => {
        if (Project["empty_repo"] === true) {
            Data.push(Project);
        }
    });

    return { Data };
};

export const Module = {
    Query, Total, Projects, Pages, Empties
};

export default Module;