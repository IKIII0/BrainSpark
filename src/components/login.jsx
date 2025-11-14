import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Email dan kata sandi wajib diisi.');
      return;
    }
    setLoading(true);
    try {
      if (onLogin) {
        await onLogin({ email, password });
      } else {
        await new Promise((r) => setTimeout(r, 600));
        if (password.length < 6) {
          throw new Error('Kata sandi minimal 6 karakter.');
        }
      }
    } catch (err) {
      setError(err?.message || 'Gagal masuk. Coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-sm bg-white p-7 rounded-xl shadow-lg">
        <h1 className="m-0 text-2xl font-bold text-gray-900">Masuk</h1>
        <p className="mt-1.5 mb-5 text-sm text-gray-500">Silakan masuk untuk melanjutkan.</p>

        {error ? (
          <div className="mb-3 p-3 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm">
            {error}
          </div>
        ) : null}

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3.5">
            <div>
              <label htmlFor="email" className="block mb-1.5 text-sm text-gray-700">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full px-3 py-2 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                autoComplete="email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-1.5 text-sm text-gray-700">Kata Sandi</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pr-10 pl-3 py-2 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? 'Sembunyikan' : 'Tampilkan'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-1 w-full px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold"
            >
              {loading ? 'Memproses...' : 'Masuk'}
            </button>

            <button 
                type="button" 
                className="flex items-center justify-center gap-2 py-2 px-3 bg-white border border-gray-600 rounded-lg hover:bg-blue-600/700 hover:text-blue-900 transition-colors hover:border-blue-800"
            >
                <img src="./google.svg" alt="google" className="w-5"/>
                <span className="ml-2">Google</span>
            </button>
          </div>
        </form>

        <div className="mt-4 text-center text-sm text-gray-500">
          Lupa kata sandi?
          <button type="button" className="text-blue-600 hover:text-blue-700 ml-1">Reset</button>
        </div>
      </div>
    </div>
  );
}

