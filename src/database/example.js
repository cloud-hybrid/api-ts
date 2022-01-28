// import * as Library from "./../library/index.js";

import Library from "@cloud-technology/library";

export const Schema = Library.ORM.Schema;

const Model = Library.ORM.model;

await Library.ORM.connect("mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false", {
    dbName: "test"
});

const kittySchema = new Schema({
    name: String
});

kittySchema.methods.speak = function speak() {
    const greeting = this.name
        ? "Meow name is " + this.name
        : "I don't have a name";
    console.log(greeting);
};

const Kitten = Model('Kitten', kittySchema);

const silence = new Kitten({ name: 'Silence' });

console.log(silence.name); // 'Silence'

const fluffy = new Kitten({ name: 'fluffy' });
fluffy.speak(); // "Meow name is fluffy"

await fluffy.save();
fluffy.speak();

const kittens = await Kitten.find();
console.log(kittens);

await Kitten.find({ name: /^fluff/ });