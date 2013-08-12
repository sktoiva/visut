// See API documentation and comments from connection source code of
// fi.fmi.metoclient.metolib.WfsConnection.getData function for the description
// of function options parameter object and for the callback parameters objects structures

var config = {
    server_url: "http://data.fmi.fi/fmi-apikey/<insert api key>/wfs",
    stored_query_id: "fmi::forecast::hirlam::surface::point::multipointcoverage",
    connection: new fi.fmi.metoclient.metolib.WfsConnection()
};

getData(config);

function getData(config) {
    // See API documentation and comments from connection source code of
    // fi.fmi.metoclient.metolib.WfsConnection.getData function for the description
    // of function options parameter object and for the callback parameters objects structures.
    var connection = config.connection;
    if (connection.connect(config.server_url, config.stored_query_id)) {
        // Connection was properly initialized. So, get the data.
        connection.getData({
            requestParameter : "temperature", //meteorological parameters e.g. windspeed/temperature/td (dew point)
            // Integer values are used to init dates for older browsers.
            begin: new Date(),
            end: new Date((new Date()).getTime() + 26 * 60 * 60 * 1000), //26 hours from now
            // begin : new Date(1368172800000),
            // end : new Date(1368352800000),
            timestep: 60 * 60 * 1000, //one hour
            sites: "Helsinki",
            callback : function(data, errors) {
                // Handle the data and errors object in a way you choose.
                // Here, we delegate the content for a separate handler function.
                // See parser documentation from source code comments for more details.
                handleCallback(data, errors, "Forecast");
                // Disconnect because the flow has finished.
                connection.disconnect();
            }
        });
    }
}

function handleCallback(data, errors, caseName){
    console.log(data);

    var timeValuePairs = data.locations[0].data.temperature.timeValuePairs;
    var columns = ["Time", "Value"];

    var table = d3.select("body").append("table");
    var thead = table.append("thead");
    var tbody = table.append("tbody");

    //headers for table
    thead.append("tr")
         .selectAll("th")
         .data(columns)
         .enter()
         .append("th")
         .text(function(d){return d;});

    //append rows for each time-value pair
    var trows = tbody.selectAll("tr")
                     .data(timeValuePairs)
                     .enter()
                     .append("tr");

    //append cells for each time and value
    var tcells = trows.selectAll("td")
                      .data(function(row) { 
                              return columns.map(
                                    function(column){
                                       return { column: column, row: row[column.toLowerCase()] };
                                    });
                            })
                      .enter()
                      .append("td").text(function(d) {return d.row;});
    }