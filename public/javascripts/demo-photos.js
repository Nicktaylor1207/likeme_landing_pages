$(function(){

    $('#pro-modal-slide-right').on('click', function(){
        var $focusPhoto = $('#profile-modal-large-img');
        var $focusSource = $focusPhoto.attr('src');
        alert($focusSource);
        var $sourceIndex = parseInt($focusSource.slice(12,13));
        
        alert($sourceIndex);
        // $focusPhoto.attr('src', "images/coffee1-" + ($sourceIndex + 1) + ".jpg");
    });
           
});