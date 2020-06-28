$(document).ready(function () {



    // once search button is clicked, do the following work: 
    $("#search").on("click", function () {
        // event.preventDefault();
        $('#currDayDiv').removeClass('hide');
        $('#fiveDayDiv').removeClass('hide');




        // collect what has been written in the text area 
        var cityName = $(this).siblings("#textArea").val();
        // check if we've collected it 
        console.log(cityName);


        var queryURLa = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=a1a1a30d32db2a10c854b322fa1094ec";
        // getting weather info
        $.ajax({
            url: queryURLa,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            $('#currentCity').text(response.name);
            $('#currentTemp').text("Current temperature: " + response.main.temp);
            $('#currentHumidity').text("Current humidity: " + response.main.humidity);
            $('#currentWind').text("Current wind speed: " + response.wind.speed);
            $('#currentDay').text(moment().format("dddd, MMMM Do YYYY"));

            // Setting up variables for subsequent aJax calls.
            var lat = response.coord.lat;
            var long = response.coord.lon;
            var currentUV = "https://api.openweathermap.org/data/2.5/uvi/forecast?appid=a1a1a30d32db2a10c854b322fa1094ec&lat=" + lat + "&lon=" + long + "&cnt=1";
           

            // using first response to find weather iconID 
            // putting that icon in current weather 
            var iconID = response.weather[0].icon;
            var queryIcon = "https://openweathermap.org/img/wn/" + iconID + "@2x.png";
            $('#currWeatherIcon').attr("src", queryIcon);

            // aJax call for UV info
            $.ajax({
                url: currentUV,
                method: "GET"
            }).then(function (responseB) {
                var pointB = responseB;
                $('#currentUV').text("Current UV: " + pointB[0].value);

                // create conditional for color change
                if (pointB[0].value < 6){
                    $('#currentUV').addClass('favorable');
                    $('#currentUV').removeClass('moderate');
                    $('#currentUV').removeClass('severe');
                } else if ((pointB[0].value > 5) && (pointB[0].value < 8)) {
                    $('#currentUV').addClass('moderate');
                    $('#currentUV').removeClass('severe');
                    $('#currentUV').removeClass('favorable');
                } else { 
                    $('#currentUV').addClass('severe');
                    $('#currentUV').removeClass('moderate');
                    $('#currentUV').removeClass('favorable');
                }
            });
            
                // store the city name in localstorage 
                localStorage.setItem(cityName, cityName);
                // clear text area
                $('#textArea').val('');

           
        });

        // This will be for the 5 day forcast 
        // a1a1a30d32db2a10c854b322fa1094ec = API Key 
        var queryURLb = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=a1a1a30d32db2a10c854b322fa1094ec";
        // clear the text once they press search
        $.ajax({
                url: queryURLb,
                method: "GET"
            }).then(function(responseC) {
                console.log(responseC);

            });
    });
})