import { Link } from "react-router";
import { Star, TrendingUp, Sparkles, ArrowRight } from "lucide-react";

const featuredBooks = [
  {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    rating: 4.5,
    cover: "https://images.unsplash.com/photo-1664095885286-65fb80ba335d?w=400",
    category: "Fiction",
    description: "A dazzling novel about all the choices that go into a life well lived.",
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    rating: 4.8,
    cover: "https://images.unsplash.com/photo-1559864845-2916d99fba10?w=400",
    category: "Self-Help",
    description: "Tiny changes, remarkable results.",
  },
  {
    id: 3,
    title: "Project Hail Mary",
    author: "Andy Weir",
    rating: 4.7,
    cover: "https://images.unsplash.com/photo-1742274317501-57e147afc0c4?w=400",
    category: "Sci-Fi",
    description: "A lone astronaut must save the earth from disaster in this incredible new science-based thriller.",
  },
];

const recommendedBooks = [
  {
    id: 4,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    rating: 4.6,
    cover: "https://images.unsplash.com/photo-1566143409298-9b696199998b?w=400",
    category: "Finance",
  },
  {
    id: 5,
    title: "Educated",
    author: "Tara Westover",
    rating: 4.7,
    cover: "https://images.unsplash.com/photo-1670523783393-0d716aea2269?w=400",
    category: "Memoir",
  },
  {
    id: 6,
    title: "The Silent Patient",
    author: "Alex Michaelides",
    rating: 4.4,
    cover: "https://images.unsplash.com/photo-1697677469437-3a8e965c86ec?w=400",
    category: "Thriller",
  },
  {
    id: 7,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    rating: 4.5,
    cover: "https://images.unsplash.com/photo-1670523781755-8185f71c2285?w=400",
    category: "History",
  },
  {
    id: 8,
    title: "Circe",
    author: "Madeline Miller",
    rating: 4.3,
    cover: "https://images.unsplash.com/photo-1630503669679-9a9b0052a793?w=400",
    category: "Fantasy",
  },
];

const categories = [
  { name: "Fiction", color: "from-blue-500 to-cyan-500", icon: "📚" },
  { name: "Self-Help", color: "from-green-500 to-emerald-500", icon: "🌱" },
  { name: "Sci-Fi", color: "from-purple-500 to-pink-500", icon: "🚀" },
  { name: "Thriller", color: "from-red-500 to-orange-500", icon: "🔍" },
  { name: "History", color: "from-amber-500 to-yellow-500", icon: "📜" },
  { name: "Fantasy", color: "from-indigo-500 to-purple-500", icon: "🐉" },
];

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <section className="mb-12">
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 md:p-12 text-white">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-6 h-6" />
            <span className="text-sm font-medium uppercase tracking-wider">
              Rekomendasi Khusus Untuk Anda
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Temukan Buku Favorit Anda
          </h1>
          <p className="text-lg text-white/90 mb-6 max-w-2xl">
            Jelajahi ribuan buku digital dengan rekomendasi yang dipersonalisasi
            berdasarkan minat Anda
          </p>
          <Link
            to="/browse"
            className="inline-flex items-center gap-2 bg-white text-indigo-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            Mulai Jelajahi
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Featured Books */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Buku Unggulan</h2>
          <Link
            to="/browse"
            className="text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
          >
            Lihat Semua
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredBooks.map((book) => (
            <Link
              key={book.id}
              to={`/book/${book.id}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1"
            >
              <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
                    {book.category}
                  </span>
                  <div className="flex items-center gap-1 ml-auto">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold">{book.rating}</span>
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-1 text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {book.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3">{book.author}</p>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {book.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Jelajahi Kategori
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/browse?category=${category.name}`}
              className="group"
            >
              <div
                className={`bg-gradient-to-br ${category.color} rounded-2xl p-6 text-white text-center hover:scale-105 transition-transform shadow-lg`}
              >
                <div className="text-4xl mb-2">{category.icon}</div>
                <div className="font-semibold">{category.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Recommended Books */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-6 h-6 text-indigo-600" />
          <h2 className="text-2xl font-bold text-gray-900">
            Rekomendasi Untuk Anda
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {recommendedBooks.map((book) => (
            <Link
              key={book.id}
              to={`/book/${book.id}`}
              className="group bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="aspect-[2/3] overflow-hidden bg-gray-100">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-semibold">{book.rating}</span>
                </div>
                <h3 className="font-semibold text-sm mb-1 text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                  {book.title}
                </h3>
                <p className="text-xs text-gray-600">{book.author}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
