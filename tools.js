const request=require('request');
module.exports = {
    

    /**
    * return random image URLs from an API
    * @param string keyword-search term
    * @param int imageCount-number of random imageURLs
    * @return array of image URLs
    **/
    getRandomImages_cb: function (keyword, imageCount, callback) {
        var requestURL = "https://api.unsplash.com/photos/random?query=" + keyword + "&count=" + imageCount + "&client_id=2efa248d55b9d227366470869adfd84bc6cf9800c569e22933499dff6c789a38"
        request(requestURL, function (error, response, body) {//this is Async
            if (!error) {
                var parsedData = JSON.parse(body);
                var imageURLs = [];
                for (let i = 0; i < 9; i++) {
                    imageURLs.push(parsedData[i].urls.regular);
                }
                // console.log(imageURLs);
                // return imageURLs;
                callback(imageURLs);
            }
            else {
                // res.render("results", { "error": "Unable to access API" })
                console.log("error", error)
            }
        });
    }, //objects have commas

    getRandomImages_promise: function (keyword, imageCount) {
        var requestURL = "https://api.unsplash.com/photos/random?query=" + keyword + "&count=" + imageCount + "&client_id=2efa248d55b9d227366470869adfd84bc6cf9800c569e22933499dff6c789a38"
        return new Promise(function (resolve, reject) {
            request(requestURL, function (error, response, body) {//this is Async
                if (!error) {
                    var parsedData = JSON.parse(body);
                    var imageURLs = [];
                    for (let i = 0; i < 9; i++) {
                        imageURLs.push(parsedData[i].urls.regular);
                    }
                    // console.log(imageURLs);
                    // return imageURLs;
                    resolve(imageURLs);
                }
                else {
                    // res.render("results", { "error": "Unable to access API" })
                    console.log("error", error)
                }
            });
        })
    }
}