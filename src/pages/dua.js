import Link from "next/link";

export default function Dua() {
  const duaCategories = [
    { id: 1, title: "Dua While Eating", path: "/DuaEating" },
    { id: 2, title: "Dua Before Sleeping", path: "/dua/sleeping" },
    { id: 3, title: "Dua When Traveling", path: "/dua/traveling" },
    // Add more categories as needed
  ];

  return (
    <div className="min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-bold mt-10">Dua Categories</h1>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {duaCategories.map((category) => (
          <Link key={category.id} href={category.path}>
            <p className="p-6 bg-purple-700 text-white text-center rounded-lg shadow-lg">
              {category.title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
