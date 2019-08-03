// import { get } from "http";

//add event listener to an element
$(document).ready(function () {
    $(".favoriteIcon").on("click", function () {//add/remove from database when favoriteIcon is clicked
        var imageURL = $(this).prev().attr("src");
        if ($(this).attr("src") == "img/favorite_off.png") {
            $(this).attr("src", "img/favorite_on.png");
            updateFavorite("add", imageURL);//inserts a new record
        }
        else {
            $(this).attr("src", "img/favorite_off.png");
            updateFavorite("delete", imageURL);//deletes a new record
        }
    });

    $("#favorites").on("click",".favoriteIcon", function(){//add/remove from favorites and database when favoriteIcon is clicked
        var imageURL = $(this).prev().attr("src");
        if ($(this).attr("src") == "img/favorite_off.png") {
            $(this).attr("src", "img/favorite_on.png");
            updateFavorite("add", imageURL);//inserts a new record
        }
        else {
            $(this).attr("src", "img/favorite_off.png");
            updateFavorite("delete", imageURL);//deletes a new record
        }
    });
    
    $(".keywordLink").on("click", function () {
        $.ajax({
            method: "get",
            url: "/api/displayFavorites",
            data: {
                "keyword": $(this).text().trim(),
            },
            success: function (rows, status) {
                $("#favorites").html("");
                rows.forEach(function (row, i) {
                    if (i % 4 == 0) {//makes rows of 4 then a break
                        $("#favorites").append("<br/>");
                    }
                    else {//adds to the end if cant make a row of 4
                        $("#favorites").append("  ");
                    }
                    $("#favorites").append(
                        "<div class='imageContainer'><img class='image' src=" + row.imageURL + " width='150' height='150'><img class='favoriteIcon' src='img/favorite_on.png' width='20'></div>"
                    );

                })
            }
        });//ajax
    });6

    function updateFavorite(action, imageURL) {
        $.ajax({
            method: "get",
            url: "/api/updateFavorites",
            data: {
                "imageURL": imageURL,
                "keyword": $("#keyword").val(),
                "action": action
            }
        });//ajax
    }//updateFavorite
});