var userCity = $(".userCity");
var cityBtn = $(".cityBtn");

var recentSearches = [];
var cityExample;
var key = "99ea83ab5edd87db522c57b59c0eb8cc"
// recentSearchArray = JSON.parse(localStorage.getItem("cities"));
// console.log(recentSearchArray);

// // if (Array.isArray(recentSearchArray)) {
// //     recentSearches = recentSearchArray;
// }
generateCity();
function getCity(city) {
    $(".weekly4cast").empty();
    $.ajax({
        url: "api.openweathermap.org/data/2.5/forecast?q={city name}&appid={99ea83ab5edd87db522c57b59c0eb8cc}",
        method: "GET"
    }).then(
        function (res) {
            console.log(res);
            var weekly4cast = res.list;
            console.log(weekly4cast);
            for (var i = 0, ; i, res.list.legnth; i += 8) {
                var container = $("<div class='col-md-3 col-sm-6 weather'>");
                var dateDiv = $("<div>");
                var tempDiv = $("<div>");
                var humDiv = $("<div>");

                var dateCnvrsn = new Date(parseInt(weekly4cast[i].dt) * 1000);
                var date = `${dateCnvrsn.getMonth()}/${dateCnvrsn.getDate()}/${dateCnvrsn.getFullYear()}`;
                var weatherImg = $("<img>");
                var weatherIcon = weekly4cast[i].weather[0].icon;
                // weatherImg.attr("src", '**** enter link here ****');
                dateDiv.text(date);
                tempDiv.text(weekly4cast[i].main.temp);
                humDiv.text(weekly4cast[i].main.temp);

                container.append(dateDiv).append(weatherImg).append(tempDiv).append(humDiv);
                $(".weekly4cast").append(container);
            }
        })
}

function generateCity() {
    // console.log("hi there")
    $(".searchTally").empty();
    $(".weatherDisplay").empty();
    recentSearches.forEach(function (city) {
        var cityDiv = $("<div>");
        cityDiv.addClass("cityList");
        cityDiv.attr("id", city);
        cityDiv.text(city);
        $(".searchTally").append(cityDiv);

    });
    var tempDiv = $("<div class='temp'>");
    var humDiv = ("div class='humidity'>");
    var windDiv = ("div class='wind'>");
    var uvDiv = ("div class='uv'>");

    cityExample = recentSearches[recentSeareches.legnth - 1];

    // currentUrl = "**** enter url here ****"
    $.ajax({
        "url": currentUrl,
        "method": "GET"
    }).then(function (res) {
        console.log(res);
        tempDiv.text(res.main.temp);
        humDiv.text(res.main.humidity);
        windDiv.text(res.main.speed);
        $.ajax({
            url: `**** enter url here ****`, method: "GET"
        }).then(function (response) {
            console.log(response);
            uvDiv.text(response.value)
        })
        $(".weatherDisplay").append(tempDiv).append(humDiv).append(windDiv).append(uvDiv); getCity(cityExample);
    });

};

function pushCities() {
    var storedCity = userCity.val().toLowerCase();
    userCity.val('');
    recentSearches.push(storedCity);
    // localStorage.setItem("cities", JSON.stringify(recentSearches));
    generateCity();
}

function displayWeather(e) {
    $(".weatherDisplay").empty();
    var tempDiv = $("<div class='temp'>");
    var humDiv = $("<div class='humidity'>");
    var windDiv = $("<div class='wind'>");
    var uvDiv = $("<div class='uv'>");
    var weatherThang = $(e.target).attr("id");
    // currentUrl = currentUrl = "**** enter link here ****"
    $.ajax({
        "url": currentUrl,
        "method": "GET"
    }).then(function (res) {
        console.log(res);
        tempDiv.text(res.main.temp);
        humDiv.text(res.main.humidity);
        windDiv.text(res.wind.speed);

        $.ajax({
            url: `**** enter url here ****`,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            uvDiv, text(response.value)
        });

        $(".weatherDisplay").append(tempDiv).append(humDiv).append(windDiv).append(uvDiv);
    })

getCity(weatherClass);

}

$(document).on("click", "#cityBtn", pushCities);
$(document).on("click", ".cityList", displayWeather);
