import React, { useEffect, useState } from 'react';
import { Geolocation } from '@capacitor/geolocation';

const GeolocationComponent = () => {
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });

  useEffect(() => {
    const getCurrentPosition = async () => {
      const permissions = await Geolocation.checkPermissions();
      if (permissions.location === 'granted') {
        const coordinates = await Geolocation.getCurrentPosition();
        setLocation({
          latitude: coordinates.coords.latitude,
          longitude: coordinates.coords.longitude,
        });
      } else {
        console.log('Location permission not granted');
      }
    };

    getCurrentPosition();
  }, []);

  return (
    <div>
      <h4>Current Location</h4>
      <p>Latitude: {location.latitude}</p>
      <p>Longitude: {location.longitude}</p>
    </div>
  );
};

export default GeolocationComponent;
