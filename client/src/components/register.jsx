import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { signInWithPopup } from "firebase/auth";
import { firebaseAuth, googleProvider } from "../firebase";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [formData, setFormData] = useState({
    nama_user: "",
    email_user: "",
    pass: "",
    nim: "",
    universitas: "",
    no_hp: "",
  });
  const [error, setError] = useState("");
  const [fieldError, setFieldError] = useState({});
  const [loading, setLoading] = useState(false);

  const { register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (fieldError[e.target.name]) {
      setFieldError((prev) => ({ ...prev, [e.target.name]: false }));
    }
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setFieldError({});
    setLoading(true);

    try {
      await register(formData);
      // Redirect ke login setelah berhasil
      navigate("/login", {
        state: { message: "Registrasi berhasil! Silakan login." },
      });
    } catch (err) {
      const message = err.message || "Terjadi kesalahan. Silakan coba lagi.";
      setError(message);

      toast.error(message);

      if (
        message.includes("Email atau nomor HP sudah terdaftar") ||
        message.toLowerCase().includes("sudah terdaftar")
      ) {
        setFieldError({ email_user: true, no_hp: true });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setError("");
    setFieldError({});

    try {
      const result = await signInWithPopup(firebaseAuth, googleProvider);
      const user = result.user;
      const idToken = await user.getIdToken();

      const loginResult = await loginWithGoogle(idToken);

      toast.success("Berhasil daftar / masuk dengan Google");

      if (loginResult?.isAdmin) {
        navigate("/admin", { replace: true });
      } else {
        navigate("/ChooseQuiz", { replace: true });
      }
    } catch (err) {
      console.error("Google register error:", err);
      const message = err?.message || "Gagal daftar dengan Google. Silakan coba lagi.";
      setError(message);
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-quiz-light to-white">
      <div className="w-full max-w-md bg-slate-100 p-8 rounded-xl shadow-lg">
        {/* Back Button */}
        <div className="mb-4">
          <Link
            to="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors hover:border-quiz-blue hover:border-1 hover:px-1 rounded-xl"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Kembali
          </Link>
        </div>

        <h1 className="m-0 text-2xl font-bold text-gray-900">Daftar Akun</h1>
        <p className="mt-1.5 mb-5 text-sm text-gray-500">
          Buat akun baru untuk memulai.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3.5">
            <div>
              <label
                htmlFor="nama_user"
                className="block mb-1.5 text-sm text-gray-700"
              >
                Nama Lengkap
              </label>
              <input
                id="nama_user"
                name="nama_user"
                type="text"
                value={formData.nama_user}
                onChange={handleChange}
                placeholder="Masukkan nama lengkap"
                className="w-full px-3 py-2 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email_user"
                className="block mb-1.5 text-sm text-gray-700"
              >
                Email
              </label>
              <input
                id="email_user"
                name="email_user"
                type="email"
                value={formData.email_user}
                onChange={handleChange}
                placeholder="nama@email.com"
                className={`w-full px-3 py-2 rounded-lg border outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  fieldError.email_user
                    ? "border-red-400 bg-red-50 focus:ring-red-400 focus:border-red-400"
                    : "border-gray-200"
                }`}
                required
              />
            </div>

            <div>
              <label
                htmlFor="pass"
                className="block mb-1.5 text-sm text-gray-700"
              >
                Kata Sandi
              </label>
              <input
                id="pass"
                name="pass"
                type="password"
                value={formData.pass}
                onChange={handleChange}
                placeholder="Minimal 6 karakter"
                className="w-full px-3 py-2 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                minLength="6"
                required
              />
            </div>

            <div>
              <label
                htmlFor="nim"
                className="block mb-1.5 text-sm text-gray-700"
              >
                NIM
              </label>
              <input
                id="nim"
                name="nim"
                type="text"
                value={formData.nim}
                onChange={handleChange}
                placeholder="Nomor Induk Mahasiswa"
                className="w-full px-3 py-2 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="universitas"
                className="block mb-1.5 text-sm text-gray-700"
              >
                Universitas
              </label>
              <input
                id="universitas"
                name="universitas"
                type="text"
                value={formData.universitas}
                onChange={handleChange}
                placeholder="Nama universitas"
                className="w-full px-3 py-2 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="no_hp"
                className="block mb-1.5 text-sm text-gray-700"
              >
                No. HP
              </label>
              <input
                id="no_hp"
                name="no_hp"
                type="tel"
                value={formData.no_hp}
                onChange={handleChange}
                placeholder="08123456789"
                className={`w-full px-3 py-2 rounded-lg border outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  fieldError.no_hp
                    ? "border-red-400 bg-red-50 focus:ring-red-400 focus:border-red-400"
                    : "border-gray-200"
                }`}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-1 w-full px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold"
            >
              {loading ? "Mendaftar..." : "Daftar"}
            </button>

            <button
              type="button"
              onClick={handleGoogleRegister}
              className="mt-2 flex items-center justify-center gap-2 py-2 px-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors w-full"
            >
              <img src="./google.svg" alt="google" className="w-5" />
              <span className="ml-2 text-sm font-medium text-gray-700">Daftar dengan Google</span>
            </button>
          </div>
        </form>

        <div className="mt-4 text-center text-sm text-gray-500">
          Sudah punya akun?
          <Link to="/login" className="text-blue-600 hover:text-blue-700 ml-1">
            Masuk
          </Link>
        </div>
      </div>
    </div>
  );
}
