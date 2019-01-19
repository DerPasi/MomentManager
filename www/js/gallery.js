var gallery = {

    initialize: function() {
        var html = "";
        if(!account.isLogind()) {
            html = "<p>Sie müssen eingeloggt sein, um den vollen Umfang von MomentManger nutzen zu können!</p>";
            $('#gallery').html(html);
        } else {

            firebase.database().ref('/UserOfPics/' + account.uid).once('value').then(function(snapshot) {
                console.log(snapshot.val());
                var pictures = snapshot.val();
                var bilderVorhanden = false;
                for(element in pictures) {
                    var html_pic = '';
                    html_pic += '<div class="gallery_entry"><div class="gallery_titel">';
                    html_pic += '<h2>' + pictures[element].titel + '</h2>';
                    html_pic += '<svg class="pic_menu" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M12 18c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0-9c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0-9c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3z"/></svg>';
                    html_pic += '<div class="pic_delete invisible"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg></div>';
                    html_pic += '</div><div class="gallery_img">'
                    html_pic += '<img src="data:image/jpeg;base64,' + pictures[element].photo + '">';
                    html_pic += '</div><div class="gallery_description">'
                    html_pic += '<p>' + pictures[element].description + '</p>';
                    html_pic += '</div></div>';
                    html = html_pic + html;
                    bilderVorhanden = true;
                }
                if(!bilderVorhanden) {
                    html = '<p>Keine Bilder vorhanden</p>';
                }
                $('#gallery').html(html);
              });
        }
    },

    toggleMenu: function() {
        if($(this).hasClass('active')) {
            console.log('active');
            $(this).parent().find('.pic_delete').animate({
                right: '-50px'
            }, 300, function() {
                $(this).parent().find('.pic_delete').toggleClass('invisible');
            });
        } else {
            console.log('not active');
            $(this).parent().find('.pic_delete').toggleClass('invisible');
            $(this).parent().find('.pic_delete').animate({
                right: '10px'
            }, 300);
        }

        $(this).toggleClass('active');
    }
}

$('#gallery').on('click', '.pic_menu', gallery.toggleMenu);