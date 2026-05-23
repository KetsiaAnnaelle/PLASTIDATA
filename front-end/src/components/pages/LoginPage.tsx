import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { Header } from '../sections/Header';
import { Footer } from '../sections/Footer';
import { Button } from '../ui/Button';

export const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Form validation schema with Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Veuillez saisir une adresse email valide')
      .required('L\'adresse email est requise'),
    password: Yup.string()
      .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
      .required('Le mot de passe est requis'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('Login credentials:', values);
      setLoginSuccess(true);
      setTimeout(() => setLoginSuccess(false), 4000);
    },
  });

  return (
    <div className="min-h-screen bg-[#f5f8fc] flex flex-col">
      <Header />

      <main className="flex-grow flex items-center justify-center py-16">
        <div className="container max-w-md">
          <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-lg relative overflow-hidden animate-slide-up">
            {/* Top accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#1dbde8]" />

            {/* Brand details */}
            <div className="text-center mb-8">
              <span className="logo-icon text-3xl block mb-2 text-[#044776]">▰</span>
              <h1 className="text-2xl font-extrabold text-[#0b1f3a] tracking-tight">
                Connexion à PlastiData
              </h1>
              <p className="text-sm text-gray-500 mt-2">
                Accédez à votre espace et à vos tableaux de bord industriels
              </p>
            </div>

            {loginSuccess ? (
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 text-center animate-fade-in">
                <CheckCircle2 size={44} className="text-[#1dbde8] mx-auto mb-3" />
                <h3 className="text-lg font-bold text-gray-800 mb-1">Connexion réussie !</h3>
                <p className="text-sm text-gray-600">
                  Redirection en cours vers vos dashboards opérationnels...
                </p>
              </div>
            ) : (
              <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
                {/* Email Field */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-xs font-extrabold text-gray-500 uppercase tracking-wider">
                    Adresse email
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                      <Mail size={18} />
                    </span>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="exemple@usine.com"
                      className={`w-full pl-11 pr-4 py-3 bg-gray-50 border rounded-xl font-semibold text-gray-800 placeholder-gray-400 outline-none transition-all focus:bg-white focus:border-[#1dbde8] focus:ring-2 focus:ring-[#1dbde8]/10 ${
                        formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-200'
                      }`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                  </div>
                  {formik.touched.email && formik.errors.email && (
                    <span className="text-xs font-bold text-red-500">
                      {formik.errors.email}
                    </span>
                  )}
                </div>

                {/* Password Field */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center">
                    <label htmlFor="password" className="text-xs font-extrabold text-gray-500 uppercase tracking-wider">
                      Mot de passe
                    </label>
                    <a href="#forgot" className="text-xs font-bold text-[#1dbde8] hover:underline">
                      Mot de passe oublié ?
                    </a>
                  </div>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                      <Lock size={18} />
                    </span>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className={`w-full pl-11 pr-12 py-3 bg-gray-50 border rounded-xl font-semibold text-gray-800 placeholder-gray-400 outline-none transition-all focus:bg-white focus:border-[#1dbde8] focus:ring-2 focus:ring-[#1dbde8]/10 ${
                        formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-200'
                      }`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {formik.touched.password && formik.errors.password && (
                    <span className="text-xs font-bold text-red-500">
                      {formik.errors.password}
                    </span>
                  )}
                </div>

                {/* Submit Action */}
                <div className="mt-2">
                  <Button
                    type="submit"
                    className="w-full py-3.5 bg-[#1dbde8] hover:bg-[#1dbde8]/90 text-white font-extrabold rounded-xl transition-all shadow-md"
                  >
                    Se connecter
                  </Button>
                </div>

                {/* Footer redirection to Register */}
                <div className="text-center mt-4">
                  <p className="text-sm text-gray-500">
                    Pas encore de compte ?{' '}
                    <Link to="/register" className="font-extrabold text-[#1dbde8] hover:underline">
                      Créer un compte
                    </Link>
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
