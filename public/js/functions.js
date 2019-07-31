// import { get } from "http";

//add event listener to an element
$(document).ready(function () {
    $(".favoriteIcon").on("click", function () {
        // alert($(this).prev().attr("src"));
        var imageURL = $(this).prev().attr("src");
        if ($(this).attr("src") == "img/favorite_off.png") {
            $(this).attr("src", "img/favorite_on.png");
            updateFavorite("add",imageURL);//inserts a new record
        }
        else {
            $(this).attr("src", "img/favorite_off.png");
            updateFavorite("delete",imageURL);//deletes a new record
        }
    });

    function updateFavorite(action, imageURL) {
        $.ajax({
            method: "get",
            url: "/api/updateFavorites",
            data: {
                "imageURL": imageURL,
                "keyword": $("#keyword").val(),
                "action": action
                }

        })
    }
});