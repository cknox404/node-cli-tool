import * as cli from "../src/cli";
var c = cli.new;
var assert = require("assert");

describe("Hello", function(){
    it("Hello curtis should be printed", function(){
        assert(c.getHello("curtis")=="Hello curtis");
    })
})