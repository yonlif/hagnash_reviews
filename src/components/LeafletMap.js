import L, { Map } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import React, { useState, useEffect } from "react";
import { get } from '../database/databaseUtils.js'


// Offline maps:
// https://stackoverflow.com/questions/43608919/html-offline-map-with-local-tiles-via-leaflet
// http://davidrs.com/wp/phonegap-3-0-leaflet-offline-maps/
// https://github.com/davidrs/phonegap-3.0-leaflet
// Mobile Atlas creator 2.3.1 - Osmdroid ZIP format
const LeafletMap = ({ centerLocation, locationsData }) => {
  const [myMap, setMyMap] = useState(null);
  const [locations, setLocations] = useState([]);

  const renderPopup = (index) => {
    return (
      <Popup
        tipSize={5}
        anchor="bottom-right"
        longitude={locationsData[index].lng}
        latitude={locationsData[index].lat}
        >
        <p>
          <strong>{locationsData[index].name}</strong>
          <br/>
          {locationsData[index].region}
        </p>
      </Popup>
    );
  }

  return(
    <MapContainer
      style={{ alignItems: "center", height: "30vh" }}
      center={[centerLocation.location[0], centerLocation.location[1]]}
      zoom={ centerLocation.defaultZoom ? centerLocation.defaultZoom : 14}
      scrollWheelZoom={false}
      whenCreated={setMyMap}
    >
    <TileLayer
          url="../leaflet/OSMPublicTransport/{z}/{x}/{y}.png"
          minZoom={ 8 }
          maxZoom={ 16 }
        />
        { 
          locationsData.map((marker, index) => {
            let post = [marker.location[0], marker.location[1]];
            return (
              <Marker key={index} position={post}>
                {renderPopup(index)}
              </Marker>
            );
          })
        }
    </MapContainer>
  )
  
}

export default LeafletMap;
