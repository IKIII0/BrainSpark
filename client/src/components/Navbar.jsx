import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const smoothScrollTo = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
    setIsMenuOpen(false);
  };

  const handleNavigation = (section) => {
    if (onNavigate) {
      onNavigate(section);
    } else {
      smoothScrollTo(section);
    }
  };

  const handleStartNow = () => {
    if (isAuthenticated) {
      navigate('/ChooseQuiz');
    } else {
      navigate('/login');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-quiz-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold text-quiz-dark">
                BrainSpark
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link 
                to="/" 
                onClick={() => handleNavigation('home')}
                className="text-quiz-dark hover:text-quiz-blue transition-all duration-300 hover:scale-105">
                Home
              </Link>
              <Link
                to="/"
                onClick={() => handleNavigation('features')}
                className="text-quiz-dark hover:text-quiz-blue transition-all duration-300 hover:scale-105"
              >
                Fitur
              </Link>
              <Link
                to="/"
                onClick={() => handleNavigation('how-it-works')}
                className="text-quiz-dark hover:text-quiz-blue transition-all duration-300 hover:scale-105"
              >
                Tutorial
              </Link>
             
                            
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleStartNow}
                    className="bg-quiz-blue hover:bg-quiz-blue/90 text-white px-6 py-2 rounded-lg transition-colors duration-200"
                  >
                    Mulai Sekarang
                  </button>
                  <Link
                    to="/account"
                    className="flex items-center space-x-2 text-quiz-dark hover:text-quiz-blue transition-colors"
                  >
                    <img
                      src={user?.avatar}
                      alt="Profile"
                      className="w-8 h-8 rounded-full"
                    />
                    {/* <span>{user?.name}</span> */}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-quiz-dark hover:text-red-600 transition-colors"
                  >
                    Keluar
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/login"
                    className="text-quiz-dark bg-quiz-blue hover:bg-quiz-blue/90 text-white px-6 py-2 rounded-lg transition-colors duration-200"
                  >
                    Masuk
                  </Link>                  
                </div>
              )}
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
                onClick={() => handleNavigation('home')}
                className="block w-full text-left text-quiz-dark hover:text-quiz-blue px-3 py-2 transition-all duration-300 hover:bg-quiz-light/30"
              >
                Home
              </button>
              <button
                onClick={() => handleNavigation('features')}
                className="block w-full text-left text-quiz-dark hover:text-quiz-blue px-3 py-2 transition-all duration-300 hover:bg-quiz-light/30"
              >
                Fitur
              </button>
              <button
                onClick={() => handleNavigation('how-it-works')}
                className="block w-full text-left text-quiz-dark hover:text-quiz-blue px-3 py-2 transition-all duration-300 hover:bg-quiz-light/30"
              >
              Tutorial
              </button>
                            
              {isAuthenticated ? (
                <>
                  <button
                    onClick={handleStartNow}
                    className="w-full text-left bg-quiz-blue hover:bg-quiz-blue/90 text-white px-3 py-2 rounded-lg"
                  >
                    Mulai Sekarang
                  </button>
                  <Link
                    to="/account"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-2 text-quiz-dark hover:text-quiz-blue px-3 py-2 transition-all duration-300 hover:bg-quiz-light/30"
                  >
                    <img
                      src={user?.avatar}
                      alt="Profile"
                      className="w-6 h-6 rounded-full"
                    />
                    <span>Akun Saya</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left text-red-600 hover:text-red-700 px-3 py-2 transition-all duration-300 hover:bg-red-50"
                  >
                    Keluar
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full text-left text-quiz-dark hover:text-quiz-blue px-3 py-2 transition-all duration-300 hover:bg-quiz-light/30"
                  >
                    Masuk
                  </Link>                  
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
