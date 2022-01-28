import Library from "@cloud-technology/library";

import { default as flatten } from "../../utilities/flatten.js";

/// @octokit/openapi-types/types.d.ts
const API = new Library.Octokit.Octokit({ auth: process.env["GitHub-Token"] });

/***
 *
 * @returns {Promise<{}>}
 *
 * @constructor
 *
 */

export const Data = async () => {
    const {
        data: { login }
    } = await API.rest.users.getAuthenticated();

    const Organization = await API.rest.orgs.get({
        org: process.env["GitHub-Organization"]
    });

    return flatten(Organization);
};

/***
 *
 * @returns {Promise<{Object}>}
 *
 */

export default async () => await Data();
