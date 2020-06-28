$(document).ready(function () {

    // once search button is clicked, do the following work: 
    $("#search").on("click", function () {
        // collect what has been written in the text area 
        var cityName = $(this).siblings("#textArea").val();
        // clear text area
        $('#textArea').val('');
        // check if we've collected it 
        console.log(cityName);
        // store the city name in localstorage 
        localStorage.setItem(cityName, cityName);
        //call aJax
        callaJax();
        // clear the text once they press search
       
     
    });

    // var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";
    // a1a1a30d32db2a10c854b322fa1094ec = API Key 
    var queryURL = "http:api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=a1a1a30d32db2a10c854b322fa1094ec";

    $.ajax({
            url: queryURL,
            method: "GET"
        }) // function taking in the response from ajax
        .then(function (response) {
            var results = response.data;
            console.log(results);
        });

    

})