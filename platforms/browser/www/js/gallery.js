var gallery = {

    initialize: function() {
        var html = "";
        console.log(account.token);
        if(account.token == "") {
            html += "<p>Nicht eingeloggt</p>";
        } else {
            html += "<p>Eingeloggt</p>"
        }
        $('#gallery').html(html);
    }
}