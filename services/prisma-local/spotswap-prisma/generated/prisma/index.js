"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  endpoint: "http://localhost:4466",
  secret: 'my-secret-secret' //`${process.env["PRISMA_SECRET"]}`
});
exports.prisma = new exports.Prisma();
