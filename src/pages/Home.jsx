import { useState, useEffect } from "react";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const smoothScrollTo = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-quiz-light to-white">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-quiz-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-quiz-dark">
                  BrainSpark
                </h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <button
                  onClick={() => smoothScrollTo('features')}
                  className="text-quiz-dark hover:text-quiz-blue transition-all duration-300 hover:scale-105"
                >
                  Fitur
                </button>
                <button
                  onClick={() => smoothScrollTo('how-it-works')}
                  className="text-quiz-dark hover:text-quiz-blue transition-all duration-300 hover:scale-105"
                >
                  Cara Kerja
                </button>
                <button
                  onClick={() => smoothScrollTo('pricing')}
                  className="text-quiz-dark hover:text-quiz-blue transition-all duration-300 hover:scale-105"
                >
                  Harga
                </button>
                <button className="bg-quiz-blue hover:bg-quiz-blue/90 text-white px-6 py-2 rounded-lg transition-colors duration-200">
                  Mulai Sekarang
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-quiz-dark p-2"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white rounded-lg mt-2 shadow-lg">
                <button
                  onClick={() => { smoothScrollTo('features'); setIsMenuOpen(false); }}
                  className="block w-full text-left text-quiz-dark hover:text-quiz-blue px-3 py-2 transition-all duration-300 hover:bg-quiz-light/30"
                >
                  Fitur
                </button>
                <button
                  onClick={() => { smoothScrollTo('how-it-works'); setIsMenuOpen(false); }}
                  className="block w-full text-left text-quiz-dark hover:text-quiz-blue px-3 py-2 transition-all duration-300 hover:bg-quiz-light/30"
                >
                  Cara Kerja
                </button>
                <button
                  onClick={() => { smoothScrollTo('pricing'); setIsMenuOpen(false); }}
                  className="block w-full text-left text-quiz-dark hover:text-quiz-blue px-3 py-2 transition-all duration-300 hover:bg-quiz-light/30"
                >
                  Harga
                </button>
                <button className="w-full text-left bg-quiz-blue hover:bg-quiz-blue/90 text-white px-3 py-2 rounded-lg">
                  Mulai Sekarang
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-quiz-light/20 to-transparent animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left animate-fade-in-up">
              <h2 className="text-4xl md:text-6xl font-bold text-quiz-dark leading-tight">
                Uji
                <span className="text-quiz-blue"> Pengetahuan</span>
                <br />
                <span className="text-quiz-brown">Asah Pikiran Anda</span>
              </h2>
              <p className="mt-6 text-xl text-quiz-dark/80 leading-relaxed">
                Buat, bagikan, dan ikuti kuis interaktif yang menantang otak
                dan memperluas pengetahuan Anda. Bergabunglah dengan ribuan
                pelajar dalam pengalaman kuis yang luar biasa.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button className="bg-quiz-blue hover:bg-quiz-blue/90 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  Mulai Kuis Sekarang
                </button>
                <button className="border-2 border-quiz-brown text-quiz-brown hover:bg-quiz-brown hover:text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200">
                  Buat Kuis
                </button>
              </div>
              <div className="mt-8 flex items-center justify-center lg:justify-start space-x-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-quiz-dark">10K+</div>
                  <div className="text-sm text-quiz-dark/60">Pengguna Aktif</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-quiz-dark">50K+</div>
                  <div className="text-sm text-quiz-dark/60">
                    Kuis Dibuat
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-quiz-dark">1M+</div>
                  <div className="text-sm text-quiz-dark/60">
                    Soal Terjawab
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-16 lg:mt-0 lg:col-span-6 animate-fade-in-left">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-quiz-yellow/20 to-quiz-blue/20 rounded-3xl transform rotate-6 transition-transform duration-500 hover:rotate-3 hover:scale-105"></div>
                <div className="relative bg-white rounded-3xl shadow-2xl p-8 transition-all duration-500 hover:shadow-3xl">
                  <div className="bg-quiz-light rounded-2xl p-6">
                    <h3 className="text-xl font-semibold text-quiz-dark mb-4">
                      Contoh Soal Kuis
                    </h3>
                    <p className="text-quiz-dark/80 mb-6">
                      Berapakah bilangan biner dari 5?
                    </p>
                    <div className="space-y-3">
                      <button className="w-full text-left p-3 rounded-lg bg-white border-2 border-transparent hover:border-quiz-blue transition-colors">
                        A) 1010
                      </button>
                      <button className="w-full text-left p-3 rounded-lg bg-quiz-blue text-white">
                        B) 0101 ✓
                      </button>
                      <button className="w-full text-left p-3 rounded-lg bg-white border-2 border-transparent hover:border-quiz-blue transition-colors">
                        C) 0011
                      </button>
                      <button className="w-full text-left p-3 rounded-lg bg-white border-2 border-transparent hover:border-quiz-blue transition-colors">
                        D) 0100
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-quiz-dark">
              Mengapa Memilih BrainSpark?
            </h2>
            <p className="mt-4 text-xl text-quiz-dark/80">
              Fitur canggih untuk meningkatkan pengalaman belajar Anda
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-2xl hover:shadow-lg transition-shadow duration-200">
              <div className="w-16 h-16 bg-quiz-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-quiz-dark"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-quiz-dark mb-2">
                Sangat Cepat
              </h3>
              <p className="text-quiz-dark/70">
                Pembuatan kuis yang cepat dan hasil instan. Dapatkan umpan
                balik langsung setelah setiap pertanyaan.
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:bg-gradient-to-br hover:from-quiz-blue/5 hover:to-transparent animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-quiz-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-quiz-dark mb-2">
                Kolaboratif
              </h3>
              <p className="text-quiz-dark/70">
                Bagikan kuis dengan teman, buat tantangan tim, dan belajar
                bersama.
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:bg-gradient-to-br hover:from-quiz-brown/5 hover:to-transparent animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="w-16 h-16 bg-quiz-brown rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-quiz-dark mb-2">
                Analitik
              </h3>
              <p className="text-quiz-dark/70">
                Lacak kemajuan Anda, identifikasi area yang lemah, dan saksikan
                pengetahuan Anda bertumbuh.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="py-20 bg-gradient-to-r from-quiz-light to-quiz-light/50 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-quiz-dark">
              Cara Kerja
            </h2>
            <p className="mt-4 text-xl text-quiz-dark/80">
              Mulai hanya dengan tiga langkah sederhana
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-20 h-20 bg-quiz-yellow rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300 hover:scale-110 hover:rotate-12">
                <span className="text-2xl font-bold text-quiz-dark">1</span>
              </div>
              <h3 className="text-xl font-semibold text-quiz-dark mb-4">
                Pilih atau Buat
              </h3>
              <p className="text-quiz-dark/70">
                Pilih dari ribuan kuis yang ada atau buat kuis kustom Anda
                sendiri dalam hitungan menit.
              </p>
            </div>

            <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-20 h-20 bg-quiz-blue rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300 hover:scale-110 hover:rotate-12">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-quiz-dark mb-4">
                Ikuti Kuis
              </h3>
              <p className="text-quiz-dark/70">
                Jawab pertanyaan sesuai kecepatan Anda dengan antarmuka yang
                intuitif dan menarik.
              </p>
            </div>

            <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="w-20 h-20 bg-quiz-brown rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300 hover:scale-110 hover:rotate-12">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-quiz-dark mb-4">
                Belajar & Berkembang
              </h3>
              <p className="text-quiz-dark/70">
                Dapatkan umpan balik instan, lacak kemajuan Anda, dan tingkatkan
                pengetahuan Anda dari waktu ke waktu.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="pricing" className="py-20 bg-gradient-to-r from-quiz-blue to-quiz-brown scroll-mt-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Siap Mengasah Otak Anda?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Bergabunglah dengan ribuan pelajar yang sudah meningkatkan
            pengetahuan mereka dengan BrainSpark.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-quiz-blue hover:bg-gray-50 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105">
              Mulai Kuis Pertama
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-quiz-blue px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:-translate-y-2 hover:scale-105">
              Pelajari Lebih Lanjut
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-quiz-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">BrainSpark</h3>
              <p className="text-gray-300 mb-4">
                Platform terbaik untuk membuat dan mengikuti kuis interaktif.
                Bangkitkan rasa ingin tahu dan perluas pengetahuan Anda.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-300 hover:text-quiz-yellow transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-quiz-yellow transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Produk</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a
                    href="#"
                    className="hover:text-quiz-yellow transition-colors"
                  >
                    Fitur
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-quiz-yellow transition-colors"
                  >
                    Harga
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-quiz-yellow transition-colors"
                  >
                    Template
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-quiz-yellow transition-colors"
                  >
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Dukungan</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a
                    href="#"
                    className="hover:text-quiz-yellow transition-colors"
                  >
                    Pusat Bantuan
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-quiz-yellow transition-colors"
                  >
                    Hubungi Kami
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-quiz-yellow transition-colors"
                  >
                    Kebijakan Privasi
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-quiz-yellow transition-colors"
                  >
                    Syarat Layanan
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 BrainSpark. Semua hak dilindungi.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
