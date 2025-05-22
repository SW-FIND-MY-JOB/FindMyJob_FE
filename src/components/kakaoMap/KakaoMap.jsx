import { useEffect, useRef, useState } from 'react';
import styles from './KaKaoMap.module.css';

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

  //지도 초기화
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
            <div style="width:300px; height:300px; padding:10px; display:flex; flex-direction:column; justify-content:center; align-items:start; border-radius: 30px; font-size:13px;">
              <img src="${cafe.image}" alt="${cafe.name}" style="width:100%; height:150px; object-fit: cover; border-radius:10px; margin:10px 5px 10px 0;" />
              <p style="margin:2px"><strong>카페명: </strong>${cafe.name}</p>
              <p style="margin:2px"><strong>카페소개: </strong>${cafe.intro}</p>
              <p style="margin:2px"><strong>주소: </strong>${cafe.address}</p>
              <p style="margin:2px"><strong>영업시간: </strong>${cafe.time}</p>
              <p style="margin:2px"><strong>휴일: </strong>${cafe.break}</p>
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
      const position = marker.getPosition();

      // 마커 위치를 아래쪽에 보이도록 중심을 위로 올림 (위도 기준)
      const offsetLat = 0.01; // 더 아래에 보이게 하려면 값 증가
      const offsetPosition = new window.kakao.maps.LatLng(
        position.getLat() + offsetLat,
        position.getLng()
      );

      map.panTo(offsetPosition); // 애니메이션 중심 이동
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
    //전체 레이아웃
    <div className={styles.cafeLayout}>
      {/* 카페 목록 컨테이너 */}
      <div className={styles.cafeListContainer}>
        {/* 목록 상단 컨테이너 */}
        <div className={styles.cafeListTopContainer}>
          {/* 목록 상단 제목 */}
          <div className={styles.cafeListTitleContainer}>
            <h3>일자리카페 목록</h3>
            {currentLocation && (
                <button className={styles.myLocationButton} onClick={moveToCurrentLocation} >
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

        {/* 일자리 카페 정보 리스트 */}
        <ul className={styles.cafeInformListContainer}>
          {filteredCafes.map((cafe, idx) => (
            <li
              className={styles.cafeList}
              key={idx}
              onClick={() => moveToMarker(jobCafes.indexOf(cafe))}
            >
              <img src={cafe.image} alt={cafe.name}/>
              <ul>
                <li><strong>카페명:</strong> {cafe.name}</li>
                <li><strong>주소:</strong> {cafe.address}</li>
                <li><strong>소개:</strong> {cafe.intro}</li>
              </ul>
            </li>
          ))}
        </ul>
      </div>

      {/* 지도 */}
      <div className={styles.mapContainer} ref={mapRef} />
    </div>
  );
}
