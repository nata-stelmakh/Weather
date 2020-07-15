
// GIVEN a weather dashboard with form input
// when I open the app I see dasboard divided in two parts
// on the left i have an input form with search button
// When I click on a search button , it will take a text from the input and add into url

// <!-- This button will trigger our AJAX call -->
//===========Some examples from the other exersizes================

// <input id="find-movie" type="submit" value="Movie Search">
// <button class="btn btn-outline-secondary" type="button" id="search" id="button-addon2">Search</button>
//==============================================================

//Create a search input to find a city
//When click submit button, return a city from an API

// Start with ajax call that will pull out info
   
   // On a major dashboard i see :
   //current city
   //cities that user been looking before
   
    var cityname=""
     // Initial array of cities
    var cities = ["Wanaque", "Haskell","Ringwood"];

    // Function for displaying previewed cities

    function renderButtons() {
    $("#chosenPlaces").empty()
   // Delete the content inside the buttons-view div prior to adding new movies
   // (this is necessary otherwise you will have repeat buttons)
   for (var i = 0; i < cities.length; i++) {

    //       // Then dynamicaly generating buttons for each movie in the array
    //       // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
    //       // Adding a class of movie to our button
          a.addClass("savedCity");
    //       // Adding a data-attribute
          a.attr("data-name", cities[i]);
    //       // Providing the initial button text
          a.text(cities[i]);
    //       // Adding the button to the buttons-view div
          $("#chosenPlaces").append(a);
        }
    }
       renderButtons()

//======================CLICK EVENT

   $("#search").on("click", function(event) {
      
    $("#currentCity").empty()
    $("#forecast").empty()


   //Here we grab the text from the input box
    var cityname = $("#townSearch").val().trim();
    console.log(cityname)
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
    // WHEN I search for a city
    // THEN I am presented with current and future conditions for that city and that city is added to the search history

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
// The city from the textbox is then added to our array
   cities.push(cityname);
 // Calling renderButtons which handles the processing of our city movie array
   renderButtons();
})
   })


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

 
 // This function handles events where the add movie button is clicked
 
//  function renderButtons() {

//     // Deleting the buttons prior to adding new movies
//     // (this is necessary otherwise you will have repeat buttons)
//     $("#buttons-view").empty();

//     // Looping through the array of movies
//     for (var i = 0; i < movies.length; i++) {

//       // Then dynamicaly generating buttons for each movie in the array
//       // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
//       var a = $("<button>");
//       // Adding a class of movie to our button
//       a.addClass("movie");
//       // Adding a data-attribute
//       a.attr("data-name", movies[i]);
//       // Providing the initial button text
//       a.text(movies[i]);
//       // Adding the button to the buttons-view div
//       $("#buttons-view").append(a);
//     }
//   }