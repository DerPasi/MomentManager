var account = {

    account: "",

    token: "",

    login: function() {
        var provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithRedirect(provider).then(function() {

          //für Android-App
        return firebase.auth().getRedirectResult();}).then(function(result) {
            if (result.credential) {
              account.token = result.credential.accessToken;
            }
            account.user = result.user;

            gallery.initialize();
        
          }).catch(function(error) {
            console.log("FEHLER");
          });
    }
}

//für Browser
firebase.auth().getRedirectResult().then(function(result) {
    if (result.credential) {
      account.token = result.credential.accessToken;
    }
    account.user = result.user;

    gallery.initialize();

  }).catch(function(error) {
    console.log("FEHLER");
  });