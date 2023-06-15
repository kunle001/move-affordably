import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import '../../public/css/Map.css'; // Import the CSS file for Map styling

mapboxgl.accessToken = 'pk.eyJ1IjoiYmFkZWp1d29uIiwiYSI6ImNsN3d5eXlkajBodDUzdnViYTlncXpvMWwifQ.4OVdhIpqJlopkgNkl45Arg'; // Replace with your Mapbox access token

interface MapProps {
  latitude: number;
  longitude: number;
}

const Map: React.FC<MapProps> = ({ latitude, longitude }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: 'mapbox://styles/badejuwon/cl7yviuc5003114pk309icwch',
      center: [longitude, latitude],
      zoom: 8,
      scrollZoom: false,
      interactive: false
    });

    // Create marker element
    const markerElement = document.createElement('div');
    markerElement.className = 'marker';

    // Add marker
    new mapboxgl.Marker({
      element: markerElement,
      anchor: 'bottom',
      offset: [0, -600] // Adjust the vertical position of the marker
    })
      .setLngLat([longitude, latitude])
      .addTo(map);

    // Cleanup
    return () => {
      map.remove();
    };
  }, [latitude, longitude]);

  return <div id="map" ref={mapContainerRef} />;
};

export default Map;
