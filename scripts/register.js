$(function () {
  const poolData = {
    UserPoolId: window._config.userPoolId,
    ClientId: window._config.userPoolClientId
  };

  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  $("#registerForm").submit(function (e) {
    e.preventDefault();

    const email = $("#email").val();
    const password = $("#password").val();

    const attributeList = [
      new AmazonCognitoIdentity.CognitoUserAttribute({
        Name: "email",
        Value: email
      })
    ];

    userPool.signUp(email, password, attributeList, null, function (err, result) {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }

      alert("Registration successful! Check your email for the verification code.");
      window.location.href = "verify.html";
    });
  });
});

  