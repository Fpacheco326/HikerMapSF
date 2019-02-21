var config = {
    apiKey: "AIzaSyA2pONRyHx2Q1EnlBz82MyeY34RYqp6zeU",
    authDomain: "project-1-3c6c9.firebaseapp.com",
    databaseURL: "https://project-1-3c6c9.firebaseio.com",
    projectId: "project-1-3c6c9",
    storageBucket: "project-1-3c6c9.appspot.com",
    messagingSenderId: "999253475842"
};
firebase.initializeApp(config);

var dataRef = firebase.database();

dataRef.ref('points').on("child_added", function (childSnapshot) {

    map.addLayer({
        "id": "points" + Math.random(),
        "type": "symbol",
        "source": {
            "type": "geojson",
            "data": {
                "type": "FeatureCollection",
                "features": [childSnapshot.val()]
            }
        },
        "layout": {
            "icon-image": "{icon}-15",
            "text-field": "{title}",
            "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
            "text-offset": [0, 0.6],
            "text-anchor": "top"
        }
    });
});



var sanFrancisco = [-122.414807, 37.786519];
var californiaCoastalTrail = [-122.48331, 37.79437];
var landsEnd = [-122.5066521, 37.7839045];
var mountDavidsonPark = [-122.4546867, 37.7387447];
var mountSutro = [-122.4572893, 37.758233];
var strawberryHill = [-122.4755271, 37.7685412];

mapboxgl.accessToken = 'pk.eyJ1IjoiZnBhY2hlY28zMjYiLCJhIjoiY2pydmhlMGZiMDI0dTQ0bzRwenBicWl1dyJ9.EVAjuC97CxLx-_zo3DMxnw';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/outdoors-v11',
    zoom: 12,
    center: sanFrancisco,
});

map.addControl(new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true
}));

var features = [{
    "type": "Feature",
    "geometry": {
        "type": "Point",
        "coordinates": sanFrancisco
    },
    "properties": {
        "title": "San Francisco",

    }
},
{
    "type": "Feature",
    "geometry": {
        "type": "Point",
        "coordinates": californiaCoastalTrail
    },
    "properties": {
        "title": "California Coastal Trail",
        "description": "<strong>California Coastal Trail</strong><p><a href=\"./assets/images/fortpointsf.jpg\" target=\"_blank\" title=\"Opens picture in a new window\">California Coastal Trail</a>The 2.7-mile segment that runs through the Presidio starts at the 25th Avenue Gate near Baker Beach, traces the rocky coastal bluffs, and ends at the iconic Golden Gate Bridge. </p>",
    "icon": "park"
    }
},
{
    "type": "Feature",
    "geometry": {
        "type": "Point",
        "coordinates": landsEnd
    },
    "properties": {
        "title": "Lands End",
        "description": "<strong>Lands End</strong><p><a href=\"./assets/images/landsEnd.jpg\" target=\"_blank\" title=\"Opens picture in a new window\">Lands End</a>The most popular trail within Lands End is another segment of the California Coastal Trail, extending from Ocean Beach to China Beach at a distance of 2.9 miles, with spectacular views of the coastline nearly every step of the way.  </p>",
    "icon": "park"
    }
},
{
    "type": "Feature",
    "geometry": {
        "type": "Point",
        "coordinates": mountDavidsonPark
    },
    "properties": {
        "title": "Mount Davidson Park",
        "description": "<strong>Mount Davidson Park</strong><p><a href=\"./assets/images/Mountdavidson.jpg\" target=\"_blank\" title=\"Opens picture in a new window\">Mount Davidson Park</a>Mount Davidson is the San Francisco’s highest hill at 927 feet. The one-mile trek up to the highest point is considered easy for most walkers and usually takes less than 15 minutes to reach the top. At the summit is the 103-foot-tall Mount Davidson Cross. </p>",
    "icon": "park"
    }
},
{
    "type": "Feature",
    "geometry": {
        "type": "Point",
        "coordinates": mountSutro
    },
    "properties": {
        "title": "Mount Sutro Open Space Reserve",
        "description": "<strong>Mount Sutro Open Space Reserve</strong><p><a href=\"./assets/images/sutroOSR.jpg\" target=\"_blank\" title=\"Opens picture in a new window\">Mount Sutro Open Space Reserve</a>. Covering 61 acres, the Open Space Preserve is described as a captivating hidden forest within the city that’s punctuated by the 908-foot summit named after Adolph Sutro, the influential mayor of San Francisco who served between 1894 and 1896. </p>",
    "icon": "park"
    }
},
{
    "type": "Feature",
    "geometry": {
        "type": "Point",
        "coordinates": strawberryHill
    },
    "properties": {
        "title": "Strawberry Hill GGP",
        "description": "<strong>California Coastal Trail</strong><p><a href=\"./assets/images/strawberry_hill_stow_lake.jpg\" target=\"_blank\" title=\"Opens picture in a new window\">California Coastal Trail</a>Sitting in the middle of Stow Lake, a man-made lake completed in the 19th century, Strawberry Hill features a Chinese pagoda, picnic area and Huntington Falls an artificially made waterfall and one of two within the park. The island is accessible by two bridges from the Stow Lake Drive encircling the lake, and hiking trails to the 430-foot summit . </p>",
    "icon": "park"
    }
},

];



var layerList = document.getElementById('menu');
var inputs = layerList.getElementsByTagName('input');

function switchLayer(layer) {
    var layerId = layer.target.id;
    map.setStyle('mapbox://styles/mapbox/' + layerId + '-v9');
}

for (var i = 0; i < inputs.length; i++) {
    inputs[i].onclick = switchLayer;
}

map.on('load', function () {

    map.addLayer({
        "id": "points",
        "type": "symbol",
        "source": {
            "type": "geojson",
            "data": {
                "type": "FeatureCollection",
                "features": features
            }
        },
        "layout": {
            "icon-image": "{icon}-15",
            "icon-allow-overlap": true
            },
        "layout": {
            "icon-image": "{icon}-15",
            "text-field": "{title}",
            "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
            "text-size": 30,
            "text-offset": [0, 0.6],
            "text-anchor": "top"
        }
    });
    map.on('click', 'points', function (e) {
        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = e.features[0].properties.description;
         
       
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
         
        new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(description)
        .addTo(map);
        });
         
     
        map.on('mouseenter', 'points', function () {
        map.getCanvas().style.cursor = 'pointer';
        });
         
    
        map.on('mouseleave', 'points', function () {
        map.getCanvas().style.cursor = '';
        });
    
});



$('button').on('click', function () {
    event.preventDefault();
    var originalAddress = $('#address').val();
    var title = $('#title').val();

    var formattedAddress = originalAddress.replace(/ /g, '%20');

    var geoPlace = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + formattedAddress + ".json?access_token=pk.eyJ1IjoiZnBhY2hlY28zMjYiLCJhIjoiY2pydmhlMGZiMDI0dTQ0bzRwenBicWl1dyJ9.EVAjuC97CxLx-_zo3DMxnw";

    $.ajax({
        url: geoPlace,
        method: 'GET'
    }).then(function (response) {
        var geocoords = response.features[0].center;

        var ob = {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": geocoords
            },
            "properties": {
                "title": title,

            }
        }
        console.log(response);
        dataRef.ref('points').push(ob);

        map.addLayer({
            "id": "points" + Math.random(),
            "type": "symbol",
            "source": {
                "type": "geojson",
                "data": {
                    "type": "FeatureCollection",
                    "features": [ob]
                }
            },
            "layout": {
                "icon-image": "{icon}-15",
                "text-field": "{title}",
                "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                "text-offset": [0, 0.6],
                "text-anchor": "top"
            }
        });

    })

});