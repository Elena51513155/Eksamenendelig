/*

const { expect } = require("chai");
const { logout } = require("../controllers/frontController");


    var email = req.session.email;
	var loggedin = req.session.loggedin;
    descripe(logout(), function() {
        it("burde logout og slette", function() {
            email && loggedin 
                req.session.destroy();
            
            expect(res.redirect('/'))
        }
        )
        }
    
    )
    */


const { response } = require("express");
const expect = require("chai").expect
const fetch = require("node-fetch")
describe("Vi tester log out endpoint", function(){  
    it('should return > HTML file <', function () {
     fetch("http://localhost:3006").then(response => {
         response.should.have.status(200)
     })
   
    });
})
	
