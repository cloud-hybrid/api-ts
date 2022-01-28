import { default as User } from "./../../../../database/model/user/index.js";

export const Available = async (email) => {
    return {Data: ((await User.findOne({Email: email}).exec()) === null)};
};

export const Search = async (email) => {
    const Data = await User.findOne({Email: email})
        .populate("Name")
        .exec();

    return (Data) && Data.toJSON({minimize: true, versionKey: false});
};

export default {
    Available, Search
};