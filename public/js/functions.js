//add event listener to an element
$(document).ready(function(){
    $(".favoriteIcon").on("click",function(){
        alert($(this).prev().attr("src"));
        if($(this).attr("src")=="img/favorite_off.png"){
            $(this).attr("src","img/favorite_on.png");
        }
        else{
            $(this).attr("src","img/favorite_off.png");
        }
    });
});