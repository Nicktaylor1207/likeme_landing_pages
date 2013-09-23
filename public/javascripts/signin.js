$(function() {
    var button = $('#loginButton');
    var button2 = $('#login-button2');
    var box = $('#loginBox');
    var form = $('#loginForm');
    button.removeAttr('href');
    button.on('click', function(login) {
        box.toggle();
        button.toggleClass('active');
        $('#focus-login').focus();
    });
    
    button2.on('click', function(login) {
        box.toggle();
        button.toggleClass('active');
        $('#focus-login').focus();
    });
    
    form.mouseup(function() { 
        return false;
    });
    
    $(this).mouseup(function(login) {
        if(!($(login.target).parent('#loginButton').length > 0)) {
            button.removeClass('active');
            box.hide();
        }
    });

    
    
});