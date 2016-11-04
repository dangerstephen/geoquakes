// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
var map;
$(document).on("ready", function() {

    function getQuakes() {
        $.ajax({
            method: 'GET',
            url: weekly_quakes_endpoint,
            dataType: 'JSON',
            success: onSuccess
        });
    }

    function onSuccess(json) {
        var features = json.features
        var source = $('#earthquake-li-templete').html();
        var template = Handlebars.compile(source);
        var quakesHtml = template({
            earthquakes: features
        })
        $('#earthquake-list').append(quakesHtml);
        getPins(features);
    }

    function initMap() {
        var uluru = {
            lat: 37.78,
            lng: -122.44
        };
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 2,
            center: uluru
        });
    }

    function getPins(features) {
        for (var i = 0; i < features.length; i++) {
            var coords = features[i].geometry.coordinates;
            var latLng = new google.maps.LatLng(coords[1], coords[0]);
            var marker = new google.maps.Marker({
                position: latLng,
                map: map
            });
        }

    }


    getQuakes();
    initMap();

});
