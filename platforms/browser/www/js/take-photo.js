var takePhoto = {

    takeNewPhoto: function() {
        navigator.camera.getPicture(takePhoto.onSuccess, takePhoto.onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            correctOrientation: true
        });
    },

    onSuccess: function(imageData) {
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
            $('#new_photo_pic_pic').attr("src", "");

        $('#new_photo_pic_pic').css('display', 'none');
        $('#new_photo_pic_delete').css('display', 'none');
        $('#new_photo_pic_renew').css('display', 'none');

        $('#new_photo_pic_new').css('display', 'inline');
        }
    }
}