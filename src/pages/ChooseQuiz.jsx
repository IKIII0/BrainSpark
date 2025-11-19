import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const initialMaterials = [
  {
    id: 'dasar-pemrograman',
    title: 'Dasar Pemrograman',
    description: 'Variabel, tipe data, dan perulangan.',
    level: 'Pemula',
    questionsCount: 15,
    color: 'from-quiz-blue to-quiz-blue/80',
  },
  {
    id: 'organisasi-komputer',
    title: 'Organisasi Arsitektur Komputer',
    description: 'Struktur komputer, CPU, memori, dan instruksi.',
    level: 'Menengah',
    questionsCount: 12,
    color: 'from-quiz-brown to-quiz-brown/80',
  },
  {
    id: 'struktur-data',
    title: 'Struktur Data',
    description: 'Array, linked list, stack, queue, dan tree dasar.',
    level: 'Menengah',
    questionsCount: 20,
    color: 'from-quiz-yellow to-quiz-yellow/80',
  },
  {
    id: 'basis-data',
    title: 'Basis Data',
    description: 'Konsep tabel, relasi, dan dasar SQL.',
    level: 'Pemula',
    questionsCount: 10,
    color: 'from-green-500 to-green-600',
  },
];

const ChooseQuiz = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [materials, setMaterials] = useState(initialMaterials);
  const [newMaterial, setNewMaterial] = useState({
    title: '',
    description: '',
    level: 'Pemula',
    questionsCount: 10,
    color: 'from-quiz-blue to-quiz-blue/80'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMaterial((prev) => ({
      ...prev,
      [name]: name === 'questionsCount' ? Number(value) || 0 : value
    }));
  };

  const handleAddMaterial = (e) => {
    e.preventDefault();
    if (!isAdmin) return;

    const trimmedTitle = newMaterial.title.trim();
    if (!trimmedTitle) return;

    const id = trimmedTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const materialToAdd = {
      id,
      ...newMaterial
    };

    setMaterials((prev) => [...prev, materialToAdd]);
    setNewMaterial({
      title: '',
      description: '',
      level: 'Pemula',
      questionsCount: 10,
      color: 'from-quiz-blue to-quiz-blue/80'
    });
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
            Pilih materi yang ingin kamu coba terlebih dahulu. Setiap materi berisi kumpulan
            soal interaktif untuk menguji dan melatih pemahamanmu.
          </p>
        </div>

        {isAdmin && (
          <div className="mb-10 max-w-3xl mx-auto bg-white rounded-xl shadow-md border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-quiz-dark mb-4">Tambah Materi Kuis</h2>
            <form onSubmit={handleAddMaterial} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-quiz-dark mb-1">Judul Materi</label>
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
                  <label className="block text-sm font-medium text-quiz-dark mb-1">Level</label>
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
                <label className="block text-sm font-medium text-quiz-dark mb-1">Deskripsi Singkat</label>
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
                  <label className="block text-sm font-medium text-quiz-dark mb-1">Jumlah Soal</label>
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
                  <label className="block text-sm font-medium text-quiz-dark mb-1">Warna Aksen (Tailwind)</label>
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
              <div
                className={`h-2 bg-gradient-to-r ${material.color}`}
              />

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

                <button
                  onClick={() => handleStartQuiz(material.id)}
                  className="mt-auto w-full inline-flex justify-center items-center px-4 py-2.5 border border-transparent text-sm font-semibold rounded-lg shadow-sm text-white bg-quiz-blue hover:bg-quiz-blue/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-quiz-blue transition-colors"
                >
                  Mulai Kuis
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ChooseQuiz;

