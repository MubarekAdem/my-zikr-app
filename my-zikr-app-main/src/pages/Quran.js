import { useState, useEffect } from "react";

export default function Quran() {
  const [surahs, setSurahs] = useState([]);

  // Fetch the list of Surahs
  useEffect(() => {
    async function fetchSurahs() {
      const response = await fetch("https://api.alquran.cloud/v1/surah");
      const data = await response.json();
      setSurahs(data.data); // The Surahs data is in data.data
    }
    fetchSurahs();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-bold mt-10">Quran</h1>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {surahs.map((surah) => (
          <a
            key={surah.number}
            href={`/quran/${surah.number}`}
            className="p-6 bg-purple-700 text-white text-center rounded-lg shadow-lg"
          >
            {surah.englishName} ({surah.name})
          </a>
        ))}
      </div>
    </div>
  );
}
