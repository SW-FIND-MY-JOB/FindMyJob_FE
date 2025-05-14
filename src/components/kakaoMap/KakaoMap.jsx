import { useEffect, useRef, useState } from 'react';

const jobCafes = [
  {
    name: '구로청년공간 청년이룸',
    address: '서울특별시 구로구 오리로 1130',
    image: 'http://job.seoul.go.kr/www/common/img.jsp?dir=jobcafe&name=B%EC%A1%B4%20%EB%A9%94%EC%9D%B8%EC%82%AC%EC%A7%84.jpg',
    intro: '천왕역 구로청년공간 청년이룸 일자리카페입니다.'
  },
  {
    name: '도봉구 청년취업지원센터',
    address: '서울특별시 도봉구 마들로 656',
    image: 'http://job.seoul.go.kr/www/common/img.jsp?dir=jobcafe&name=%5B%ED%8F%AC%EB%A7%B7%EB%B3%80%ED%99%98%5D%EB%A9%94%EC%9D%B8%EC%9D%B4%EB%AF%B8%EC%A7%80.png',
    intro: '청년들의 취업지원을 위한 공간입니다.'
  },
  {
    name: '노량진청년일자리센터',
    address: '서울특별시 동작구 노량진로 140',
    image: 'http://job.seoul.go.kr/www/common/img.jsp?dir=jobcafe&name=1.%EB%85%B8%EB%9F%89%EC%A7%84%EC%B2%AD%EB%85%84%EC%84%BC%ED%84%B0_%EB%A9%94%EC%9D%B8(%EA%B0%80%EB%A1%9C1020px).jpg',
    intro: '청춘의 내일을 찾는 곳, 노량진청년일자리센터입니다.'
  },
  {
    name: '마포청년창업취업지원센터 나루',
    address: '서울특별시 마포구 양화로 13',
    image: 'http://job.seoul.go.kr/www/common/img.jsp?dir=jobcafe&name=%EC%99%B8%EA%B4%80%EC%82%AC%EC%A7%84.jpg',
    intro: '청년들의 꿈을 디자인하는 공간입니다.'
  },
  {
    name: '양천 청년일자리카페',
    address: '서울특별시 양천구 등촌로 208',
    image: 'http://job.seoul.go.kr/www/common/img.jsp?dir=jobcafe&name=%EC%96%91%EC%B2%9C%EC%9D%BC%EC%9E%90%EB%A6%AC%EC%B9%B4%ED%8E%98_%EB%A9%94%EC%9D%B8%EC%9D%B4%EB%AF%B8%EC%A7%80.jpg',
    intro: '청년 취업역량 강화를 위한 복합공간입니다.'
  },
  {
    name: '강남 취창업허브센터',
    address: '서울특별시 강남구 역삼로 160',
    image: 'http://job.seoul.go.kr/www/common/img.jsp?dir=jobcafe&name=DSC00027.JPG',
    intro: '강남의 중심 취창업 특화공간입니다.'
  },
  {
    name: '노원구 청년일자리센터 청년내일',
    address: '서울특별시 노원구 동일로 1405',
    image: 'http://job.seoul.go.kr/www/common/img.jsp?dir=jobcafe&name=s%EC%9E%A0%EC%8B%9C%20%EC%89%BC_1.jpg',
    intro: '청년의 내일과 내 "일"을 함께하는 공간입니다.'
  },
  {
    name: '성동 청년일다방',
    address: '서울특별시 성동구 성수일로12길 20',
    image: '/images/ildabang.png',
    intro: '청년 취업지원 통합공간 성동 일다방입니다.'
  },
  {
    name: '용산청년지음',
    address: '서울특별시 용산구 서빙고로 17',
    image: 'http://job.seoul.go.kr/www/common/img.jsp?dir=jobcafe&name=%EB%A9%94%EC%9D%B8%EC%82%AC%EC%A7%84_%EC%9A%A9%EC%82%B0_10.jpg',
    intro: '용산구와 청년이 함께 만든 청년 커뮤니티 공간입니다.'
  },
];

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
            new window.kakao.maps.Size(32, 32)
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
