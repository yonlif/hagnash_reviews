import L, { Map } from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import React, { useState, useEffect } from "react";
import 'leaflet.offline';
import localforage from 'localforage';


// TODO:
// https://stackoverflow.com/questions/43608919/html-offline-map-with-local-tiles-via-leaflet
// http://davidrs.com/wp/phonegap-3-0-leaflet-offline-maps/
// https://github.com/davidrs/phonegap-3.0-leaflet
const LeafletMap = () => {
  const [myMap, setMyMap] = useState(null);
  
  useEffect(() => {
  if(myMap){

    // @ts-ignore
    const tileLayerOffline = L.tileLayer.offline(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        minZoom: 13,
      }
    );

    tileLayerOffline.addTo(myMap);

    // @ts-ignore
    // const controlSaveTiles = L.control.savetiles(
    //   tileLayerOffline, 
    //   {
    //     zoomlevels: [13, 14, 15, 16], // optional zoomlevels to save, default current zoomlevel
    //   }
    // );

    // controlSaveTiles.addTo(myMap);
  }
}, [myMap]);
  
  // componentDidMount() {
  //   const map = L.map('map-id');
  //   const offlineLayer = L.tileLayer.offline('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', localforage, {
  //       attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  //       subdomains: 'abc',
  //       minZoom: 13,
  //       maxZoom: 19,
  //       crossOrigin: true
  //   });
  //   offlineLayer.addTo(map);
  // }

  return(
    <MapContainer
      style={{ alignItems: "center", height: "20vh" }}
      center={[32.05813317834404, 34.85672678068158]}
      zoom={13}
      scrollWheelZoom={false}
      whenCreated={setMyMap}
    >
    <TileLayer
          url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
    </MapContainer>
  )
  
}


export default LeafletMap;

// 
// import React from 'react';
// import { MapContainer , Marker, Popup, TileLayer, ZoomControl  } from 'react-leaflet';
// import '../App.css';
// import L from "leaflet";
// // import  MarkerClusterGroup  from "react-leaflet-markercluster";
// import localforage from 'localforage';
// import 'leaflet.offline';
// // import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

// //Static data for list of markers
// const markerList = [
//   {
//     lat: 17.441013,
//     lng: 78.391796,
//     name: "ABC Hospitals",
//     info: 10
//   },
//   {
//     lat: 17.442889,
//     lng: 78.396873,
//     name: "XYZ Hospitals",
//     info: 20
//   },
//   {
//     lat: 17.441681,
//     lng: 78.394357,
//     name: "NRI Hospitals",
//     info: 10
//   },
//   {
//     lat:17.441597,
//     lng: 78.356214,
//     name:"sandya Hospitals"
//   },
//   {
//     lat:17.441264, 
//     lng:78.360184,
//     name:"childrens Hospitals"
//   }
// ];

// //Defining the geo search control 
// // const searchControl = new GeoSearchControl({ //geosearch object
// //   provider: new OpenStreetMapProvider(),
// //   // style: 'button',
// //   showMarker: true,
// //   autoComplete: true,   
// //   showPopup: false,
// //   autoClose: true,
// //   retainZoomLevel: false,
// //   animateZoom: true,
// //   // keepResult: false,
// //   searchLabel: 'search'
// // });

// //The Map definition
// class LeafletMap extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       lat: 17.44212,
//       lng: 78.391384,
//       zoom: 15,
//       maxZoom: 30
//     }
//   }
  
//   componentDidMount() {
//   //Defining the offline layer for the map
//     const map = L.map('map-id');
//     const offlineLayer = L.tileLayer.offline('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', localforage, {
//     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
//     subdomains: 'abc',
//     minZoom: 13,
//     maxZoom: 19,
//     crossOrigin: true
// });
//     offlineLayer.addTo(map);//add the offline layer
//     map.zoomControl.remove();
//     // map.addControl(searchControl);
//   }

//   //Defining the custom icon for clusters
//   customIconCreateFunction(cluster) {
//     return L.divIcon({
//       html: `<span>${cluster.getChildCount()}</span>`,
//       className: "marker-cluster-custom",
//       iconSize: L.point(40, 40, true)
//     });
//   }

//   //Render pop up for markers
//   renderPopup = (index) =>{
//     return (
//       <Popup
//         tipSize={5}
//         anchor="bottom-right"
//         longitude={markerList[index].lng}
//         latitude={markerList[index].lat}
//       >
//         <p>
//           <strong>{markerList[index].name}</strong>
//           <br />
//           Available beds:{markerList[index].info}
//         </p>
//       </Popup>
//     );
//   }

//   //render the map
//   render() {
//     const position = [this.state.lat, this.state.lng];
//     console.log(position);
    
//     return (
//       <div id="map-id">
//        <MapContainer center={position} zoom={13} maxZoom={20} id="map" >
//        <ZoomControl  position="topright" />
//         <TileLayer
//         // url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
//         //   attribution= 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
//           attribution="&copy; <a href=&quot;https://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
//           url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
//         />
         
//       </MapContainer>
//       </div>
//     );
//   }
// }

// // <MarkerClusterGroup
//         //   showCoverageOnHover={true}
//         //   spiderfyDistanceMultiplier={2}
//         //   iconCreateFunction={this.customIconCreateFunction}
//         // >
//         //   {markerList.map((marker, index) => {
//         //     let post = [marker.lat, marker.lng];
//         //     return (
//         //       <Marker key={index} position={post} >
//         //         {this.renderPopup(index)}
//         //       </Marker>
//         //     );
//         //   })}
//         // </MarkerClusterGroup>

// export default LeafletMap;