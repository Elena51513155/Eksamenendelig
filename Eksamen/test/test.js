
const { response } = require("express");
const expect = require("chai").expect
const fetch = require("node-fetch")
describe("Vi tester log in endpoint", function(){  
    it('should return > HTML file <', function () {
     fetch("http://localhost:3006").then(response => {
         response.should.have.status(200)
     })
   
    });
})
	
