$(function(){

    $('#pro-modal-slide-right').on('click', function(){
        var $focusPhoto = $('#profile-modal-large-img');
        var $focusSource = $focusPhoto.attr('src');
        var $sourceIndex = parseInt($focusSource.slice(10,12));
        if ($sourceIndex >= 41) {
            $sourceIndex = 0;
        }
        $focusPhoto.attr('src', "images/ian" + ($sourceIndex + 1) + ".jpg");
    });

    $('#profile-modal-large-img').on('click', function(){
        var $focusPhoto = $('#profile-modal-large-img');
        var $focusSource = $focusPhoto.attr('src');
        var $sourceIndex = parseInt($focusSource.slice(10,12));
        if ($sourceIndex >= 41) {
            $sourceIndex = 0;
        }
        $focusPhoto.attr('src', "images/ian" + ($sourceIndex + 1) + ".jpg");
    });

    $('#pro-modal-slide-left').on('click', function(){
        var $focusPhoto = $('#profile-modal-large-img');
        var $focusSource = $focusPhoto.attr('src');
        var $sourceIndex = parseInt($focusSource.slice(10,12));
        if ($sourceIndex <= 1) {
            $sourceIndex = 42;
        }
        $focusPhoto.attr('src', "images/ian" + ($sourceIndex - 1) + ".jpg");
    });
           
});