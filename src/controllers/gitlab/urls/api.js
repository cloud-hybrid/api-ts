const Base = async () => {
    return {
        "URL": "https://" + [process.env["GitLab"]["Host"]].join("/")
    };
};

const Login = async () => {
    const $ = await Base();

    return {
        "URL": [$.URL, "login"].join("/")
    };
};

const API = async () => {
    const $ = await Base();

    return {
        "URL": [$.URL, "api/v4"].join("/")
    };
};

const Projects = async () => {
    const $ = await API();

    return {
        "URL": [$.URL, "projects"].join("/")
    };
};

const Groups = async () => {
    const $ = await API();

    return {
        "URL": [$.URL, "groups"].join("/")
    };
};

const Users = async () => {
    const $ = await API();

    return {
        "URL": [$.URL, "users"].join("/")
    };
};

const All = async () => {
    return {
        Base: await Base(),
        Login: await Login(),
        API: {
            Base: await API(),
            Projects: await Projects(),
            Groups: await Groups(),
            Users: await Users()
        }
    }
};

export const Module = {
    Base, Login, API, Projects, Groups, Users, All
};

export default Module;