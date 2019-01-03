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
    }
}