
// when I open the app I see dasboard divided in two parts
// on the left i have an input form with search button
// When I click on a search button , it will take a text from the input and add into url

// <!-- This button will trigger our AJAX call -->
//===========Some examples from the other exersizes================

// <input id="find-movie" type="submit" value="Movie Search">
// <button class="btn btn-outline-secondary" type="button" id="search" id="button-addon2">Search</button>
//==============================================================


// Start with ajax call that will pull out info
   $("#search").on("click", function(event) {
      
    $("#currentCity").empty()
    $("#forecast").empty()


   //Here we grab the text from the input box
    var cityname = $("#townSearch").val();
    console.log(cityname)
   // On a major dashboard i see :
   //current city
    var domCity = $("<p>")
    $(domCity).text(cityname)
    $("#currentCity").append(domCity)

    
    // Here we construct our URL
    
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+cityname+"&appid=7daff24a3e69fdc92c380db5a8ea82e4&units=imperial"
    $.ajax({
    url: queryURL,
    method: "GET"
     }).then(function(response) {
         console.log(response)
    //============I SEE CURRENT DATE  
    //retrieves the current date data
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
   var unixdate =response.dt*1000
    console.log(unixdate)
    //format unix timestamp into normal day and hour
    var day = new Date(unixdate).toLocaleDateString("en-US")  
    console.log(day) 
    var time = new Date(unixdate).toLocaleTimeString("en-US")
    console.log(time)
    // Create a new JavaScript Date object based on the timestamp
   

   // creates an element to hold current data displayed
   var domDay = $("<p>")
   $(domDay).text(day+" "+time)
   //displays the data
   $("#currentCity").append(domDay)
   //===========I SEE TEMPERATURE
     var temp =response.main.temp
   console.log(temp)
  // creates an element to hold current data displayed
  var domTemp = $("<p>")
  $(domTemp).text(temp + "F")
  //displays the data
  $("#currentCity").append(domTemp)
    
//=============I SEE HUMIDITY    
//retrieves the current humidity data
var humid = response.main.humidity
console.log(humid)
// creates an element to hold current data displayed
var domHumid = $("<p>")
$(domHumid).text(humid+"%")
//displays the data
$("#currentCity").append(domHumid)
//================I SEE WIND SPEED
//retrieves the current wind speed data
var windSpeed = response.wind.speed
console.log(windSpeed)
// creates an element to hold current data displayed
var domWindSpeed = $("<p>")
$(domWindSpeed).text(windSpeed+"mph")
//displays the data
$("#currentCity").append(domWindSpeed)
//=======================Description
//retrieves the current wind speed data
var descript = response.weather[0].description
console.log(descript)
// creates an element to hold current data displayed
var domDescript = $("<p>")
$(domDescript).text(descript)
//displays the data
$("#currentCity").append(domDescript)


var longitude = response.coord.lon
var latitude = response.coord.lat
 

  
//  underneath the major dashboard  i see five cards with informatin of a next five days forecast
var queryURLforecast = "https://api.openweathermap.org/data/2.5/onecall?lat="+ latitude+"&lon="+ longitude+"&exclude={part}&appid=7daff24a3e69fdc92c380db5a8ea82e4&units=imperial"
//  = "http://api.openweathermap.org/data/2.5/forecast?q="+ cityname +"&appid=
    $.ajax({
    url: queryURLforecast,
    method: "GET"
     }).then(function(response) {
         console.log(response)
// each card contains 
for (var i = 1; i < 5; i++) {
 // date 
//format unix timestamp into normal day and hour
var nextDayDate = response.daily[i].dt*1000
console.log(nextDayDate)
var dayF = new Date(nextDayDate).toLocaleDateString("en-US")  
 console.log(dayF) 
  
  // creates an element to hold current data displayed
 var domDayF = $("<p>")
 $(domDayF).text(dayF)
 //displays the data
 $("#forecast").append(domDayF)

    
// Temperature response.temp
var tempF = response.daily[i].temp.day
   console.log(tempF)
  // creates an element to hold current data displayed
  var domTempF = $("<p>")
  $(domTempF).text(tempF + "F")
  //displays the data
  $("#forecast").append(domTempF)

// humidity response.main.humidity
var humidF = response.daily[i].humidity
   console.log(humidF)
  // creates an element to hold current data displayed
  var domHumidF = $("<p>")
  $(domHumidF).text(humidF + "%")
  //displays the data
  $("#forecast").append(domHumidF)

  var descriptF = response.daily[i].weather[0].description
console.log(descriptF)
// creates an element to hold current data displayed
var domDescriptF = $("<p>")
$(domDescriptF).text(descriptF)
//displays the data
$("#forecast").append(domDescriptF)
}

   });

})
   })


 // When I click on any button on the left it brings up on the dashboard info about chosen city
//   On the left side i see stacked buttons each of those is named by specific city 
//     Those buttons will be created in a process of working
// GIVEN a weather dashboard with form inputs

//Create a search input to find a city
//When click submit button, return a city from an API

// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history

//3.Create a stack of cards that will contain weather conditions 
//4.

// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
// WHEN I open the weather dashboard
// THEN I am presented with the last searched city forecast  