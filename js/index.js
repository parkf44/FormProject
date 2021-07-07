var firebaseConfig = 
{
    apiKey: "AIzaSyAINKaxU5I2Th_IkHgOU7wta_Ay06155-c",
    authDomain: "projects-adb2d.firebaseapp.com",
    projectId: "projects-adb2d",
    storageBucket: "projects-adb2d.appspot.com",
    messagingSenderId: "344524036122",
    appId: "1:344524036122:web:00619df30ed2aadf7d59a3",
    measurementId: "G-1J669K138T"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  firebase.auth.Auth.Persistence.LOCAL;

$("#btn-login").click(function()
{
    var email = $("#email").val();
    var password = $("#password").val();

    if(email != ""  &&  password != "")
    {
        var result = firebase.auth().signInWithEmailAndPassword(email, password);

        result.catch(function(error)
        {
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(errorCode);
            console.log(errorMessage);

            window.alert("Messgae : " + errorMessage);
        });
    }
    else 
    {
        window.alert("Form is incomplete. Please fill out all fields.");
    }
});


$("#btn-signup").click(function()
{
    var email = $("#email").val();
    var password = $("#password").val();
    var cPassword = $("#confirmPassword").val();

    if(email != ""  &&  password != ""  &&  cPassword != "")
    {
        if(password == cPassword)
        {
            var result = firebase.auth().createUserWithEmailAndPassword(email, password);

        result.catch(function(error)
        {
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(errorCode);
            console.log(errorMessage);

            window.alert("Messgae : " + errorMessage);
        });
        }
        else
        {
            window.alert("Password do not match with the confirm Password.");
        }
    }
    else 
    {
        window.alert("Form is incomplete. Please fill out all fields.");
    }
});




$("#btn-resetPassword").click(function()
{
    var auth = firebase.auth();
    var email = $("#email").val();


    if(email != "")
    {
        auth.sendPasswordResetEmail(email).then(function()
        {
            window.alert("Email has been sent to you, Please check and verify.");
        })
        .catch(function(error)
        {
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(errorCode);
            console.log(errorMessage);

            window.alert("Messgae : " + errorMessage);
        });
    }
    else
    {
        window.alert("Please writ your email first");
    }
});





$("#btn-logout").click(function()
{
    firebase.auth().signOut();
});



$("#btn-update").click(function()
{
    var phone = $("#phone").val();
    var address = $("#address").val();
    var bio = $("#bio").val();
    var fName = $("#firstName").val();
    var sName = $("#secondName").val();
    var country = $("#country").val();
    var gender = $("#gender").val();

    var rootRef = firebase.database().ref().child("Users");
    var userID = firebase.auth().currentUser.uid;
    var usersRef = rootRef.child(userID);

    if(fName!=""  && sName!="" && phone!="" &&  country!=""  && gender!=""  &&  bio!="" && address!="")
    {
        var userData = 
        {
            "phone": phone,
            "address": address,
            "bio": bio,
            "firstName": fName,
            "secondName": sName,
            "country": country,
            "gender": gender,
        };

        usersRef.set(userData, function(error)
        {
            if(error)
            {
                var errorCode = error.code;
                var errorMessage = error.message;

                console.log(errorCode);
                console.log(errorMessage);

                window.alert("Messgae : " + errorMessage);
            }
            else
            {
                window.location.href = "MainPage.html";
            }
        });
    }
    else
    {
        window.alert("Form is incomplete. Please fill out all fields.");
    }
});


function switchView(view)
{
    $.get({
        url:view,
        catche:false,
    })
    .then(function(data){
        $("#container").html(data);
    });
}


db.collect('Users').get().then(member => 
{
    member.docs.forEach(doc => 
        {
            console.log(doc.data())
        })
});