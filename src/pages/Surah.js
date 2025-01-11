import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Surah() {
  const router = useRouter();
  const { id } = router.query; 
  const [ayahs, setAyahs] = useState([]);

  useEffect(() => {
    if (id) {
      async function fetchAyahs() {
        const response = await fetch(
          `https://api.alquran.cloud/v1/surah/${id}`
        );
        const data = await response.json();
        setAyahs(data.data.ayahs);
      }
      fetchAyahs();
    }
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-bold mt-10">Surah {id}</h1>
      <div className="mt-8 w-full max-w-2xl">
        {ayahs.map((ayah) => (
          <div
            key={ayah.number}
            className="p-4 bg-white shadow-lg mb-4 rounded-lg text-center text-xl"
          >
            {ayah.text}
          </div>
        ))}
      </div>
    </div>
  );
}
