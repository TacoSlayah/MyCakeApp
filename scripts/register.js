$(function () {
  // Connect Cognito to web app
  const poolData = {
    UserPoolId: window._config.cognito.userPoolId,
    ClientId: window._config.cognito.userPoolClientId
  };
  
  // poolData contains user pool and client IDs
  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  $("#registerForm").submit(function (e) {
    e.preventDefault();
    // Takes user's email and password that they typed in
    const email = $("#email").val();
    const password = $("#password").val();
    
    // Stores data in Cognito
    const attributeList = [
      new AmazonCognitoIdentity.CognitoUserAttribute({
        Name: "email",
        Value: email
      })
    ];

    // Creates account
    userPool.signUp(email, password, attributeList, null, function (err, result) {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }

      alert("Registration successful! Check your email for the verification code.");
      window.location.href = "verify.html";// success redirects user to verify.html
    });
  });
});

  