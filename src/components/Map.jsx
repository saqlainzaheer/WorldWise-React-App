import { useNavigate, useSearchParams } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  useMapEvent,
  Circle,
} from "react-leaflet";
import { useCity } from "../Contexts/CityContext";
import Button from "./Button";
import styles from "./Map.module.css";
import Message from "./Message";
import { useEffect, useRef, useState } from "react";
import { divIcon } from "leaflet";

function Map() {
  const { cities, isLoading } = useCity();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [searchParams] = useSearchParams();
  const maplng = searchParams.get("lng");
  const mapllat = searchParams.get("lat");

  useEffect(() => {
    if (mapllat && maplng) {
      setMapPosition([mapllat, maplng]);
      setCurrentPosition(null);
    }
  }, [mapllat, maplng]);

  useEffect(
    function () {
      console.log("sdsd", currentPosition);
      if (currentPosition) setMapPosition(currentPosition);
      //   return () => {
      //     setCurrentPosition(null);
      //   };
    },
    [currentPosition]
  );

  function CurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition([latitude, longitude]);
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setCurrentPosition("notSupport");
    }
  }

  function onClickHandle() {
    CurrentLocation();
  }

  return (
    <div className={styles.mapContainer}>
      {!currentPosition && (
        <Button type="position" onClickHandle={onClickHandle}>
          Use your Position
        </Button>
      )}
      {/* {currentPosition === "block" && (
        <Message type={"mapmessage"}>
          Please Allow your Location to See Current Location{" "}
        </Message>
      )} */}
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />

        {currentPosition && (
          <Marker position={currentPosition}>
            <Circle
              center={currentPosition}
              radius={1500} // Adjust the radius value as needed
              fillColor="blue"
              fillOpacity={0.3}
              stroke={false}
            />
            <Popup>
              <span>Your Current Location is Close About 700 Meter Radius</span>
            </Popup>
          </Marker>
        )}
        {cities.map((city) => {
          return (
            <Marker
              position={[city.position.lat, city.position.lng]}
              key={city.id}
            >
              <Popup>
                <span>{city.emoji}</span> <span>{city.cityName}</span>
              </Popup>
            </Marker>
          );
        })}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}
function ChangeCenter({ position }) {
  // const zoom = currentPosition === "ready" ? 13 : 6;
  const map = useMap();
  map.setView(position);
  return null;
}
function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    //   console.log(e.originalEvent);
    click: (e) => {
      e.originalEvent.preventDefault();
      navigate(`form?latt=${e.latlng.lat}&lngg=${e.latlng.lng}`);
    },
  });
}

export default Map;
