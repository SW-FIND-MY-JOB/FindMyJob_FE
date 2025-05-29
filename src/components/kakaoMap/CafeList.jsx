import styles from './KakaoMap.module.css';

export default function CafeList({
  cafes,
  search,
  setSearch,
  currentLocation,
  moveToCurrentLocation,
  moveToMarker,
}) {
  const filteredCafes = cafes.filter((cafe) =>
    cafe.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.sidebar}>
      <h3 className={styles.title}>일자리카페 목록</h3>
      {currentLocation && (
        <div className={styles.locationInfo}>
          📍 현재위치<br />
          위도: {currentLocation.lat.toFixed(5)}<br />
          경도: {currentLocation.lng.toFixed(5)}<br />
          <button className={styles.locationBtn} onClick={moveToCurrentLocation}>
            현재 위치로 이동
          </button>
        </div>
      )}
      <input
        type="text"
        placeholder="카페명 검색"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.searchInput}
      />
      <ul className={styles.list}>
        {filteredCafes.map((cafe, idx) => (
          <li
            key={idx}
            onClick={() => moveToMarker(cafes.indexOf(cafe))}
            className={styles.listItem}
          >
            <img src={cafe.image} alt={cafe.name} className={styles.cafeImage} />
            <strong className={styles.cafeName}>{cafe.name}</strong><br />
            <span className={styles.cafeAddress}>{cafe.address}</span><br />
            <p className={styles.cafeIntro}>{cafe.intro}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
