// Connect to Cognito
const poolData = {
    UserPoolId: window._config.cognito.userPoolId,
    ClientId: window._config.cognito.userPoolClientId
  };
  
  // poolData contains user pool and client IDs
  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
  
  // Receive login info
  document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
  //User inputs email and password
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
  // What Cognito receives to check email and password
    const authDetails = new AmazonCognitoIdentity.AuthenticationDetails({
      Username: email,
      Password: password,
    });
  
    // Creates user in Cognito
    const userData = {
      Username: email,
      Pool: userPool,
    };
  
    //Check email and password
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  
    cognitoUser.authenticateUser(authDetails, {// if successful
      onSuccess: function (result) {
        alert("Login successful!");
        localStorage.setItem("idToken", result.getIdToken().getJwtToken());
        window.location.href = "order.html";// move to order.html
      },
      onFailure: function (err) {// if unsuccessful
        alert(err.message || JSON.stringify(err));
      },
    });
  });
  