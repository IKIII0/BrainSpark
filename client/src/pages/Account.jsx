import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { userService } from '../services/userService';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { toast } from 'react-hot-toast';

const Account = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [userProfile, setUserProfile] = useState(null);
  const [stats, setStats] = useState({
    quizzesTaken: 0,
    totalScore: 0,
    averageScore: 0,
    streak: 0
  });
  const [recentQuizzes, setRecentQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [editForm, setEditForm] = useState({
    nama_user: '',
    email_user: '',
    nim: '',
    universitas: '',
    no_hp: '',
  });

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

  const handleEditChange = (field, value) => {
    setEditForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCancelEdit = () => {
    // Reset form to current profile values
    if (userProfile || user) {
      setEditForm({
        nama_user: userProfile?.nama_user || user?.name || '',
        email_user: userProfile?.email_user || user?.email || '',
        nim: userProfile?.nim || user?.nim || '',
        universitas: userProfile?.universitas || user?.university || '',
        no_hp: userProfile?.no_hp || user?.no_hp || '',
      });
    }
    setSaveError('');
    setEditMode(false);
  };

  const handleSaveProfile = async () => {
    if (!userProfile && !user) return;

    const userId = userProfile?.id || user?.id;
    if (!userId) return;

    setSavingProfile(true);
    setSaveError('');

    try {
      const payload = {
        nama_user: editForm.nama_user,
        email_user: editForm.email_user,
        nim: editForm.nim || null,
        universitas: editForm.universitas || null,
        no_hp: editForm.no_hp || null,
      };

      await userService.updateUserProfile(userId, payload);

      // Refresh profile data after update
      const refreshed = await userService.getUserProfile(userId);
      setUserProfile(refreshed);

      toast.success('Profil berhasil diperbarui');
      setEditMode(false);
    } catch (error) {
      console.error('Error saving profile:', error);
      setSaveError('Gagal menyimpan profil. Silakan coba lagi.');
      toast.error('Gagal menyimpan profil. Silakan coba lagi.');
    } finally {
      setSavingProfile(false);
    }
  };

  // Sync edit form with loaded profile/user data
  useEffect(() => {
    if (userProfile || user) {
      setEditForm({
        nama_user: userProfile?.nama_user || user?.name || '',
        email_user: userProfile?.email_user || user?.email || '',
        nim: userProfile?.nim || user?.nim || '',
        universitas: userProfile?.universitas || user?.university || '',
        no_hp: userProfile?.no_hp || user?.no_hp || '',
      });
    }
  }, [userProfile, user]);

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
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-quiz-dark">Informasi Profil</h2>
                  {!loading && (
                    <div className="flex items-center gap-3">
                      {saveError && (
                        <span className="text-sm text-red-500 mr-2">{saveError}</span>
                      )}
                      {!editMode ? (
                        <button
                          type="button"
                          onClick={() => setEditMode(true)}
                          className="px-4 py-2 text-sm font-medium text-white bg-quiz-blue rounded-lg hover:bg-blue-700"
                        >
                          Edit Profil
                        </button>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={handleCancelEdit}
                            className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                            disabled={savingProfile}
                          >
                            Batal
                          </button>
                          <button
                            type="button"
                            onClick={handleSaveProfile}
                            className="px-4 py-2 text-sm font-medium text-white bg-quiz-blue rounded-lg hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
                            disabled={savingProfile}
                          >
                            {savingProfile ? 'Menyimpan...' : 'Simpan'}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
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
                        value={editForm.nama_user}
                        onChange={(e) => handleEditChange('nama_user', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-quiz-blue focus:border-quiz-blue"
                        readOnly={!editMode}
                      />
                    </div>
                    <div className="bg-quiz-light/30 p-6 rounded-lg">
                      <label className="block text-sm font-medium text-quiz-dark mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={editForm.email_user}
                        onChange={(e) => handleEditChange('email_user', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-quiz-blue focus:border-quiz-blue"
                        readOnly={!editMode}
                      />
                    </div>
                    <div className="bg-quiz-light/30 p-6 rounded-lg">
                      <label className="block text-sm font-medium text-quiz-dark mb-2" >
                        Nim
                      </label>
                      <input
                        type="text"
                        value={editForm.nim}
                        onChange={(e) => handleEditChange('nim', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-quiz-blue focus:border-quiz-blue"
                        readOnly={!editMode}
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
                        value={editForm.universitas}
                        onChange={(e) => handleEditChange('universitas', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-quiz-blue focus:border-quiz-blue"
                        readOnly={!editMode}
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
