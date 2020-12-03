class User {
    constructor(name, gender, interest, email, password){
    this.email = email;
    this.password = password;
    this.name = name;
    this.interest = interest;
    this.gender = gender;  
}
}

module.exports = User;