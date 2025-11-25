import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
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
      <Navbar onNavigate={smoothScrollTo} />

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
            <div className="text-center p-6 rounded-2xl hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:bg-gradient-to-br hover:from-quiz-blue/5 hover:to-transparent animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
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

      <Footer />
    </div>
  );
};

export default Home;
