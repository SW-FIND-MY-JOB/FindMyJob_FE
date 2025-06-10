import { useEffect, useState } from 'react';
import { fetchAllAgencies } from '../api/jobService/agency';

const AgencyTestPage = () => {
  const [agencyList, setAgencyList] = useState([]);

  useEffect(() => {
  const load = async () => {
    try {
      const data = await fetchAllAgencies();
      console.log('불러온 기관 목록:', data);
      setAgencyList(data.result); // ✅ 여기를 result 배열로!
    } catch (error) {
      console.error('기관 목록 조회 실패:', error);
    }
  };
  load();
}, []);


  return (
    <div style={{ padding: '40px' }}>
      <h1>기관 목록 테스트</h1>
      <ul>
    {agencyList.map((agency, index) => (
        <li key={index}>
        <pre>{JSON.stringify(agency, null, 2)}</pre>
        </li>
    ))}
    </ul>

    </div>
  );
};

export default AgencyTestPage;
