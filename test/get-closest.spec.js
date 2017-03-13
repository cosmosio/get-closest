/**
 * @license get-closest https://github.com/cosmosio/get-closest
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2014-2017 Olivier Scherrer <pode.fr@gmail.com
 */
var sut = require("../index"),
    chai = require("chai"),
    expect = chai.expect,
    Levenshtein = require("levenshtein");

describe("Given closest", function () {
    var array = [10, 15, 0, 20, 5];

    it("should return the closest item in an array", function () {
        expect(function () {
            sut.number();
        }).to.throw("Get closest expects an array as second argument");
        expect(function () {
            sut.number(0);
        }).to.throw("Get closest expects an array as second argument");
        expect(sut.number(0, array)).to.equal(2);
        expect(sut.number(2, array)).to.equal(2);
        expect(sut.number(3, array)).to.equal(4);
        expect(sut.number(2.5, array)).to.equal(2);
        expect(sut.number(9, array)).to.equal(0);
        expect(sut.number(10, array)).to.equal(0);
        expect(sut.number(15.5, array)).to.equal(1);
        expect(sut.number(20, array)).to.equal(3);
    });
});

describe("ClosestGreater", function () {
    var array = [10, 15, 1, 20, 5];

    it("should return the closest greater or equal item in an array", function () {
        expect(function () {
            sut.greaterNumber();
        }).to.throw("Get closest expects an array as second argument");
        expect(function () {
            sut.greaterNumber(0);
        }).to.throw("Get closest expects an array as second argument");
        expect(sut.greaterNumber(0, array)).to.equal(2);
        expect(sut.greaterNumber(2, array)).to.equal(4);
        expect(sut.greaterNumber(3, array)).to.equal(4);
        expect(sut.greaterNumber(2.5, array)).to.equal(4);
        expect(sut.greaterNumber(9, array)).to.equal(0);
        expect(sut.greaterNumber(10, array)).to.equal(0);
        expect(sut.greaterNumber(15.5, array)).to.equal(3);
        expect(sut.greaterNumber(20, array)).to.equal(3);
    });
});

describe("ClosestLower", function () {
    var array = [10, 15, 0, 20, 5];

    it("should return the closest lower or equal item in an array", function () {
        expect(function () {
            sut.lowerNumber();
        }).to.throw("Get closest expects an array as second argument");
        expect(function () {
            sut.lowerNumber(0);
        }).to.throw("Get closest expects an array as second argument");
        expect(sut.lowerNumber(0, array)).to.equal(2);
        expect(sut.lowerNumber(4, array)).to.equal(2);
        expect(sut.lowerNumber(9, array)).to.equal(4);
        expect(sut.lowerNumber(10, array)).to.equal(0);
        expect(sut.lowerNumber(14, array)).to.equal(0);
        expect(sut.lowerNumber(15.5, array)).to.equal(1);
        expect(sut.lowerNumber(20, array)).to.equal(3);
    });
});

describe("Custom", function () {
    var days = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];

    function customComparator(comparedItem, baseItem) {
        return new Levenshtein(comparedItem, baseItem).distance;
    }

    it("should return the closest string given a levenshtein distance", function () {
        expect(sut.custom("mundi", days, customComparator)).to.equal(0);
        expect(sut.custom("mardy", days, customComparator)).to.equal(1);
        expect(sut.custom("mercure", days, customComparator)).to.equal(2);
        expect(sut.custom("jedi", days, customComparator)).to.equal(3);
        expect(sut.custom("venfredi", days, customComparator)).to.equal(4);
        expect(sut.custom("semadi", days, customComparator)).to.equal(5);
        expect(sut.custom("gromanche", days, customComparator)).to.equal(6);
    });
});
