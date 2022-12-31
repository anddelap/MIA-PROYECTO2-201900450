const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
require('dotenv').config();

const cognito ={
    UserPoolId: process.env.COGNITO_USER_POOL_ID,
    ClientId: process.env.COGNITO_CLIENT_ID
}
//console.log(cognito)
const userPool = new AmazonCognitoIdentity.CognitoUserPool(cognito);

const signInCognito = async (user, password, mail) => {
    //const {user, password, mail} = req.body;
    const attributeList = [];

    //attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({'username': username}));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:'email', Value: mail}));
    return new Promise((resolve, reject) => {
        userPool.signUp(user, password, attributeList, null, async(err, result) => {
            if (err) {
                console.log(err);
                //res.status(500).send
                resolve({
                    'status': 0,
                    'msg': err
                })
                return;
            } else {
                const cognitoUser = result.user;
                console.log('user name is ' + cognitoUser.getUsername());
                //res.status(200).send
                resolve({
                    'satus': 1,
                    'msg': "Usuario creado en cognito"
                })
                return;
            }
        });
    })
}

const logInCognito = async (username, password) => {
    //const {username, password} = req.body;
    //console.log("username")
    //console.log(username)
    if(String(username).match(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/)){
        console.log("email");
        const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
            Email: username,
            Password: password
        });
        console.log(authenticationDetails)
        const userData = {
            Username: username,
            Pool: userPool
        };
        const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                const verified = result;
                console.log(verified);
                /* res.status(200).json({
                    'satus': 1,
                    'message': "Usuario encontrado en cognito"
                }) */
            },
            onFailure: function (err) {
                console.log(err);
                /* res.status(500).json({
                    'satus': 0,
                    'message': "Error: no existe usuerio en cognito"
                }) */
            }
        });
    } else{
        //console.log("username");
        return new Promise((resolve, reject) => {
            const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
                Username: username,
                Password: password
            });
            const userData = {
                Username: username,
                Pool: userPool
            };
            const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: function (result) {
                    const verified = result;
                    console.log(verified);
                    resolve({
                        'status': 1,
                        'msg': "Usuario creado en cognito"
                    })
                    return;
                },
                onFailure: function (err) {
                    console.log(err);
                    /* res.status(500).json({
                        'satus': 0,
                        'message': "Error: no existe usuerio en cognito"
                    }) */
                    resolve({
                        'status': 0,
                        'message': "Error: no existe usuerio en cognito"
                    })
                    return;
                }
            });


        })
    }

}

module.exports = {
    signInCognito,
    logInCognito
}