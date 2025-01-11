import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-10">Zikr App</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Link href="/morning">
          <div className="p-8 bg-white shadow-lg rounded-lg cursor-pointer hover:scale-105 transform transition">
            <h2 className="text-2xl font-semibold">Morning Zikr(የጠዋት ዚክር)</h2>
          </div>
        </Link>
        <Link href="/night">
          <div className="p-8 bg-white shadow-lg rounded-lg cursor-pointer hover:scale-105 transform transition">
            <h2 className="text-2xl font-semibold">Night Zikr(የማታ ዚክር)</h2>
          </div>
        </Link>
        <Link href="/dua">
          <div className="p-8 bg-white shadow-lg rounded-lg cursor-pointer hover:scale-105 transform transition">
            <h2 className="text-2xl font-semibold">Dua(ዱዓ)</h2>
          </div>
        </Link>
        <Link href="/Quran">
          <div className="p-8 bg-white shadow-lg rounded-lg cursor-pointer hover:scale-105 transform transition">
            <h2 className="text-2xl font-semibold">quran</h2>
          </div>
        </Link>
        <Link href="/Tasbeeh">
          <div className="p-8 bg-white shadow-lg rounded-lg cursor-pointer hover:scale-105 transform transition">
            <h2 className="text-2xl font-semibold">Tasbeeh</h2>
          </div>
        </Link>
      </div>
    </div>
  );
}
