$(function(){
  /* Set the appId based on dev vs env mode */
  if (document.domain == 'localhost') {
    var dynAppId = '773135269370645';
  } else {
    var dynAppId = '337007326441493';
  }

  function postNewUser(response) {
    console.log("postNewUser called to server")
    $.ajax({
      type: "POST",
      url: '/fb-login',
      data: { fbUserID: response.authResponse.userID },
      datatype: 'json'
    });
    return false;
  }

  window.fbAsyncInit = function() {
    FB.init({
      appId      : dynAppId,
      status     : true, // check login status
      cookie     : true, // enable cookies to allow the server to access the session
      xfbml      : true  // parse XFBML
    });

    FB.getLoginStatus(function(response) {
      if (response.status != 'connected') {
        $('#fb-login-modal').modal('show');
      } else {
        findFriends();
      }
    });

    FB.Event.subscribe('auth.login', function(response) {
      postNewUser(response);
      findFriends();
    });

    // Here we subscribe to the auth.authResponseChange JavaScript event. This event is fired
    // for any authentication related change, such as login, logout or session refresh. This means that
    // whenever someone who was previously logged out tries to log in again, the correct case below 
    // will be handled. 
    FB.Event.subscribe('auth.authResponseChange', function(response) {
      // Here we specify what we do with the response anytime this event occurs. 
      if (response.status === 'connected') {
        $('#fb-login-modal').modal('hide');
        // The response object is returned with a status field that lets the app know the current
        // login status of the person. In this case, we're handling the situation where they 
        // have logged in to the app.
        // window.location.replace('/sportsvids');
        // findFriends();
      } else if (response.status === 'not_authorized') {
        // In this case, the person is logged into Facebook, but not into the app, so we call
        // FB.login() to prompt them to do so. 
        // In real-life usage, you wouldn't want to immediately prompt someone to login 
        // like this, for two reasons:
        // (1) JavaScript created popup windows are blocked by most browsers unless they 
        // result from direct interaction from people using the app (such as a mouse click)
        // (2) it is a bad experience to be continually prompted to login upon page load.
        // $('#fb-login-modal').modal('show');
        FB.login();
      } else {
        // In this case, the person is not logged into Facebook, so we call the login() 
        // function to prompt them to do so. Note that at this stage there is no indication
        // of whether they are logged into the app. If they aren't then they'll see the Login
        // dialog right after they log in to Facebook. 
        // The same caveats as above apply to the FB.login() call here.
        // $('#fb-login-modal').modal('show');
        FB.login();
      }
    });
  };

  // Load the SDK asynchronously
  (function(d){
    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement('script'); js.id = id; js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js";
    ref.parentNode.insertBefore(js, ref);
  }(document));

  // Here we run a very simple test of the Graph API after login is successful. 
  // This testAPI() function is only called in those cases. 
  // function testAPI() {
  //   console.log('Welcome!  Fetching your information.... ');
  //   FB.api('/me/friends?', function(response) {
  //     console.log(response.data[0]);
  //   });
  // }

  function findFriends(){
    FB.api('/me/friends?', function(response){
      var friendList = response.data;
      var userIds = []
      $.each(users, function(index, user){
        userIds.push(user.fbUserID);
      });
      var userFriends = [];
      /* Switch from checking users in facebook friends to facebook friends */
      /*  in users once signups exceed 1,000 */
      $.each(userIds, function(i, userId){
        $.grep(friendList, function(friend, index){
          if (friend.id == userId) {
            userFriends.push(friend);
          }
        });
      });
      activityFeed(userFriends);
    });
  }

  /* Activity Feed */
  function activityFeed(userFriends){
    if (userFriends.length) {
      var userFriendList = ""
      $.each(userFriends, function(index, userFriend){
        if (userFriends[index + 1]) {
          userFriendList += userFriend.name + ", "  
        } else {
          userFriendList += "and " + userFriend.name
        }
      });
      $('#sv-activity-feed').append('<p id="sv-user-friend-list">Your friends ' + userFriendList + ' use this app.</p>');
    }
  }

});














