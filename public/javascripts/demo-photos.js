$(function(){

    $('#pro-modal-slide-right').on('click', function(){
        var $focusPhoto = $('#profile-modal-large-img');
        var $focusSource = $focusPhoto.attr('src');
        var $sourceIndex = parseInt($focusSource.slice(12,13));
        if (isNaN($sourceIndex)) {
            $sourceIndex = parseInt($focusSource.slice(13,14));
            $focusPhoto.attr('src', "images/ian10-" + ($sourceIndex + 1) + ".jpg");;
        } else {
            $focusPhoto.attr('src', "images/ian1-" + ($sourceIndex + 1) + ".jpg");
        }
        
    });
           
});