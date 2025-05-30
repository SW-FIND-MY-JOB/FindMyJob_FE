import { useEffect, useRef, useState } from 'react';
import styles from './KaKaoMap.module.css';
import jobCafes from '../../data/jobCafes.json';

export default function KakaoMap() {
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const overlaysRef = useRef([]);
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


          const content = document.createElement('div');
          content.innerHTML = `
            <div style="
              width: 280px;
              background-color: white;
              border-radius: 16px;
              overflow: hidden;
              box-shadow: 0 4px 12px rgba(0,0,0,0.25);
              font-size: 13px;
              line-height: 1.5;
              position: relative;
            ">
              <button class="close-overlay-btn" style="
                position: absolute;
                top: 10px;
                right: 10px;
                width: 20px;              /* ✅ 최대한 줄임!! */
                height: 20px;
                border: none;
                background: rgba(0, 0, 0, 0.05);
                color: #444;
                border-radius: 50%;
                cursor: pointer;
                font-size: 12px;          /* ✅ 아이콘도 작게 !!*/
                font-weight: bold;
                line-height: 1;
                padding: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s ease-in-out;
              " title="닫기">×</button>



              <img src="${cafe.image}" alt="${cafe.name}" style="
                width: 100%;
                height: 140px;
                object-fit: cover;
              " />
              <div style="
                padding: 12px;
                overflow-wrap: anywhere;
                white-space: normal;
              ">
                <p style="margin: 4px 0;"><strong>카페명:</strong> ${cafe.name}</p>
                <p style="margin: 4px 0;"><strong>카페소개:</strong> ${cafe.intro}</p>
                <p style="margin: 4px 0;"><strong>주소:</strong> ${cafe.address}</p>
                <p style="margin: 4px 0;"><strong>영업시간:</strong> ${cafe.time}</p>
                <p style="margin: 4px 0;"><strong>휴일:</strong> ${cafe.break}</p>
              </div>

            </div>
          `;


          const overlay = new window.kakao.maps.CustomOverlay({
            content: content,
            position: coords,
            yAnchor: 1,
          });

          const closeBtn = content.querySelector('.close-overlay-btn');
          if (closeBtn) {
            closeBtn.onclick = () => overlay.setMap(null);
            closeBtn.onmouseenter = () => {
              closeBtn.style.background = '#f66';
              closeBtn.style.color = '#fff';
            };
            closeBtn.onmouseleave = () => {
              closeBtn.style.background = '#eee';
              closeBtn.style.color = '#333';
            };
          }

          marker.addListener('click', () => {
            overlaysRef.current.forEach(o => o && o.setMap(null));
            markersRef.current.forEach(m => m && m.setImage(defaultMarkerImage));
            marker.setImage(clickedMarkerImage);
            overlay.setMap(kakaoMap);
            overlaysRef.current[index] = overlay;
          });

          markersRef.current[index] = marker;
          overlaysRef.current[index] = overlay;
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
    const overlay = overlaysRef.current[index];
    if (marker && map) {
      overlaysRef.current.forEach(o => o && o.setMap(null));
      markersRef.current.forEach(m => m && m.setImage(
        new window.kakao.maps.MarkerImage(
          'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
          new window.kakao.maps.Size(32, 32)
        )
      ));
      marker.setImage(
        new window.kakao.maps.MarkerImage(
          'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
          new window.kakao.maps.Size(32, 32)
        )
      );
      map.panTo(marker.getPosition());
      overlay.setMap(map);
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
    <div className={styles.cafeLayout}>
      <div className={styles.cafeListContainer}>
        <div className={styles.cafeListTopContainer}>
          <div className={styles.cafeListTitleContainer}>
            <h3>일자리카페 목록</h3>
            {currentLocation && (
              <button className={styles.myLocationButton} onClick={moveToCurrentLocation}>
                내 위치 찾기
              </button>
            )}
          </div>
          <input
            className={styles.searchCafe}
            type="text"
            placeholder="카페명 검색"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <ul className={styles.cafeInformListContainer}>
          {filteredCafes.map((cafe, idx) => (
            <li
              className={styles.cafeList}
              key={idx}
              onClick={() => moveToMarker(jobCafes.indexOf(cafe))}
            >
              <img src={cafe.image} alt={cafe.name} />
              <ul>
                <li><strong>카페명:</strong> {cafe.name}</li>
                <li><strong>주소:</strong> {cafe.address}</li>
                <li><strong>소개:</strong> {cafe.intro}</li>
              </ul>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.mapContainer} ref={mapRef} />
    </div>
  );
}
