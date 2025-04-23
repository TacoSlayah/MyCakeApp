// Pull your Cognito config
const poolData = {
    UserPoolId: window._config.userPoolId,
    ClientId: window._config.userPoolClientId
  };
  
  // Create a Cognito User Pool object
  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
  
  // Add an event listener for when the form is submitted
  document.getElementById("verifyForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the default page refresh
  
    const email = document.getElementById("email").value; // Grab the email entered
    const code = document.getElementById("code").value;   // Grab the verification code
  
    // Create a Cognito user object with the given email and pool
    const userData = {
      Username: email,
      Pool: userPool
    };
  
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  
    // Call confirmRegistration to verify the user's email
    cognitoUser.confirmRegistration(code, true, function (err, result) {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }
  
      // Success: alert the user and take them to login
      alert("Email verified! You can now log in.");
      window.location.href = "login.html";
    });
  });
  