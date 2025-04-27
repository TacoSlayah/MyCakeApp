$(document).ready(function () {
  // Access Cognito
  const poolData = {
    UserPoolId: window._config.cognito.userPoolId,
    ClientId: window._config.cognito.userPoolClientId
  };

  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  $('#verifyForm').submit(function (e) {
    e.preventDefault();

    // receive user info
    const email = $('#emailInputVerify').val();
    const code = $('#codeInputVerify').val();

    // Add userData in Cognito
    const userData = {
      Username: email,
      Pool: userPool
    };

    // Creates user in Cognito
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    // Confirms if verification code matches what the user typed in
    cognitoUser.confirmRegistration(code, true, function (err, result) {
      if (err) {
        alert(err.message || JSON.stringify(err));
      } else {
        alert("Verification successful! Redirecting to login...");
        window.location.href = "login.html";// Go to login.html
      }
    });
  });
});

  