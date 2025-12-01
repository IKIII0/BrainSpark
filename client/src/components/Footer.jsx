const Footer = () => {
  return (
    <footer className="bg-quiz-dark text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">BrainSpark</h3>
            <p className="text-gray-300 mb-4">
              Platform untuk belajar dan mengikuti kuis interaktif.
              Bangkitkan rasa ingin tahu dan perluas pengetahuan Anda.
            </p>
            <div className="flex space-x-4">
              {/* X (Twitter) */}
              <a
                href="#"
                className="text-gray-300 hover:text-quiz-yellow transition-colors"
                aria-label="Follow us on X"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="#"
                className="text-gray-300 hover:text-quiz-yellow transition-colors"
                aria-label="Follow us on Instagram"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.017 0C8.396 0 7.929.01 6.684.048 5.443.085 4.60.204 3.875.43c-.789.306-1.459.717-2.126 1.384S.436 3.085.13 3.875C-.095 4.6-.214 5.443-.251 6.684-.289 7.929-.299 8.396-.299 12.017s.01 4.088.048 5.333c.037 1.24.156 2.083.38 2.813.307.788.718 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.73.226 1.573.343 2.813.381 1.245.038 1.712.047 5.333.047 3.62 0 4.088-.009 5.333-.047 1.24-.038 2.083-.155 2.813-.381.788-.305 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.226-.73.343-1.573.381-2.813.038-1.245.047-1.713.047-5.333S23.954 7.929 23.916 6.684c-.038-1.241-.155-2.084-.381-2.813-.305-.789-.718-1.459-1.384-2.126C21.484 1.078 20.815.667 20.027.361 19.297.135 18.454.018 17.214-.02 15.969-.058 15.502-.068 11.881-.068l.136.136zm-.085 1.98h.022c3.596 0 4.02-.006 5.441.045 1.313.06 2.026.28 2.5.464.63.245 1.078.537 1.548 1.007s.762.918 1.007 1.548c.183.474.404 1.187.464 2.5.051 1.421.055 1.845.055 5.441 0 3.596-.004 4.02-.055 5.441-.06 1.313-.281 2.026-.464 2.5a4.165 4.165 0 01-1.007 1.548c-.47.47-.918.762-1.548 1.007-.474.183-1.187.403-2.5.464-1.42.051-1.845.055-5.441.055-3.597 0-4.021-.004-5.441-.055-1.313-.06-2.026-.281-2.5-.464a4.14 4.14 0 01-1.548-1.007 4.14 4.14 0 01-1.007-1.548c-.183-.474-.403-1.187-.464-2.5-.051-1.421-.055-1.845-.055-5.441 0-3.596.004-4.02.055-5.441.06-1.313.281-2.026.464-2.5.245-.63.537-1.078 1.007-1.548s.918-.762 1.548-1.007c.474-.183 1.187-.403 2.5-.464 1.421-.051 1.845-.055 5.441-.055l-.004.004zm0 3.37a5.666 5.666 0 100 11.332 5.666 5.666 0 000-11.332zm0 9.35a3.683 3.683 0 110-7.366 3.683 3.683 0 010 7.366zm6.406-8.845a1.32 1.32 0 11-2.64 0 1.32 1.32 0 012.64 0z" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="#"
                className="text-gray-300 hover:text-quiz-yellow transition-colors"
                aria-label="Follow us on Facebook"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Link cepat</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a
                  href="#"
                  className="hover:text-quiz-yellow transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="hover:text-quiz-yellow transition-colors"
                >
                  Fitur
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="hover:text-quiz-yellow transition-colors"
                >
                  Tutorial
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
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2025 BrainSpark. All rigths reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
