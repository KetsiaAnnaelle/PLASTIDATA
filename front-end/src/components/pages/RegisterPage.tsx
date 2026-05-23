import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { User, Building2, Mail, Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { Header } from '../sections/Header';
import { Footer } from '../sections/Footer';
import { Button } from '../ui/Button';

export const RegisterPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  // Form validation schema with Yup
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, 'Le nom complet doit contenir au moins 2 caractères')
      .required('Le nom et prénom sont requis'),
    company: Yup.string()
      .required('Le nom de l\'entreprise est requis'),
    email: Yup.string()
      .email('Veuillez saisir une adresse email valide')
      .required('L\'adresse email est requise'),
    password: Yup.string()
      .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
      .required('Le mot de passe est requis'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Les mots de passe ne correspondent pas')
      .required('Veuillez confirmer votre mot de passe'),
    terms: Yup.boolean()
      .oneOf([true], 'Vous devez accepter les conditions d\'utilisation')
      .required('Requis'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      company: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('Account registered:', values);
      setRegisterSuccess(true);
      setTimeout(() => setRegisterSuccess(false), 5000);
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

            {/* Header info */}
            <div className="text-center mb-6">
              <span className="logo-icon text-3xl block mb-2 text-[#044776]">▰</span>
              <h1 className="text-2xl font-extrabold text-[#0b1f3a] tracking-tight">
                Créer un compte
              </h1>
              <p className="text-sm text-gray-500 mt-2">
                Commencez à piloter votre usine avec PlastiData
              </p>
            </div>

            {registerSuccess ? (
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 text-center animate-fade-in">
                <CheckCircle size={44} className="text-[#1dbde8] mx-auto mb-3" />
                <h3 className="text-lg font-bold text-gray-800 mb-1">Inscription complétée !</h3>
                <p className="text-sm text-gray-600">
                  Un email de confirmation vous a été envoyé. Veuillez activer votre compte pour accéder aux dashboards.
                </p>
              </div>
            ) : (
              <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
                {/* Full Name */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="name" className="text-xs font-extrabold text-gray-500 uppercase tracking-wider">
                    Nom et prénom
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                      <User size={18} />
                    </span>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Jean Dupont"
                      className={`w-full pl-11 pr-4 py-2.5 bg-gray-50 border rounded-xl font-semibold text-gray-800 placeholder-gray-400 outline-none transition-all focus:bg-white focus:border-[#1dbde8] focus:ring-2 focus:ring-[#1dbde8]/10 ${
                        formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-gray-200'
                      }`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                    />
                  </div>
                  {formik.touched.name && formik.errors.name && (
                    <span className="text-xs font-bold text-red-500">
                      {formik.errors.name}
                    </span>
                  )}
                </div>

                {/* Company Name */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="company" className="text-xs font-extrabold text-gray-500 uppercase tracking-wider">
                    Nom de l'entreprise
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                      <Building2 size={18} />
                    </span>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      placeholder="Plastique SARL"
                      className={`w-full pl-11 pr-4 py-2.5 bg-gray-50 border rounded-xl font-semibold text-gray-800 placeholder-gray-400 outline-none transition-all focus:bg-white focus:border-[#1dbde8] focus:ring-2 focus:ring-[#1dbde8]/10 ${
                        formik.touched.company && formik.errors.company ? 'border-red-500' : 'border-gray-200'
                      }`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.company}
                    />
                  </div>
                  {formik.touched.company && formik.errors.company && (
                    <span className="text-xs font-bold text-red-500">
                      {formik.errors.company}
                    </span>
                  )}
                </div>

                {/* Email Address */}
                <div className="flex flex-col gap-1">
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
                      className={`w-full pl-11 pr-4 py-2.5 bg-gray-50 border rounded-xl font-semibold text-gray-800 placeholder-gray-400 outline-none transition-all focus:bg-white focus:border-[#1dbde8] focus:ring-2 focus:ring-[#1dbde8]/10 ${
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

                {/* Password */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="password" className="text-xs font-extrabold text-gray-500 uppercase tracking-wider">
                    Mot de passe
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                      <Lock size={18} />
                    </span>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className={`w-full pl-11 pr-12 py-2.5 bg-gray-50 border rounded-xl font-semibold text-gray-800 placeholder-gray-400 outline-none transition-all focus:bg-white focus:border-[#1dbde8] focus:ring-2 focus:ring-[#1dbde8]/10 ${
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

                {/* Confirm Password */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="confirmPassword" className="text-xs font-extrabold text-gray-500 uppercase tracking-wider">
                    Confirmer le mot de passe
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                      <Lock size={18} />
                    </span>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className={`w-full pl-11 pr-4 py-2.5 bg-gray-50 border rounded-xl font-semibold text-gray-800 placeholder-gray-400 outline-none transition-all focus:bg-white focus:border-[#1dbde8] focus:ring-2 focus:ring-[#1dbde8]/10 ${
                        formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500' : 'border-gray-200'
                      }`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.confirmPassword}
                    />
                  </div>
                  {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                    <span className="text-xs font-bold text-red-500">
                      {formik.errors.confirmPassword}
                    </span>
                  )}
                </div>

                {/* Terms checkbox */}
                <div className="flex flex-col gap-1.5 mt-1">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      name="terms"
                      type="checkbox"
                      className="mt-1 accent-[#1dbde8] rounded w-4 h-4 cursor-pointer"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      checked={formik.values.terms}
                    />
                    <span className="text-xs text-gray-500 font-semibold leading-tight">
                      J'accepte les conditions d'utilisation de PlastiData et la politique de gestion des données.
                    </span>
                  </label>
                  {formik.touched.terms && formik.errors.terms && (
                    <span className="text-xs font-bold text-red-500">
                      {formik.errors.terms}
                    </span>
                  )}
                </div>

                {/* Submit Action */}
                <div className="mt-2">
                  <Button
                    type="submit"
                    className="w-full py-3.5 bg-[#1dbde8] hover:bg-[#1dbde8]/90 text-white font-extrabold rounded-xl transition-all shadow-md"
                  >
                    Créer mon compte
                  </Button>
                </div>

                {/* Footer redirection to Login */}
                <div className="text-center mt-3">
                  <p className="text-sm text-gray-500">
                    Déjà inscrit ?{' '}
                    <Link to="/login" className="font-extrabold text-[#1dbde8] hover:underline">
                      Se connecter
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
