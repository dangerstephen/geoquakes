// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";

$(document).on("ready", function() {

  function getQuakes(){
    $.ajax({
      method: 'GET',
      url: weekly_quakes_endpoint,
      dataType: 'JSON',
      success: onSuccess
    });
  }
  function onSuccess(json){
    var source = $('#earthquake-li-templete').html();
    var template = Handlebars.compile(source);
    var quakesHtml = template({earthquakes: json.features})
    $('#earthquake-list').append(quakesHtml);



  }
getQuakes();
});
