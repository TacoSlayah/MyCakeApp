$(document).ready(function () {
  const poolData = {
    UserPoolId: window._config.cognito.userPoolId,
    ClientId: window._config.cognito.userPoolClientId
  };

  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  $('#verifyForm').submit(function (e) {
    e.preventDefault();

    const email = $('#emailInputVerify').val();
    const code = $('#codeInputVerify').val();

    const userData = {
      Username: email,
      Pool: userPool
    };

    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.confirmRegistration(code, true, function (err, result) {
      if (err) {
        alert(err.message || JSON.stringify(err));
      } else {
        alert("Verification successful! Redirecting to login...");
        window.location.href = "login.html";
      }
    });
  });
});

  