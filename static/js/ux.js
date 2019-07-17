// UX.js
// Scripts for a better UX


// Link "Enter" key to button clic 
$(document).ready(function() {
    
    $("#searchbar").keyup(function(event) {
        if (event.keyCode === 13) { 
            $("#submitArticles").click();
        }
    });
    
});


// Hide menu 2 while on menu 1 (necessary due to the sliding panel)
let timer;

$("#wrapper").mouseenter(function () {
        $("#wrapper-2").removeClass("noblur");
        $("#wrapper-2").addClass("blur");
        clearTimeout(timer);
        $("#wrapper-2").addClass("z-index-2");
    }).mouseleave(function(){
        $("#wrapper-2").removeClass("blur");
        $("#wrapper-2").addClass("noblur");
        timer = setTimeout(function() {
            $("#wrapper-2").removeClass("z-index-2");
        }, 1000)
    });


// Scroll smoothly to element
$("#submitTweets").click(function () {
    setTimeout( function () {
        $('html, body').animate({
            scrollTop: $("#marker").offset().top
        }, 2000);
    },1500);
});


// Scroll smoothly to element
$("#submitArticles").click(function () {
    setTimeout( function () {
        $('html, body').animate({
            scrollTop: $("#marker").offset().top
        }, 2000);
    },1500);
});
