import { default as User } from "./../../../../database/model/user/index.js";

export const Available = async (username) => {
    return {Data: ((await User.findOne({Username: username}).exec()) === null)};
};

export const Search = async (username) => {
    const Data = await User.findOne({Username: username})
        .populate("Name")
        .exec();

    return (Data) && Data.toJSON({minimize: true, versionKey: false});
};

export default {
    Available, Search
};