import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { userService } from '../services/userService';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Account = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [userProfile, setUserProfile] = useState(null);
  const [stats, setStats] = useState({
    quizzesTaken: 0,
    quizzesCreated: 0,
    totalScore: 0,
    averageScore: 0,
    streak: 0
  });
  const [recentQuizzes, setRecentQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user data from database
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.id) {
        console.log('No user ID available, skipping API calls');
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        console.log('Fetching data for user ID:', user.id);
        
        // Fetch user profile, stats, and quiz history in parallel
        const [profileData, statsData, quizzesData] = await Promise.all([
          userService.getUserProfile(user.id),
          userService.getUserStats(user.id),
          userService.getUserQuizHistory(user.id)
        ]);
        
        console.log('Profile data from API:', profileData);
        console.log('Stats data from API:', statsData);
        console.log('Quizzes data from API:', quizzesData);
        
        setUserProfile(profileData);
        setStats(statsData);
        setRecentQuizzes(quizzesData);
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Keep default values if API fails
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user?.id]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-quiz-light to-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-quiz-blue to-quiz-brown p-8 text-white">
            <div className="flex items-center space-x-6">
              <img
                src={user?.avatar}
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
              />
              <div>
                <h1 className="text-3xl font-bold">{userProfile?.nama_user || user?.name}</h1>
                <p className="text-white/90 text-lg">{userProfile?.email_user || user?.email}</p>
                <p className="text-white/80 mt-2">
                  Bergabung sejak {formatDate(user?.joinDate)}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-8">
              <button
                onClick={() => setActiveTab('profile')}
                className={`py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'profile'
                    ? 'border-quiz-blue text-quiz-blue'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Profil
              </button>
              <button
                onClick={() => setActiveTab('statistics')}
                className={`py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'statistics'
                    ? 'border-quiz-blue text-quiz-blue'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Statistik
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'history'
                    ? 'border-quiz-blue text-quiz-blue'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Riwayat Kuis
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-quiz-dark">Informasi Profil</h2>
                {loading ? (
                  <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-quiz-blue"></div>
                    <p className="mt-2 text-gray-500">Memuat data profil...</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-quiz-light/30 p-6 rounded-lg">
                      <label className="block text-sm font-medium text-quiz-dark mb-2">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        value={userProfile?.nama_user || user?.name || ''}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-quiz-blue focus:border-quiz-blue"
                        readOnly
                      />
                    </div>
                    <div className="bg-quiz-light/30 p-6 rounded-lg">
                      <label className="block text-sm font-medium text-quiz-dark mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={userProfile?.email_user || user?.email || ''}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-quiz-blue focus:border-quiz-blue"
                        readOnly
                      />
                    </div>
                    <div className="bg-quiz-light/30 p-6 rounded-lg">
                      <label className="block text-sm font-medium text-quiz-dark mb-2" >
                        Nim
                      </label>
                      <input
                        type="text"
                        value={userProfile?.nim || user?.nim || ''}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-quiz-blue focus:border-quiz-blue"
                        readOnly
                      />
                      {!(userProfile?.nim || user?.nim) && (
                        <p className="text-sm text-gray-500 mt-2">NIM belum diisi</p>
                      )}
                    </div>
                    <div className="bg-quiz-light/30 p-6 rounded-lg" >
                      <label className="block text-sm font-medium text-quiz-dark mb-2" >
                        Universitas 
                      </label>
                      <input 
                        type="text"
                        value={userProfile?.universitas || user?.university || ''}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-quiz-blue focus:border-quiz-blue"
                        readOnly
                      />
                      {!(userProfile?.universitas || user?.university) && (
                        <p className="text-sm text-gray-500 mt-2">Universitas belum diisi</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'statistics' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-quiz-dark">Statistik Anda</h2>
                {loading ? (
                  <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-quiz-blue"></div>
                    <p className="mt-2 text-gray-500">Memuat statistik...</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-r from-quiz-blue to-quiz-blue/80 p-6 rounded-lg text-white">
                      <h3 className="text-lg font-semibold mb-2">Kuis Diikuti</h3>
                      <p className="text-3xl font-bold">{stats.quizzesTaken}</p>
                    </div>
                    <div className="bg-gradient-to-r from-quiz-brown to-quiz-brown/80 p-6 rounded-lg text-white">
                      <h3 className="text-lg font-semibold mb-2">Kuis Dibuat</h3>
                      <p className="text-3xl font-bold">{stats.quizzesCreated}</p>
                    </div>
                    <div className="bg-gradient-to-r from-quiz-yellow to-quiz-yellow/80 p-6 rounded-lg text-quiz-dark">
                      <h3 className="text-lg font-semibold mb-2">Total Skor</h3>
                      <p className="text-3xl font-bold">{stats.totalScore}</p>
                    </div>
                    <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-lg text-white">
                      <h3 className="text-lg font-semibold mb-2">Rata-rata Skor</h3>
                      <p className="text-3xl font-bold">{stats.averageScore}%</p>
                    </div>
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-lg text-white">
                      <h3 className="text-lg font-semibold mb-2">Streak Hari</h3>
                      <p className="text-3xl font-bold">{stats.streak}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'history' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-quiz-dark">Riwayat Kuis</h2>
                {loading ? (
                  <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-quiz-blue"></div>
                    <p className="mt-2 text-gray-500">Memuat riwayat kuis...</p>
                  </div>
                ) : recentQuizzes.length > 0 ? (
                  <div className="space-y-4">
                    {recentQuizzes.map((quiz) => (
                      <div key={quiz.id} className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold text-quiz-dark">{quiz.title}</h3>
                          <p className="text-gray-500 text-sm">
                            {formatDate(quiz.date)}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className={`text-2xl font-bold ${
                            quiz.score >= 80 ? 'text-green-600' : 
                            quiz.score >= 60 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {quiz.score}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>Belum ada riwayat kuis</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Account;
