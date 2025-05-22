import { useEffect, useRef, useState } from 'react';

import jobCafes from '../../data/jobCafes.json';

export default function JobCafeMap() {
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const infoWindowsRef = useRef([]);
  const [map, setMap] = useState(null);
  const [search, setSearch] = useState('');
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_API_KEY}&autoload=false&libraries=services,clusterer,drawing`;
    script.async = true;
    script.onload = () => {
      window.kakao.maps.load(() => {
        initializeMap();
      });
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  //지도 초기화화
  const initializeMap = () => {
    if (!window.kakao || !window.kakao.maps) return;

    const kakaoMap = new window.kakao.maps.Map(mapRef.current, {
      center: new window.kakao.maps.LatLng(37.5665, 126.9780),
      level: 7,
    });
    setMap(kakaoMap);

    const geocoder = new window.kakao.maps.services.Geocoder();

    const defaultMarkerImage = new window.kakao.maps.MarkerImage(
      'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
      new window.kakao.maps.Size(32, 32)
    );
    const clickedMarkerImage = new window.kakao.maps.MarkerImage(
      'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
      new window.kakao.maps.Size(32, 32)
    );

    jobCafes.forEach((cafe, index) => {
      geocoder.addressSearch(cafe.address, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
          const marker = new window.kakao.maps.Marker({
            map: kakaoMap,
            position: coords,
            image: defaultMarkerImage,
          });

          const content = `
            <div style="padding:5px;font-size:13px;text-align:center;">
              <img src="${cafe.image}" alt="${cafe.name}" style="width:80px;height:auto;border-radius:4px;margin-bottom:5px;" /><br />
              <strong>${cafe.name}</strong>
            </div>
          `;
          const infowindow = new window.kakao.maps.InfoWindow({ content });

          marker.addListener('click', () => {
            markersRef.current.forEach((m, i) => {
              if (m) m.setImage(defaultMarkerImage);
              if (infoWindowsRef.current[i]) infoWindowsRef.current[i].close();
            });

            marker.setImage(clickedMarkerImage);
            infowindow.open(kakaoMap, marker);
          });

          markersRef.current[index] = marker;
          infoWindowsRef.current[index] = infowindow;
        }
      });
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setCurrentLocation({ lat, lng });

        const coords = new window.kakao.maps.LatLng(lat, lng);
        new window.kakao.maps.Marker({
          map: kakaoMap,
          position: coords,
          image: new window.kakao.maps.MarkerImage(
            'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
            new window.kakao.maps.Size(40, 40)
          )
        });
      });
    }
  };

  const moveToMarker = (index) => {
    const marker = markersRef.current[index];
    if (marker && map) {
      map.panTo(marker.getPosition());
      window.kakao.maps.event.trigger(marker, 'click');
    }
  };

  const moveToCurrentLocation = () => {
    if (currentLocation && map) {
      const coords = new window.kakao.maps.LatLng(currentLocation.lat, currentLocation.lng);
      map.panTo(coords);
    }
  };

  const filteredCafes = jobCafes.filter((cafe) =>
    cafe.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <div style={{ width: '20%', overflowY: 'auto', borderRight: '1px solid #ccc', padding: '10px' }}>
        <h3 style={{ fontSize: '18px' }}>일자리카페 목록</h3>
        {currentLocation && (
          <div style={{ marginBottom: '10px', fontSize: '13px', color: '#333' }}>
            📍 현재위치<br />
            위도: {currentLocation.lat.toFixed(5)}<br />
            경도: {currentLocation.lng.toFixed(5)}<br />
            <button onClick={moveToCurrentLocation} style={{ marginTop: '5px', padding: '5px 10px', fontSize: '12px' }}>
              현재 위치로 이동
            </button>
          </div>
        )}
        <input
          type="text"
          placeholder="카페명 검색"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: '100%', padding: '6px', marginBottom: '10px', fontSize: '14px' }}
        />
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {filteredCafes.map((cafe, idx) => (
            <li
              key={idx}
              onClick={() => moveToMarker(jobCafes.indexOf(cafe))}
              style={{
                marginBottom: '12px',
                cursor: 'pointer',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '5px',
              }}
            >
              <img src={cafe.image} alt={cafe.name} style={{ width: '100%', height: 'auto', borderRadius: '4px' }} />
              <strong style={{ fontSize: '14px' }}>{cafe.name}</strong><br />
              <span style={{ fontSize: '12px', color: '#555' }}>{cafe.address}</span><br />
              <p style={{ fontSize: '12px', marginTop: '5px' }}>{cafe.intro}</p>
            </li>
          ))}
        </ul>
      </div>

      <div ref={mapRef} style={{ flex: 1 }} />
    </div>
  );
}
