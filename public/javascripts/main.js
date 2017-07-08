$( document ).ready(function() {
  console.log( "ready!" );

  var globalStationId;

  var stationIds = {
    'chinaTown': 80410,
    'southwestMuseum': 80413
  }

  var destinations = {
    "804_0_var0": 'Asuza / North',
    "804_1_var0": 'Atlantic / South'
  }


  $('#station-select').on('change', function() {
    reset();

    var stationId = $(this).val();
    globalStationId = stationId
    console.log("globalStationId", globalStationId);

  });

  $('#get-times').on('click', function() {

      if (globalStationId != undefined ) {
        var url = `/api/rail/${globalStationId}`
        console.log("url", url);

        getInfo(url, parseData)

      } else {
        console.log("select a station")
        alert("select a station from dropdown")
        reset();
      }

  });

  //  Move these to back end

  // parse return and render info
  function parseData (data) {
    console.log("parseData: ", data)
    for ( var i = 0; i < data.length; i++ ) {
      
      var stop = data[i]
      var direction = stop['run_id']

      var destination = destinations[direction]
      var minutes = stop['minutes']

      displayColor(minutes, destination)

      console.log("destination: ", destination, "minutes: ", minutes);

      $('#stop-info').append("<li> destination: " + destination + " departing in: " + minutes+ "</li>")

    }

  }

  // Render color info
  function displayColor (time, destination) {
    // console.log("time", time)

    if (time >= 1 && time <= 6 || time >= 14 && time <= 30)  {
      $("#red").removeClass('hide');
      // $("#green, #yellow").addClass('hide');
    } else if  (time >= 6 && time <= 9 ) {
      $("#yellow").removeClass('hide');
        $("#yellow-destination").text(destination);
        $("#yellow-ttd").text(time.toString());

    } else if (time >= 9 && time <= 13 ) {
      console.log('time', time)

      $("#green").removeClass('hide');
      
      $("#green-destination").text(destination);
      $("#green-ttd").text(time.toString());
      
    } else {
      console.log('time', time, 'not worth it')

    }
  }


  function reset () {
    $("#yellow, #red, #green").addClass('hide');
  }

  function getInfo (url, cb) {
    $.ajax({
      type: 'GET',
       url: url,
       error: function() {
         console.log("error")
       },
       // dataType: 'jsonp',
       success: function(data) {
        console.log("success", data)
        cb(data.items)

       }
    });
  }




})