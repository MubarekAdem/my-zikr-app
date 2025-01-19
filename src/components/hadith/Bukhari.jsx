import { motion } from "framer-motion";

const duas = [
  {
    title: "Dua for Starting the Day",
    text: "اللّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ.",
    translation:
      "O Allah, by You we enter the morning and by You we enter the evening, by You we live and by You we die, and to You is the resurrection.",
  },
  {
    title: "Dua Before Sleeping",
    text: "بِاسْمِكَ اللّهُمَّ أَمُوتُ وَأَحْيَا.",
    translation: "In Your name, O Allah, I die and I live.",
  },
  {
    title: "Dua for Seeking Guidance",
    text: "اللّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ.",
    translation:
      "O Allah, I seek guidance from Your knowledge and power from Your might.",
  },
  {
    title: "Dua for Protection",
    text: "اللّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ زَوَالِ نِعْمَتِكَ.",
    translation:
      "O Allah, I seek refuge in You from the loss of Your blessings.",
  },
];

export default function DuaBrowsing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 via-blue-100 to-purple-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-900">
      {/* Navbar */}
      {/* <nav className="bg-gray-800 dark:bg-gray-900 text-white p-4 fixed top-0 left-0 w-full z-50">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-green-400">Beautiful Duas</h1>
        </div>
      </nav> */}

      {/* Dua List */}
      <div className="pt-24 container mx-auto px-4">
        <h2 className="text-center text-4xl font-extrabold text-gray-800 dark:text-white mb-10">
          Explore Heartwarming Duas
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {duas.map((dua, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg transform transition-all hover:shadow-2xl hover:-translate-y-2">
                <h3 className="text-2xl font-semibold text-green-600 dark:text-green-400 mb-4">
                  {dua.title}
                </h3>
                <p className="text-lg text-gray-700 dark:text-gray-300 font-arabic mb-3 leading-relaxed">
                  {dua.text}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                  {dua.translation}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
