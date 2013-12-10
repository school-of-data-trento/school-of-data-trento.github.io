// parking icon from Open SVG Map Icons
// by L. Delucchi
// https://github.com/lucadelu/Open-SVG-Map-Icons
//------------------------------------------------------------

var parkingIcon = L.icon({
    iconUrl: 'img/parking_32x32.png',
    iconSize: [16, 16],
    iconAnchor: [0, 0],
    popupAnchor: [0, -14]
});

var cloudmadeUrl = 'http://{s}.tile.cloudmade.com/{key}/{styleId}/256/{z}/{x}/{y}.png',
    cloudmadeAttribution = 'Map data &copy; 2013 OpenStreetMap contributors, Imagery &copy; 2012 CloudMade',
    cloudmadeKey = 'd1127846b6af440e9bed6ac6d7d46d98';

var minimal = L.tileLayer(cloudmadeUrl, {
    styleId: 22677,
    attribution: cloudmadeAttribution,
    key: cloudmadeKey});

var map = L.map('map_canvas', {
    center: new L.LatLng(46.0690555,11.1275797),
    zoom: 15,
    layers: [minimal],
    scrollWheelZoom: false
});

// var ggl = new L.Google();

// var bingAttribution = "Map data &copy; 2013 OpenStreetMap contributors, " +
//     "Imagery &copy; 2013 Microsoft Corporation, Bing, &copy; 2010 GeoEye, " +
//     "&copy; 2010 TerraItaly, &copy; 2010 Blom",
//     bingKey = 'AggYzpIFoBJd3Zx671A-O6V8RWue5cyuDgCNoQRnzFU3bedB5tSfpegsq1RB7kbD',
//     bing = new L.BingLayer(bingKey, {
//         attribution: bingAttribution,
//     });

// var baseMaps = {
//     "Semplice": minimal,
//     "Bing (sat)": bing,
//     "Google Maps (sat)": ggl
// };

function onEachFeature(feature, layer) {
    var popupContent = "<b>Parcheggio pubblico</b><br />";

    if (feature.properties.name) {
        popupContent += "Nome: " + feature.properties.name;
    }

    if(feature.geometry.type=="Polygon") {
        var x = 0;
        var y = 0;
        var numcoord = feature.geometry.coordinates[0].length;
        for(var c=0; c<numcoord; c++) {
            y += feature.geometry.coordinates[0][c][0] / numcoord;
            x += feature.geometry.coordinates[0][c][1] / numcoord;
        }
        // alert("here: " + x + "," + y)
        if(x !== 0 && y !== 0) {
            return L.marker([x, y], {icon: parkingIcon}).addTo(map)
                .bindPopup(popupContent);
        }
    }
    layer.bindPopup(popupContent);
}

L.geoJson(parkings, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: parkingIcon});
    },
    onEachFeature: onEachFeature
}).addTo(map);
