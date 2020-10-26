$(document).ready(function () {

    // Global variables:
    var searchHistory = [];
    var appid = "99ea83ab5edd87db522c57b59c0eb8cc";
    var $searchInput = $(".search input");
    var $history = $(".history");
    var $searchBtn = $(".search button");
    var $detailsMain = $(".detailsMain");
    var $forecast = $(".forecast");

    // Retrieve search history from local storage and appends new searches to search history:
    function getHistory() {
        var historyStore = JSON.parse(localStorage.getItem("history"));
        if (historyStore) searchHistory = historyStore;
        $history.find("a").remove();
        searchHistory.forEach(function (item) {
            // console.log(item);
            $history.append('<a href="#" class="list-group-item list-group-item-action historyItem" data-city="' + item + '">' + item + '</a>');
        });

    }
    // Format date and time:
    function formatDate(dateTime) {
        var formattedDate = new Date(dateTime * 1000).toLocaleDateString(); return formattedDate;
    }
    // Retrieve current weather and calling UV function:
    function getCurrentWeather(city) {
        // console.log(city);

        var queryUrl = "https://api.openweathermap.org/data/2.5/weather?appid=" + appid + "&units=imperial&q=" + city;
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function (res) {
            console.log(res);

            $detailsMain.find(".city").text(city);
            $detailsMain.find(".date").text(formatDate(res.dt));
            $detailsMain.find(".icon").attr("src", "https://openweathermap.org/img/w/" + res.weather[0].icon + ".png");
            $detailsMain.find(".temp span").text(res.main.temp);
            $detailsMain.find(".humid span").text(res.main.humidity);
            $detailsMain.find(".wind span").text(res.wind.speed);
            $detailsMain.find(".uv span").attr("class", "").text("");
            getUV(res.coord.lat, res.coord.lon);

            $detailsMain.show();

            if (searchHistory.indexOf(city) < 0) {
                searchHistory.push(city);
                localStorage.setItem("history", JSON.stringify(searchHistory));
                getHistory();
            }

            get5DayWeather(city);
        }).catch(function (err) {
            console.log("error");
        });
    }
    // Retrieve UV data, 'lat' and 'lon' info coming from currentWeather:
    function getUV(lat, lon) {

        var queryUrl = "https://api.openweathermap.org/data/2.5/uvi?appid=" + appid + "&lat=" + lat + "&lon=" + lon;
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function (res) {
            console.log(res);

            $detailsMain.find(".uv span").text(res.value);
            if (res.value > 7) {
                $detailsMain.find(".uv span").addClass("bg-danger").addClass("text-white");
            } else if (res.value > 5) {
                $detailsMain.find(".uv span").addClass("bg-warning");
            } else {
                $detailsMain.find(".uv span").addClass("bg-success");
            }
        }).catch(function (err) {
            console.log("error");
        });
    }
    // Retrieve five-day forecast info:
    function get5DayWeather(city) {
        console.log(city);

        var queryUrl = "https://api.openweathermap.org/data/2.5/forecast?appid=" + appid + "&units=imperial&q=" + city;
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function (res) {
            console.log(res);

            var filteredList = res.list.filter(function (date) {
                return date.dt_txt.indexOf("15:00:00") > -1;
            });
            // console.log(filteredList);

            filteredList.forEach(function (date, i) {
                $(".day" + (i + 1)).find(".date").text(date.dt_txt.slice(0, date.dt_txt.indexOf(" ")));
                $(".day" + (i + 1)).find(".date").text(formatDate(date.dt));
                $(".day" + (i + 1)).find(".icon").attr("src", "https://openweathermap.org/img/w/" + date.weather[0].icon + ".png");
                $(".day" + (i + 1)).find(".temp span").text(date.main.temp);
                $(".day" + (i + 1)).find(".humid span").text(date.main.humidity);

            });

            $forecast.show();
        }).catch(function (err) {
            console.log("error");
        });
    }
    // Create click event on search button:
    $searchBtn.on("click", function () {
        if ($searchInput.val()) {
            getCurrentWeather($searchInput.val());
            $searchInput.val("");
        }
    });
    // Create click event for recent searches list:
    $history.on("click", ".historyItem", function () {
        if ($(this).attr("data-city")) {
            getCurrentWeather($(this).attr("data-city"));
        }
    });

    $detailsMain.hide();
    $forecast.hide();
    getHistory();

});




