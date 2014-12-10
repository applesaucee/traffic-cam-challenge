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
    var markers = [];
    
    $.getJSON('http://data.seattle.gov/resource/65fc-btcc.json')
        .done(function(data) {
            //success
            var mLat;
            var mLng;
            data.forEach(function(data) {
                mLat = parseFloat(data.location.latitude);
                mLng = parseFloat(data.location.longitude);
                position = {lat: mLat, lng: mLng};
                marker = new google.maps.Marker({
                         position: position,
                         map: map,
                         label: data.cameralabel,
                         url: data.imageurl.url
                })
                markers.push(marker);
                google.maps.event.addListener(marker, 'click', onMarkerClick)

                function onMarkerClick() {
                    map.panTo(this.getPosition());
                    infoWin.setContent(
                        '<p>'
                        + this.label + '<br>'
                        + '<img src="' + this.url 
                        + '" alt="Live camera image at'
                        + this.label + '"/>'                        
                        + '</p>'
                    );
                    infoWin.open(map, this);
                }
            })
            
            google.maps.event.addListener(map, 'click', onMapClick)
            
            function onMapClick() {
                infoWin.close();
            }
            
            $('#search').bind('search keyup', function() {
                var searchTxt = this.value.toLowerCase();
                var compare;
                markers.forEach(function(markers) {
                    compare = markers.label.toLowerCase();
                    if (compare.indexOf(searchTxt) == -1) {
                        markers.setMap(null);
                    }  
                    if (searchTxt == '') {
                        markers.setMap(map);
                    }
                })
            });
        
        }) //end done
        .fail(function(error) {
            alert("Failed to get JSON.")
        })
        .always(function() {
        })
} //end onReady

$(onReady);