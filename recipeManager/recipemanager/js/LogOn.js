﻿function LogOnUser() {
    var id = document.getElementById("signin_username").value;
    var pwd = document.getElementById("signin_password").value;

    LogOn(id, pwd);
}

function ClearInputs() {
    document.getElementById("signin_username").value = "";
    document.getElementById("signin_password").value="";

}

function LogOn(userId, pass) {

    //url of webservice we will be talking to
    var webMethod = "../RecipeServices.asmx/LogOn";
    var parameters = "{\"uid\":\"" + encodeURI(userId) + "\",\"pass\":\"" + encodeURI(pass) + "\"}";
    //jQuery ajax method
    $.ajax({
        //post is more secure than get, and allows
        //us to send big data if we want.  really just
        //depends on the way the service you're talking to is set up, though
        type: "POST",
        //the url is set to the string we created above
        url: webMethod,
        //same with the data
        data: parameters,
        //these next two key/value pairs say we intend to talk in JSON format
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        //jQuery sends the data and asynchronously waits for a response.  when it
        //gets a response, it calls the function mapped to the success key here
        success: function (msg) {
            //the server response is in the msg object passed in to the function here
            //since our logon web method simply returns a true/false, that value is mapped
            //to a generic property of the server response called d (I assume short for data
            //but honestly I don't know...)
            if (msg.d) {
                //server replied true, so show the accounts panel
                window.open("splashPage.html","_self");
                //alert("hi");
            }
            else {
                //server replied false, so let the user know
                //the logon failed
                ClearInputs();
                document.getElementById("errorMsg").innerText = "Your username/pwd is incorrect. Please try logging in again!";
                document.getElementById("errorMsg").style.color = "red";
            }
        },
        error: function (e) {
            //if something goes wrong in the mechanics of delivering the
            //message to the server or the server processing that message,
            //then this function mapped to the error key is executed rather
            //than the one mapped to the success key.  This is just a garbage
            //alert becaue I'm lazy
            alert("boo...");
        }
    });
}