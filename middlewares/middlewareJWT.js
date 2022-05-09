const jwt = require("jsonwebtoken");
const JWTSecret = "123456789";

middlewareJWT = (req, res, next) => {
    const authToken = req.headers["authorization"];

    if (authToken === undefined){
        res.statusCode = 400;
        res.json({err: "authorization token is required"});
        return;
    };

    let fullToken = authToken.split(" ");
    let token =  "";

    // Protect to with/no Bearer auth
    if (fullToken.length === 1){
        token = fullToken[0];
    }else{
        token = fullToken[1];
    };

    if (token === undefined){
        res.statusCode = 400;
        res.json({err: "authorization token is required"});
        return;
    }

    jwt.verify(token, JWTSecret, (err, data) => {
        if (err) {
            res.statusCode = 403;
            res.json({err: "invalid token"});
        }else{
            req.loggedUser = data;
            req.token = token;
            next();
        }
    });
};

module.exports = {jwt,JWTSecret,middlewareJWT}
