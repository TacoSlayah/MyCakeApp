const poolData = {
    UserPoolId: window._config.userPoolId,
    ClientId: window._config.userPoolClientId,
  };
  
  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
  
  document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    const authDetails = new AmazonCognitoIdentity.AuthenticationDetails({
      Username: email,
      Password: password,
    });
  
    const userData = {
      Username: email,
      Pool: userPool,
    };
  
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  
    cognitoUser.authenticateUser(authDetails, {
      onSuccess: function (result) {
        alert("Login successful!");
        localStorage.setItem("idToken", result.getIdToken().getJwtToken());
        window.location.href = "home.html"; // Later you'll create this
      },
      onFailure: function (err) {
        alert(err.message || JSON.stringify(err));
      },
    });
  });
  