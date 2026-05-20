import { useState } from "react";
import { Link } from "react-router";
import { Search, Star, Filter, X } from "lucide-react";

const allBooks = [
  {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    rating: 4.5,
    cover: "https://images.unsplash.com/photo-1664095885286-65fb80ba335d?w=400",
    category: "Fiction",
    year: 2020,
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    rating: 4.8,
    cover: "https://images.unsplash.com/photo-1559864845-2916d99fba10?w=400",
    category: "Self-Help",
    year: 2018,
  },
  {
    id: 3,
    title: "Project Hail Mary",
    author: "Andy Weir",
    rating: 4.7,
    cover: "https://images.unsplash.com/photo-1742274317501-57e147afc0c4?w=400",
    category: "Sci-Fi",
    year: 2021,
  },
  {
    id: 4,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    rating: 4.6,
    cover: "https://images.unsplash.com/photo-1566143409298-9b696199998b?w=400",
    category: "Finance",
    year: 2020,
  },
  {
    id: 5,
    title: "Educated",
    author: "Tara Westover",
    rating: 4.7,
    cover: "https://images.unsplash.com/photo-1670523783393-0d716aea2269?w=400",
    category: "Memoir",
    year: 2018,
  },
  {
    id: 6,
    title: "The Silent Patient",
    author: "Alex Michaelides",
    rating: 4.4,
    cover: "https://images.unsplash.com/photo-1697677469437-3a8e965c86ec?w=400",
    category: "Thriller",
    year: 2019,
  },
  {
    id: 7,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    rating: 4.5,
    cover: "https://images.unsplash.com/photo-1670523781755-8185f71c2285?w=400",
    category: "History",
    year: 2011,
  },
  {
    id: 8,
    title: "Circe",
    author: "Madeline Miller",
    rating: 4.3,
    cover: "https://images.unsplash.com/photo-1630503669679-9a9b0052a793?w=400",
    category: "Fantasy",
    year: 2018,
  },
  {
    id: 9,
    title: "The Song of Achilles",
    author: "Madeline Miller",
    rating: 4.6,
    cover: "https://images.unsplash.com/photo-1563459190544-4704b89fdccb?w=400",
    category: "Fantasy",
    year: 2011,
  },
  {
    id: 10,
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    rating: 4.4,
    cover: "https://images.unsplash.com/photo-1629291780606-f536342b3408?w=400",
    category: "Psychology",
    year: 2011,
  },
  {
    id: 11,
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    rating: 4.5,
    cover: "https://images.unsplash.com/photo-1664095885286-65fb80ba335d?w=400",
    category: "Fiction",
    year: 2018,
  },
  {
    id: 12,
    title: "The Seven Husbands of Evelyn Hugo",
    author: "Taylor Jenkins Reid",
    rating: 4.7,
    cover: "https://images.unsplash.com/photo-1559864845-2916d99fba10?w=400",
    category: "Fiction",
    year: 2017,
  },
];

const categories = [
  "All",
  "Fiction",
  "Self-Help",
  "Sci-Fi",
  "Thriller",
  "History",
  "Fantasy",
  "Finance",
  "Memoir",
  "Psychology",
];

export default function Browse() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const filteredBooks = allBooks.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Jelajahi Koleksi Buku
        </h1>
        <p className="text-gray-600">
          Temukan dari {allBooks.length} buku berkualitas
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="mb-8 space-y-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari judul buku atau penulis..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
          >
            {showFilters ? (
              <X className="w-5 h-5" />
            ) : (
              <Filter className="w-5 h-5" />
            )}
            <span>Filter</span>
          </button>
        </div>

        {/* Category Filters */}
        {showFilters && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Kategori</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Menampilkan {filteredBooks.length} buku
          {selectedCategory !== "All" && (
            <span className="ml-1">dalam kategori {selectedCategory}</span>
          )}
        </p>
      </div>

      {/* Books Grid */}
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredBooks.map((book) => (
            <Link
              key={book.id}
              to={`/book/${book.id}`}
              className="group bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition-all hover:-translate-y-2"
            >
              <div className="aspect-[2/3] overflow-hidden bg-gray-100 relative">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-semibold">{book.rating}</span>
                </div>
              </div>
              <div className="p-4">
                <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
                  {book.category}
                </span>
                <h3 className="font-semibold text-sm mt-2 mb-1 text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                  {book.title}
                </h3>
                <p className="text-xs text-gray-600 mb-1">{book.author}</p>
                <p className="text-xs text-gray-500">{book.year}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-gray-400 mb-4">
            <Search className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Tidak ada buku ditemukan
          </h3>
          <p className="text-gray-600">
            Coba ubah kata kunci pencarian atau filter kategori
          </p>
        </div>
      )}
    </div>
  );
}
