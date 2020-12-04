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
	
