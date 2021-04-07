//variables
var searchButton = $(".searchButton");
var apiKey = "ef5abdb71f846584dca1619109fb200e";

//search button click event
searchButton.click(function () {

    var searchInput = $(".searchInput").val();

    //variable for current weather  
    var urlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&Appid=" + apiKey + "&units=imperial";
    //variable for 5 day forecast 
    var urlFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&Appid=" + apiKey + "&units=imperial";
    
    if (searchInput == "") {
        console.log(searchInput);
    } else {
        $.ajax({
            url: urlCurrent,
            method: "GET"
        }).then(function (response) {
            //list-group append an li to it with just set text
            //console.log(response.name);
            var cityName = $(".list-group").addClass("list-group-item");
            cityName.append("<li>" + response.name + "</li>");
            
            //local storage
            var local = localStorage.setItem(keyCount, response.name);
            keyCount = keyCount + 1;

            //adjust date 
            var timeUTC = new Date(response.dt * 1000);
            currentName.append(response.name + " " + timeUTC.toLocaleDateString("en-US"));
            currentName.append(`<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">`);
            //add temp 
            var currentTemp = currentName.append("<p>");
            //addClass("card-text");
            currentName.append(currentTemp);
            currentTemp.append("<p>" + "Temperature: " + response.main.temp + "</p>");
            //add Humidity
            currentTemp.append("<p>" + "Humidity: " + response.main.humidity + "%" + "</p>");
        });
        
        //calling for 5-day forecast 
        $.ajax({
            url: urlFiveDay,
            method: "GET"
        }).then(function (response) {
            //array for 5 days 
            var day = [0, 8, 16, 24, 32];
            var fiveDayCard = $(".fiveDayCard").addClass("card-body");
            var fiveDayDiv = $(".fiveDayOne").addClass("card-text");
            fiveDayDiv.empty();
            //for each 5 days
            day.forEach(function (i) {
                var FiveDayTimeUTC1 = new Date(response.list[i].dt * 1000);
                FiveDayTimeUTC1 = FiveDayTimeUTC1.toLocaleDateString("en-US");
                fiveDayDiv.append("<div class=fiveDayColor>" + "<p>" + FiveDayTimeUTC1 + "</p>" + `<img src="https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png">` + "<p>" + "Temperature: " + response.list[i].main.temp + "</p>" + "<p>" + "Humidity: " + response.list[i].main.humidity + "%" + "</p>" + "</div>");
            })
        });
    }
});

