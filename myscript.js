$(document).ready(function(){
    var appid = "99ea83ab5edd87db522c57b59c0eb8cc";
    var $searchInput = $(".search input");
    var $searchBtn = $(".search button");
    var $detailsMain = $(".detailsMain");
    var $forecast = $(".forecast");

    function getCurrentWeather(city){
        console.log(city);

        var queryUrl = "http://api.openweathermap.org/data/2.5/weather?appid=" + appid + "&units=imperial&q=" + city;
        $ajax({
            url: queryUrl,
            method: "GET"
        }).then(function(res){
            console.log(res);

            $detailsMain.find(".city").text(city);
            $detailsMain.find(".temp span").text(res.main.temp);
            $detailsMain.find(".humid span").text(res.main.humidity);
            $detailsMain.find(".wind span").text(res.wind.speed);

            $detailsMain.show();
        }).catch(function(err){
            console.log(error);
        });
    }

    $searchBtn.on("click", function(){
        if($searchInput.val()){
            getCurrentWeather($searchInput.val());
            $searchInput.val("");
        }
    });

    $detailsMain.hide();
    $forecast.hide();

});




