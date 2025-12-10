import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { materiService } from "../services/materiService";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ChooseQuiz = () => {
  const navigate = useNavigate();
  const { isAdmin, user } = useAuth();
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newMaterial, setNewMaterial] = useState({
    title: "",
    description: "",
    level: "Pemula",
    questionsCount: 10,
    color: "from-quiz-blue to-quiz-blue/80",
  });

  // Fetch materi from database
  useEffect(() => {
    const fetchMateri = async () => {
      try {
        setLoading(true);
        const materiData = await materiService.getAllMateri();

        // Format data for frontend
        const formattedMaterials = materiData.map((materi) => ({
          id: materi.id.toString(),
          title: materi.nama_materi,
          description: materi.deskripsi || "Deskripsi materi",
          level: materi.level || "Pemula",
          questionsCount: materi.jumlah_soal || 10,
          color: "from-quiz-blue to-quiz-blue/80",
        }));

        setMaterials(formattedMaterials);
      } catch (err) {
        console.error("Error fetching materi:", err);
        setError("Gagal memuat materi. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    };

    fetchMateri();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMaterial((prev) => ({
      ...prev,
      [name]: name === "questionsCount" ? Number(value) || 0 : value,
    }));
  };

  const handleAddMaterial = async (e) => {
    e.preventDefault();
    if (!isAdmin) return;

    const trimmedTitle = newMaterial.title.trim();
    if (!trimmedTitle) return;

    try {
      // Create materi via API
      const newMateri = await materiService.createMateri({
        nama_materi: trimmedTitle,
        level: newMaterial.level,
        deskripsi: newMaterial.description,
        jumlah_soal: newMaterial.questionsCount,
      });

      // Add to local state
      const materialToAdd = {
        id: newMateri.id,
        title: newMateri.nama_materi,
        description: newMateri.deskripsi,
        level: newMateri.level,
        questionsCount: newMateri.jumlah_soal,
        color: "from-quiz-blue to-quiz-blue/80",
      };

      setMaterials((prev) => [...prev, materialToAdd]);
      setNewMaterial({
        title: "",
        description: "",
        level: "Pemula",
        questionsCount: 10,
        color: "from-quiz-blue to-quiz-blue/80",
      });
    } catch (error) {
      console.error("Error creating materi:", error);
      toast.error("Gagal membuat materi. Silakan coba lagi.");
    }
  };

  const handleDeleteMaterial = async (materialId) => {
    if (!isAdmin) return;

    if (!window.confirm("Apakah Anda yakin ingin menghapus materi ini?")) {
      return;
    }

    try {
      await materiService.deleteMateri(materialId);
      setMaterials((prev) => prev.filter((m) => m.id !== materialId));
    } catch (error) {
      console.error("Error deleting materi:", error);
      toast.error("Gagal menghapus materi. Silakan coba lagi.");
    }
  };

  const handleStartQuiz = (materialId) => {
    // Sesuaikan dengan konfigurasi routing aplikasi
    navigate(`/quiz/${materialId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-quiz-light to-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-quiz-dark mb-2">
            Pilih Materi Kuis
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Pilih materi yang ingin kamu coba terlebih dahulu. Setiap materi
            berisi kumpulan soal interaktif untuk menguji dan melatih
            pemahamanmu.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-quiz-blue"></div>
            <span className="ml-3 text-gray-600">Memuat materi...</span>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <div className="text-red-600 mb-2">
              <svg
                className="w-12 h-12 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-red-800 mb-2">Error</h3>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Coba Lagi
            </button>
          </div>
        ) : (
          <>
            {isAdmin && (
              <div className="mb-10 max-w-3xl mx-auto bg-white rounded-xl shadow-md border border-gray-100 p-6">
                <h2 className="text-xl font-semibold text-quiz-dark mb-4">
                  Tambah Materi Kuis
                </h2>
                <form onSubmit={handleAddMaterial} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-quiz-dark mb-1">
                        Judul Materi
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={newMaterial.title}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-quiz-blue focus:border-quiz-blue text-sm"
                        placeholder="Mis. Algoritma Lanjutan"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-quiz-dark mb-1">
                        Level
                      </label>
                      <select
                        name="level"
                        value={newMaterial.level}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-quiz-blue focus:border-quiz-blue text-sm bg-white"
                      >
                        <option value="Pemula">Pemula</option>
                        <option value="Menengah">Menengah</option>
                        <option value="Lanjutan">Lanjutan</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-quiz-dark mb-1">
                      Deskripsi Singkat
                    </label>
                    <textarea
                      name="description"
                      value={newMaterial.description}
                      onChange={handleChange}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-quiz-blue focus:border-quiz-blue text-sm resize-none"
                      placeholder="Gambaran singkat materi yang akan diuji"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-quiz-dark mb-1">
                        Jumlah Soal
                      </label>
                      <input
                        type="number"
                        name="questionsCount"
                        min="1"
                        value={newMaterial.questionsCount}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-quiz-blue focus:border-quiz-blue text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-quiz-dark mb-1">
                        Warna Aksen (Tailwind)
                      </label>
                      <input
                        type="text"
                        name="color"
                        value={newMaterial.color}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-quiz-blue focus:border-quiz-blue text-sm"
                        placeholder="from-quiz-blue to-quiz-blue/80"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2.5 border border-transparent text-sm font-semibold rounded-lg shadow-sm text-white bg-quiz-blue hover:bg-quiz-blue/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-quiz-blue transition-colors"
                    >
                      Simpan Materi
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {materials.map((material) => (
                <div
                  key={material.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden border border-gray-100 flex flex-col"
                >
                  <div className={`h-2 bg-gradient-to-r ${material.color}`} />

                  <div className="p-6 flex flex-col flex-1">
                    <h2 className="text-xl font-semibold text-quiz-dark mb-2">
                      {material.title}
                    </h2>
                    <p className="text-gray-600 text-sm mb-4 flex-1">
                      {material.description}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-quiz-light/50 text-quiz-dark font-medium">
                        {material.level}
                      </span>
                      <span>{material.questionsCount} soal</span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStartQuiz(material.id)}
                        className="flex-1 inline-flex justify-center items-center px-4 py-2.5 border border-transparent text-sm font-semibold rounded-lg shadow-sm text-white bg-quiz-blue hover:bg-quiz-blue/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-quiz-blue transition-colors"
                      >
                        Mulai Kuis
                      </button>
                      {isAdmin && (
                        <button
                          onClick={() => handleDeleteMaterial(material.id)}
                          className="inline-flex justify-center items-center px-3 py-2.5 border border-transparent text-sm font-semibold rounded-lg shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 transition-colors"
                          title="Hapus materi"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ChooseQuiz;
