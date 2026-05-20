import { useState, type FormEvent, useEffect } from "react";
import { useParams, Link } from "react-router";
import { Star, BookOpen, Calendar, Tag, ArrowLeft, Heart, Share2 } from "lucide-react";

const booksData: Record<number, any> = {
  1: {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    rating: 4.5,
    reviews: 12453,
    cover: "https://images.unsplash.com/photo-1664095885286-65fb80ba335d?w=600",
    category: "Fiction",
    year: 2020,
    pages: 304,
    publisher: "Canongate Books",
    description:
      "Nora Seed finds a library beyond the edge of the universe that contains books with multiple possibilities of the lives one could have lived. While we all wonder how our lives might have been, what if you had the chance to go to the library and see for yourself? Would any of these other lives truly be better? In The Midnight Library, Matt Haig's enchanting new novel, Nora Seed finds herself faced with this decision.",
    longDescription:
      "Somewhere out beyond the edge of the universe there is a library that contains an infinite number of books, each one the story of another reality. One tells the story of your life as it is, along with another book for the other life you could have lived if you had made a different choice at any point in your life. While we all wonder how our lives might have been, what if you had the chance to go to the library and see for yourself? Would any of these other lives truly be better?",
  },
  2: {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    rating: 4.8,
    reviews: 25891,
    cover: "https://images.unsplash.com/photo-1559864845-2916d99fba10?w=600",
    category: "Self-Help",
    year: 2018,
    pages: 320,
    publisher: "Avery",
    description:
      "No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.",
    longDescription:
      "If you're having trouble changing your habits, the problem isn't you. The problem is your system. Bad habits repeat themselves again and again not because you don't want to change, but because you have the wrong system for change. You do not rise to the level of your goals. You fall to the level of your systems.",
  },
  3: {
    id: 3,
    title: "Project Hail Mary",
    author: "Andy Weir",
    rating: 4.7,
    reviews: 18234,
    cover: "https://images.unsplash.com/photo-1742274317501-57e147afc0c4?w=600",
    category: "Sci-Fi",
    year: 2021,
    pages: 496,
    publisher: "Ballantine Books",
    description:
      "Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the earth itself will perish. Except that right now, he doesn't know that. He can't even remember his own name, let alone the nature of his assignment or how to complete it.",
    longDescription:
      "All he knows is that he's been asleep for a very, very long time. And he's just been awakened to find himself millions of miles from home, with nothing but two corpses for company. His crewmates dead, his memories fuzzily returning, Ryland realizes that an impossible task now confronts him.",
  },
};

const similarBooks = [
  {
    id: 4,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    rating: 4.6,
    cover: "https://images.unsplash.com/photo-1566143409298-9b696199998b?w=400",
  },
  {
    id: 5,
    title: "Educated",
    author: "Tara Westover",
    rating: 4.7,
    cover: "https://images.unsplash.com/photo-1670523783393-0d716aea2269?w=400",
  },
  {
    id: 6,
    title: "The Silent Patient",
    author: "Alex Michaelides",
    rating: 4.4,
    cover: "https://images.unsplash.com/photo-1697677469437-3a8e965c86ec?w=400",
  },
  {
    id: 7,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    rating: 4.5,
    cover: "https://images.unsplash.com/photo-1670523781755-8185f71c2285?w=400",
  },
];

const initialReviews = [
  {
    id: 1,
    user: "Sarah Johnson",
    rating: 5,
    date: "2 minggu lalu",
    comment:
      "Buku yang luar biasa! Ceritanya sangat menyentuh dan membuat saya berpikir tentang pilihan-pilihan dalam hidup.",
  },
  {
    id: 2,
    user: "Michael Chen",
    rating: 4,
    date: "1 bulan lalu",
    comment:
      "Sangat inspiratif dan well-written. Highly recommended untuk siapa saja yang sedang mencari makna hidup.",
  },
  {
    id: 3,
    user: "Emma Wilson",
    rating: 5,
    date: "2 bulan lalu",
    comment:
      "Tidak bisa berhenti membaca! Setiap halaman membawa perspektif baru yang menarik.",
  },
];

export default function Book() {
  const { id } = useParams();
  const book = booksData[Number(id)] || booksData[1];
  const [reviewList, setReviewList] = useState<any[]>([]);
  const [commentName, setCommentName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [commentRating, setCommentRating] = useState(5);
  const [saved, setSaved] = useState(false);
  const [showReader, setShowReader] = useState(false);
  const [shareMessage, setShareMessage] = useState("");

  useEffect(() => {
    let mounted = true;
    const fetchReviews = async () => {
      try {
        const res = await fetch(`http://localhost:4000/books/${book.id}/reviews`);
        if (res.ok) {
          const data = await res.json();
          if (mounted) setReviewList(data);
          return;
        }
      } catch (e) {
        // ignore and fallback to initialReviews
      }
      if (mounted) setReviewList(initialReviews);
    };
    fetchReviews();
    return () => {
      mounted = false;
    };
  }, [book.id]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("savedBooks");
      const arr = raw ? JSON.parse(raw) : [];
      setSaved(arr.includes(book.id));
    } catch (e) {
      setSaved(false);
    }
  }, [book.id]);

  const handleAddComment = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!commentName.trim() || !commentText.trim()) return;

    const payload = {
      user: commentName.trim(),
      rating: commentRating,
      comment: commentText.trim(),
    };

    try {
      const res = await fetch(`http://localhost:4000/books/${book.id}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const created = await res.json();
        setReviewList((prev) => [created, ...prev]);
      } else {
        // fallback: add locally with temporary id
        const temp = { id: Date.now(), date: "Baru saja", ...payload };
        setReviewList((prev) => [temp, ...prev]);
      }
    } catch (e) {
      const temp = { id: Date.now(), date: "Baru saja", ...payload };
      setReviewList((prev) => [temp, ...prev]);
    }

    setCommentName("");
    setCommentText("");
    setCommentRating(5);
  };

  const toggleSave = () => {
    try {
      const raw = localStorage.getItem("savedBooks");
      const arr: number[] = raw ? JSON.parse(raw) : [];
      let next: number[];
      if (arr.includes(book.id)) {
        next = arr.filter((x) => x !== book.id);
        setSaved(false);
      } else {
        next = [book.id, ...arr];
        setSaved(true);
      }
      localStorage.setItem("savedBooks", JSON.stringify(next));
    } catch (e) {
      // ignore
    }
  };

  const handleRead = () => {
    setShowReader(true);
  };

  const handleCloseReader = () => {
    setShowReader(false);
  };

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: book.title, url });
        setShareMessage("Link dibagikan");
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setShareMessage("Link disalin ke clipboard");
      } else {
        setShareMessage("Salin link: " + url);
      }
    } catch (e) {
      setShareMessage("Gagal membagikan");
    }
    setTimeout(() => setShareMessage(""), 2500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link
          to="/browse"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Kembali ke Browse</span>
        </Link>
      </div>

      {/* Book Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-3 gap-8 p-8">
            {/* Book Cover */}
            <div className="md:col-span-1">
              <div className="sticky top-8">
                <div className="aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-6 space-y-3">
                  <button onClick={handleRead} className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all">
                    Baca Sekarang
                  </button>
                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={toggleSave} className="flex items-center justify-center gap-2 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                      <Heart className={`w-5 h-5 ${saved ? "text-red-500 fill-red-500" : "text-gray-600"}`} />
                      <span>{saved ? "Tersimpan" : "Simpan"}</span>
                    </button>
                    <button onClick={handleShare} className="flex items-center justify-center gap-2 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                      <Share2 className="w-5 h-5" />
                      <span>Bagikan</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Book Info */}
            <div className="md:col-span-2">
              <div className="mb-4">
                <span className="inline-block bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                  {book.category}
                </span>
              </div>

              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {book.title}
              </h1>

              <p className="text-xl text-gray-600 mb-4">oleh {book.author}</p>

              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-5 h-5 ${
                          star <= Math.floor(book.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-lg">{book.rating}</span>
                  <span className="text-gray-500">
                    ({book.reviews.toLocaleString()} ulasan)
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">Tahun</span>
                  </div>
                  <p className="font-semibold text-gray-900">{book.year}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <BookOpen className="w-4 h-4" />
                    <span className="text-sm">Halaman</span>
                  </div>
                  <p className="font-semibold text-gray-900">{book.pages}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 md:col-span-2">
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <Tag className="w-4 h-4" />
                    <span className="text-sm">Penerbit</span>
                  </div>
                  <p className="font-semibold text-gray-900">{book.publisher}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    Sinopsis
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {book.description}
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    {book.longDescription}
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Ulasan Pembaca
                  </h2>
                  <form
                    onSubmit={handleAddComment}
                    className="space-y-4 mb-6 bg-white rounded-3xl border border-gray-200 p-6 shadow-sm"
                  >
                    <div className="grid gap-4 md:grid-cols-2">
                      <label className="block">
                        <span className="text-sm font-medium text-gray-700">
                          Nama
                        </span>
                        <input
                          type="text"
                          value={commentName}
                          onChange={(event) => setCommentName(event.target.value)}
                          placeholder="Masukkan nama Anda"
                          className="mt-2 w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                        />
                      </label>

                      <label className="block">
                        <span className="text-sm font-medium text-gray-700">
                          Rating
                        </span>
                        <select
                          value={commentRating}
                          onChange={(event) => setCommentRating(Number(event.target.value))}
                          className="mt-2 w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                        >
                          {[5, 4, 3, 2, 1].map((value) => (
                            <option key={value} value={value}>
                              {value} bintang
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>

                    <label className="block">
                      <span className="text-sm font-medium text-gray-700">
                        Komentar
                      </span>
                      <textarea
                        value={commentText}
                        onChange={(event) => setCommentText(event.target.value)}
                        rows={4}
                        placeholder="Tulis komentar Anda..."
                        className="mt-2 w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                      />
                    </label>

                    <button
                      type="submit"
                      className="inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
                    >
                      Tambah Komentar
                    </button>
                  </form>

                  <div className="space-y-4">
                    {reviewList.map((review) => (
                      <div
                        key={review.id}
                        className="bg-gray-50 rounded-xl p-6"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="font-semibold text-gray-900">
                              {review.user}
                            </p>
                            <p className="text-sm text-gray-500">
                              {review.date}
                            </p>
                          </div>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Books */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Buku Serupa
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {similarBooks.map((similarBook) => (
              <Link
                key={similarBook.id}
                to={`/book/${similarBook.id}`}
                className="group bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition-all hover:-translate-y-2"
              >
                <div className="aspect-[2/3] overflow-hidden bg-gray-100">
                  <img
                    src={similarBook.cover}
                    alt={similarBook.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-semibold">
                      {similarBook.rating}
                    </span>
                  </div>
                  <h3 className="font-semibold text-sm mb-1 text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                    {similarBook.title}
                  </h3>
                  <p className="text-xs text-gray-600">{similarBook.author}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {showReader && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={handleCloseReader} />
          <div className="relative bg-white rounded-2xl max-w-3xl w-full p-6 z-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Membaca: {book.title}</h3>
              <button onClick={handleCloseReader} className="text-sm text-gray-600 px-3 py-1 rounded-lg border">Tutup</button>
            </div>
            <div className="h-96 overflow-auto rounded-lg border p-4">
              <p className="text-gray-700">Placeholder reader — ini tampilan sementara untuk fitur "Baca Sekarang".</p>
              <p className="mt-4 text-sm text-gray-500">Implementasikan reader penuh untuk menampilkan isi buku.</p>
            </div>
          </div>
        </div>
      )}

      {shareMessage && (
        <div className="fixed bottom-6 right-6 bg-black text-white py-2 px-4 rounded-lg z-50 shadow">
          {shareMessage}
        </div>
      )}
    </div>
  );
}
