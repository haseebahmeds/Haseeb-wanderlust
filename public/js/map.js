mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
  container: "map", //container ID
  //Choose from mapbox's core styles, or make your own style with mapbox studio
  style : "mapbox://styles/mapbox/streets-v11", //style URL
  center: listing.geometry.coordinates, //starting position [lng, lat]
  zoom: 9, //starting zoom
});

const marker = new mapboxgl.Marker({color:'red'})
.setLngLat(listing.geometry.coordinates) //listing.geometry.coordinates
.setPopup(
new mapboxgl.Popup({offset: 25}).setHTML(
  `<h4>${listing.title}</h4><p>Exact Location provided after booking</P>`
)
)
.addTo(map);