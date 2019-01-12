var gallery = {

    initialize: function() {
        var html = "";
        if(!account.isLogind()) {
            html += "<p>Nicht eingeloggt</p>";
        } else {
            html += "<p>Eingeloggt</p>"
        }
        $('#gallery').html(html);
    }
}