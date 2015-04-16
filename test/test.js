var assert = require("assert");

import {bump} from "../src/version-bump.js";

describe("Validation", function(){
    it("Exception is thrown when invalid version is given", function(){
        assert.throws(function(){bump("a.b.c")}, Error, "No error thrown")
    })
    
    it("Exception is thrown when invalid version is given", function(){
        assert.throws(function(){bump("0.0.0", "abc")}, Error, "No error thrown")
    })
})

describe("Bump", function(){
    it("Major bump increments major slot by one", function(){
        assert(bump("0.0.0", "major"), "1.0.0")
    })
    
    it("Minor bump increments minor slot by one", function(){
        assert(bump("0.0.0", "minor"), "0.1.0")
    })
    
    it("Patch bump increments patch slot by one", function(){
        assert(bump("0.0.0", "patch"), "0.0.1")
    })
    describe("Pre", function(){
    
        it("PreMajor bump increments the major slot by one and appends the prerelease number", function(){
            assert(bump("0.0.0", "premajor"), "1.0.0-0")
        })
        
        it("PreMajor bump appends pre type if one is given", function(){
            assert(bump("0.0.0", "premajor", "beta"), "1.0.0-beta.0")
        })
        
        it("PreMinor bump increments the minor slot by one and appends the prerelease number", function(){
            assert(bump("0.0.0", "preminor"), "0.1.0-0")
        })
        
        it("PreMinor bump appends pre type if one is given", function(){
            assert(bump("0.0.0", "preminor", "beta"), "0.1.0-beta.0")
        })
        
        it("PrePatch bump increments the patch slot by one and appends the prerelease number", function(){
            assert(bump("0.0.0", "prepatch"), "0.0.1-0")
        })
        
        it("PrePatch bump appends pre type if one is given", function(){
            assert(bump("0.0.0", "prepatch", "beta"), "0.0.1-beta.0")
        })
        
        it("Prerelease names go in alphabetical order", function(){
            let version = bump("0.0.0", "prerelease", "alpha");
            assert(bump(version, "prerelease", "beta"), "0.0.1-beta.0")
        })
        
        it("Exception is thrown when attempting prerelease a version lower alphabetically", function(){
            let version = bump("0.0.0", "prerelease", "beta");
            assert.throws(function(){bump(version, "prerelease", "alpha")}, Error, "No error thrown")
        })
    })
})

import parseCliArgs from '../src/cli-yargs.js';
describe("Yargs", function(){
    it("Parse method returns correct bump type from args", function(){
        assert(parseCliArgs(['-t', 'patch'])['t'], 'patch')
    })
    it("Parse method returns correct preid from args", function(){
        assert(parseCliArgs(['-t', 'patch', '-p', 'beta'])['p'], 'beta')
    })
})

import updateJson from '../src/cli.js';
import json from "../package.json";
describe("JSON", function(){
    it("package.json version gets bumped correctly", function(done){
        let oldVersion = json.version
        updateJson(['-t', 'patch']);
        done();
        assert(oldVersion < json.version)
    })
})