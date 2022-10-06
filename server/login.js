const login = {
    admin(auth, username, password){
        if(auth == process.env.auth || username == process.env.admin && password == process.env.password){
            return true;
        } else {
            return false;
        }
    }
}
module.exports = login;