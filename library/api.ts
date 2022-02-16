import express from "express";

const API = express;
const Application: typeof express.application = API();
const Router = API.Router;

import compression from "compression";

const Compression = compression;

import axios from "axios";

const Axios = axios;

import octokit from "octokit";

const Octokit = octokit;

import mongodb from "mongodb";

const Database = mongodb;

import mongoose from "mongoose";

/*** Mongo-DB ORM Tool
 * @type {import("mongoose")}
 * */

const ORM = mongoose;
//
//const cryptography: any = {};
//import bcrypt from "bcryptjs";
//
///*** Cryptography Module
// * @type {import("bcryptjs")}
// * */
//cryptography.BCrypt = bcrypt;
//
///*** Cryptography Hashing Function
// * @type {import("bcryptjs").hash}
// * */
//cryptography.Hash = bcrypt.hash;
//
///*** Cryptography Salt Generator
// * @type {import("bcryptjs").genSalt}
// * */
//
//cryptography.generateSalt = bcrypt.genSalt;
//
///*** Cryptography Salt Getter
// * @type {import("bcryptjs").getSalt}
// * */
//
//cryptography.getSalt = bcrypt.getSalt;
//
///*** Cryptography Comparator
// * @type {import("bcryptjs").compare}
// * */
//
//cryptography.compare = bcrypt.compare;
//
///*** Cryptography Rounds Getter
// * @type {import("bcryptjs").getRounds}
// * */
//
//cryptography.getRounds = bcrypt.getRounds;
//
///*** Cryptography Decoder (base-64)
// * @type {import("bcryptjs").decodeBase64}
// * */
//
//cryptography.decode = bcrypt.decodeBase64;
//
///*** Cryptography Encoder (base-64)
// * @type {import("bcryptjs").encodeBase64}
// * */
//
//cryptography.encode = bcrypt.encodeBase64;
//
///*** Cryptography Container Object
// *
// * @extends {import("bcryptjs")}
// * @method encode {import("bcryptjs").encodeBase64}
// */
//const Cryptography = cryptography;

import cors from "cors";

const CORS = cors;

import token from "jsonwebtoken";

const Token = token;

import body from "body-parser";

const Parser = body;

export {
    API,
    Application,
    Router,
    Compression,
    Axios,
    Octokit,
    Database,
    CORS,
    ORM,
    Token,
//    Cryptography,
    Parser
};

export default {
    API,
    Application,
    Router,
    Compression,
    Axios,
    Octokit,
    Database,
    CORS,
    ORM,
    Token,
//    Cryptography,
    Parser
};