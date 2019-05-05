//Create array with topics (breeds of dogs)
var breeds = [
	"golden retriever",
	"dachshund",
	"poodle",
	"labrador",
	"greyhound",
	"dobermann",
	"australian shephard",
	"husky",
	"terrier",
	"malamute",
	"corgi",
	"bulldog",
	"collie",
	"dalmatian",
	"bernese mountain dog",
	"bullmastiff",
	"great dane",
	"saint bernard",
	"rottweiler",
	"german shephard",
	"chihuahua",
	"cocker spaniel",
	"french bulldog"
];

//loop through each topic and add a button for each one in array
for (var i = 0; i < breeds.length; i++) {
	//create buttons, add attr data, add class, and apply the breed name to each button
	var button = $("<button>").text(breeds[i]);
	button.attr("data-doggo", breeds[i]);
	button.addClass("doggo-button");
	//set div id #butt-
	$("#button-area").append(button);
}


// On click function to add button, on clicking #add-doggo-button, 
$("#add-doggo-button").on("click", function () {
	//Already Existing boolean
	var alreadyHere = false;
	//if new-doggo-input.val is !== -1 then change already existing variable to true
	if (breeds.indexOf($("#new-doggo-input").val()) !== -1) {
		alreadyHere = true;
	}
	//if new-doggo-input.val isnt "True" then create a button and push the data to that button
	if ($("#new-doggo-input").val() !== "" && alreadyHere === false) {
		var newDoggo = $("#new-doggo-input").val().toLowerCase();
		breeds.push(newDoggo);
		var button = $("<button>").text(newDoggo);
		button.attr("data-doggo", newDoggo);
		button.addClass("doggo-button");

		$("#button-area").append(button);
	}
	$("#new-doggo-input").val("");
});

// On click function to query GIPHY API for data upon pressing a doggo-button
$(document).on("click", ".doggo-button", function () {
	var doggo = $(this).attr("data-doggo");
	//Set GIPHY API key
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
		doggo + "&api_key=wySMZMqnDLLvvxHWlWF9FWGBqzzjuQjU&limit=10";

		//AJAX
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function (response) {
		// set results to response.data
		var results = response.data;
		//Create results-container
		var resultArea = $("<section class='results-container'>");

		for (var i = 0; i < results.length; i++) {
			var ResultDiv = $("<div class='result-container'>");

			var rating = results[i].rating;

			var ratingtext = $("<p>").text("Rating: " + rating);
			
			var doggoGIF = $("<img class='result'>");

			//Change doggoGIF.attrs' accoordingly
			doggoGIF.attr("src", results[i].images.fixed_height_still.url);
			doggoGIF.attr("data-state", "still");
			doggoGIF.attr("data-still", results[i].images.fixed_height_still.url);
			doggoGIF.attr("data-animate", results[i].images.fixed_height.url);

			//Prepend gif and rating into Result Div
			ResultDiv.prepend(doggoGIF);
			ResultDiv.prepend(ratingtext);

			//Prepend ResultDiv to the resultArea
			resultArea.prepend(ResultDiv);
		}
		//Append resultArea into #doggo-div
		$("#doggo-div").prepend(resultArea);
	});
});


//on click, animate the GIF, on click again, set GIF to still (by reseting it)
$(document).on("click", ".result", function () {
	var state = $(this).attr("data-state");

	//if state === still, then animate it on click
	if (state === "still") {
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state", "animate");

		// or else make it still
	} else {
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");
	}
});