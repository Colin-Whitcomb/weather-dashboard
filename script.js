$(document).ready(function () {

    // once search button is clicked, do the following work: 
    $("#search").on("click", function () {
        // event.preventDefault();

        // collect what has been written in the text area 
        var cityName = $(this).siblings("#textArea").val();
        // check if we've collected it 
        console.log(cityName);
        // a1a1a30d32db2a10c854b322fa1094ec = API Key 
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=a1a1a30d32db2a10c854b322fa1094ec";
        // clear the text once they press search
        $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {
                console.log(response);
                
                // store the city name in localstorage 
                localStorage.setItem(cityName, cityName);
                // clear text area
                $('#textArea').val('');
            });
    });
})