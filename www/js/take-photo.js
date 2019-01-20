var takePhoto = {

    actualPhoto: "",

    takeNewPhoto: function() {
        navigator.camera.getPicture(takePhoto.onSuccess, takePhoto.onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            correctOrientation: true
        });
    },

    onSuccess: function(imageData) {
        takePhoto.actualPhoto = imageData;
        $('#new_photo_pic_pic').attr("src", "data:image/jpeg;base64," + imageData);

        $('#new_photo_pic_pic').css('display', 'block');
        $('#new_photo_pic_delete').css('display', 'inline-block');
        $('#new_photo_pic_renew').css('display', 'inline-block');

        $('#new_photo_pic_new').css('display', 'none');
    },

    onFail: function(msg) {
        console.log("ERROR: " + msg);
    },

    delete: function() {
        navigator.notification.confirm(
            "Wollen Sie das Bild wirklich wieder löschen?",
            takePhoto.onConfirm,
            'Hinweis',
            ['Abbrechen', 'Ja']
        );
    },

    onConfirm: function(pressedButton) {
        if(pressedButton == 2) {
            removePhoto();
        }
    },

    removePhoto: function() {
        takePhoto.actualPhoto = "";
            $('#new_photo_pic_pic').attr("src", "");

            $('#new_photo_pic_pic').css('display', 'none');
            $('#new_photo_pic_delete').css('display', 'none');
            $('#new_photo_pic_renew').css('display', 'none');

            $('#new_photo_pic_new').css('display', 'inline');
    },

    save: function() {

        var uid = account.uid;
        var titel = $('input[name=new_photo_title]').val();
        var photo = takePhoto.actualPhoto;
        var description = $('#new_photo_description').val();
        var date = Date.now();

        console.log(titel);
        console.log(photo);
        console.log(description);

        if(account.isLogind()) {
            if( !(titel == null || typeof titel === "undefined" || titel == "" || photo == null || typeof photo === "undefined" || photo == "")) {
                var data = {
                    user: uid,
                    titel: titel,
                    photo: photo,
                    description: description,
                    time: date
                }

                var newPostKey = account.uid + "_" + date;

                var updates = {};
                updates['/UserOfPics/' + account.uid + '/' + newPostKey] = data;

                firebase.database().ref().update(updates);

                takePhoto.removePhoto();

                $('input[name=new_photo_title]').val("");
                $('#new_photo_description').val("");

                window.plugins.toast.showWithOptions(
                    {
                      message: "Bild gespeichert!",
                      duration: "short",
                      position: "bottom"
                    }
                  );
                  gallery.initialize();
                  
            } else {
                navigator.notification.alert(
                    "Sie müssen ein Bild machen und diesem einen Titel geben, um es speichern zu können.",
                    null,
                    "Hinweis",
                    "OK"
                );
            }
        } else {
            navigator.notification.alert(
                "Sie müssen eingeloggt sein, um ein Bild speichern zu können.",
                null,
                "Hinweis",
                "OK"
            );
        }
    }
}

$('#new_photo_pic_new').click(takePhoto.takeNewPhoto);
$('#new_photo_pic_renew').click(takePhoto.takeNewPhoto);
$('#new_photo_pic_delete').click(takePhoto.delete);
$('#new_photo_save').click(takePhoto.save);