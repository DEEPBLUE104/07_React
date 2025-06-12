import React, { useEffect, useState } from "react";
import { fetchHeatIndex } from "../api/heatIndexApi";

const HeatIndexTable = ({ nx = 60, ny = 127 }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const list = await fetchHeatIndex(nx, ny);
        setItems(list);
      } catch (e) {
        setErr(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [nx, ny]);

  if (loading) return <p>로딩 중...</p>;
  if (err) return <p>에러 발생: {err.message}</p>;
  if (items.length === 0) return <p>데이터가 없습니다.</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>기준시간</th>
          <th>한우</th>
          <th>젖소</th>
          <th>돼지</th>
          <th>가금</th>
        </tr>
      </thead>
      <tbody>
        {items.map((it, idx) => (
          <tr key={idx}>
            <td>{it.tm}</td>
            <td>{it.bgtCattle || it.bhcIdxCattle}</td>
            <td>{it.bgtDairyCow || it.bhcIdxDairyCow}</td>
            <td>{it.bgtPig || it.bhcIdxPig}</td>
            <td>{it.bgtPoultry || it.bhcIdxPoultry}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default HeatIndexTable;
