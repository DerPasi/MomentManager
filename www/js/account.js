var account = {

    token: "",

    login: function() {
        var provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithRedirect(provider).then(function() {

          //für Android-App
        return firebase.auth().getRedirectResult();}).then(function(result) {
            if (result.credential) {
              account.changedLoginStatus(result.credential.accessToken);
            }
          }).catch(function(error) {
            account.loginError();
          });
    },

    loginError: function() {
      navigator.notification.alert(
        "Sie konnten aktuell nicht angemeldet werden. Versuchen Sie es bitte später erneut.",
        null,
        "Hinweis",
        "OK"
      );
    },

    logout: function() {
      firebase.auth().signOut().then(function() {
        account.changedLoginStatus("");
      }, function(error) {
        account.logoutError();
      });
    },

    logoutError: function() {
      navigator.notification.alert(
        "Sie konnten aktuell nicht abgemeldet werden. Versuchen Sie es bitte später erneut.",
        null,
        "Hinweis",
        "OK"
      );
    },

    isLogind: function() {
      if(account.token == null || account.token == "") {
        return false;
      } else {
        return true;
      }
    },

    changedLoginStatus: function(token) {
      account.token = token;
      
      account.changeHeaderIcon();
      gallery.initialize();
    },

    changeHeaderIcon: function() {
      console.log(account.token);
      console.log(account.isLogind);
      if(account.isLogind()) {
        console.log("YES");
        $('#header_login').css('display', 'none');
        $('#header_logout').css('display', 'inline');
      } else {
        console.log("NO");
        $('#header_login').css('display', 'inline');
        $('#header_logout').css('display', 'none');
      }
    }
}

//für Browser
firebase.auth().getRedirectResult().then(function(result) {
    if (result.credential) {
      account.changedLoginStatus(result.credential.accessToken);
    }
  }).catch(function(error) {
    account.loginError();
  });

//initiale Ausführung
account.changedLoginStatus("");

$('#header_login').click(account.login);
$('#header_logout').click(account.logout);