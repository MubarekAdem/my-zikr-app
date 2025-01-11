import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Surah() {
  const router = useRouter();
  const { id } = router.query;

  const [ayahs, setAyahs] = useState([]);

  useEffect(() => {
    if (id) {
      async function fetchSurah() {
        try {
          const response = await fetch(
            `https://api.alquran.cloud/v1/surah/${id}`
          );
          const data = await response.json();
          setAyahs(data.data.ayahs);
        } catch (error) {
          console.error("Error fetching Surah:", error);
        }
      }
      fetchSurah();
    }
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col items-center font-amiri p-4">
      <h1 className="text-2xl font-bold mt-4 text-center">سورة {id}</h1>
      <div className="mt-6 max-w-md text-right" dir="rtl">
        {ayahs.length > 0 ? (
          <div className="leading-loose text-xl space-y-2 text-justify">
            {ayahs.map((ayah) => (
              <span key={ayah.number}>
                {ayah.text}{" "}
                <span className="text-purple-500">({ayah.numberInSurah})</span>{" "}
              </span>
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
