// Pulls your Cognito User Pool info from the config
const poolData = {
    UserPoolId: window._config.userPoolId,       // Your Cognito User Pool ID
    ClientId: window._config.userPoolClientId    // Your App Client ID
  };
  
  // Create a Cognito User Pool object using the info above
  const userPool = new window.AmazonCognitoIdentity.CognitoUserPool(poolData);

  
  // Attach a listener to the form when it's submitted
  document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Stop the form from refreshing the page
  
    const email = document.getElementById("email").value;       // Get email from input field
    const password = document.getElementById("password").value; // Get password from input field
  
    // Create an attribute list for Cognito. At minimum, include email.
    const attributeList = [
        new window.AmazonCognitoIdentity.CognitoUserAttribute({
        Name: "email",
        Value: email
      })
    ];
  
    // Call Cognito's signUp method
    userPool.signUp(email, password, attributeList, null, function (err, result) {
      if (err) {
        // If something goes wrong, show the error
        alert(err.message || JSON.stringify(err));
        return;
      }
  
      // If it works, tell the user and redirect to the verification page
      alert("Registration successful! Please check your email for the verification code.");
      window.location.href = "verify.html";
    });
  });
  