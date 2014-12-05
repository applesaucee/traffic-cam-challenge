// List of Seattle Traffic Cameras
// http://data.seattle.gov/resource/65fc-btcc.json

"use strict";

//put your code here to create the map, fetch the list of traffic cameras
//and add them as markers on the map
//when a user clicks on a marker, you should pan the map so that the marker
//is at the center, and open an InfoWindow that displays the latest camera
//image
//you should also write the code to filter the set of markers when the user
//types a search phrase into the search box



function onReady() {
    var infoWin = new google.maps.InfoWindow();

    var mapOptions = {
        center: {lat: 47.6, lng: -122.3},
        zoom: 12
    };

    var map = new google.maps.Map(document.getElementById('map'), mapOptions);

    
    var mapElem = document.getElementById('map');
    
    var marker;

    var position;
    
    
    $.getJSON('http://data.seattle.gov/resource/65fc-btcc.json')
        .done(function(data) {
            //success
            for (var idx = 0; idx < data.length; idx++) {
                var mLat = parseFloat(data[idx].location.latitude);
                var mLng = parseFloat(data[idx].location.longitude);
                position = {lat: mLat, lng: mLng};
                marker = new google.maps.Marker({
                    position: position,
                    map: map
                })
            }
        }) //end done
        .fail(function(error) {
            //error contains error info
            alert("Failed to get JSON.")
        })
        .always(function() {
            //called on either sucess or error cases
        })
    
    function test() {
        console.log('event listener for marker is working');
    }
    
    google.maps.event.addListener(marker, 'click', onMarkerClick)


} //end onReady

function onMarkerClick() {
    map.panTo(this.getPosition());
    infoWin.open(map, this);
}

$(onReady);