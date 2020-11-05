//Request IP info from API immediately on render to display client IP info
const getClientIp = (ipAddress = "") => {
    fetch(`https://geo.ipify.org/api/v1?apiKey=at_m0b2W8wNUVYNTComsCfipydoAt7NV&ipAddress=${ipAddress}`)
      .then(response => response.json())
      .then(data => {
        var lat = data.location.lat;
        var lng = data.location.lng;

      //Update the results box with the corresponding data
      $("#ip-address").text(data.ip);
      $("#location").text(data.location.city + ", " + data.location.country + " " + data.location.postalCode)
      $("#timezone").text("UTC " + data.location.timezone);
      $("#isp").text(data.isp);

      updateLatLng(data.location.lat, data.location.lng);
      })
    };

    getClientIp();

// ACTIVE STATES
$("button").hover(function() {
    console.log("in");
    $("button").addClass("button-hover");
}, function () {
    console.log("out");
    $("button").removeClass("button-hover");
}
);

    //Initialize the map
var lat = 51.505;
var lng = -0.09;
var mymap = L.map("mapid").setView([lat, lng], 13);

//Add a tile layer
L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken: "pk.eyJ1IjoiY29uY2hhdSIsImEiOiJja2gzeHU4bm4wMHRoMnpvODc5Z3pxNzgwIn0.BsBdVj5kV207SKzPK3UWDQ",
  }
).addTo(mymap);

//Add a marker
var iconOptions = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

var marker = L.marker([lat, lng], {icon: iconOptions}).addTo(mymap);

//Add "click" event listener to the button
$("button").click(function() {

    var searchText = $("input").val();

    //Connect to IP Geolocation API
    let url = "https://geo.ipify.org/api/v1?apiKey="
    let apiKey = "at_m0b2W8wNUVYNTComsCfipydoAt7NV"
    let ipAddress = "&ipAddress=" + searchText
    fetch(url + apiKey + ipAddress)
    .then(response => response.json())
    .then(data => {
      //Update the results box with the corresponding data
      $("#ip-address").text(searchText);
      $("#location").text(data.location.city + ", " + data.location.country + " " + data.location.postalCode)
      $("#timezone").text("UTC " + data.location.timezone);
      $("#isp").text(data.isp);

      updateLatLng(data.location.lat, data.location.lng);

    });
});

function updateLatLng(updatedLat, updatedLng) {
    var newLat = updatedLat;
    var newLng = updatedLng;
    mymap.setView([newLat, newLng], 13).panTo([newLat+.018, newLng]);
    var newMarker = L.marker([newLat, newLng], {icon: iconOptions}).addTo(mymap);
}
