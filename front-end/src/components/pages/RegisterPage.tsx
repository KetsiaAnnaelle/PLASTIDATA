import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { API_URL } from '../../config';

import { Link } from 'react-router-dom';
import { User, Building2, Mail, Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { Header } from '../sections/Header';
import { Footer } from '../sections/Footer';

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
    onSubmit: async (values, { setSubmitting }) => {
      console.log('Account registered:', values);
      try {
        await axios.post(`${API_URL}/register/`, {
          name: values.name,
          company: values.company,
          email: values.email,
          password: values.password,
        });
        setRegisterSuccess(true);
      } catch (error: any) {
        console.error('Registration error:', error);
        alert(error.response?.data?.email?.[0] || error.response?.data?.detail || 'Une erreur est survenue lors de l\'inscription.');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="auth-page-wrapper">
      {/* Background ambient lighting glows */}
      <div className="auth-glow-1" />
      <div className="auth-glow-2" />

      <Header />

      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="auth-container">
          <div className="auth-card animate-slide-up">
            {/* Header info with official brand logo */}
            <div className="auth-header">
              <img src="/img/logo-plastidata.png" alt="PlastiData Logo" className="auth-logo" />
              <h1>Créer un compte</h1>
              <p>Commencez à piloter votre usine avec PlastiData</p>
            </div>

            {registerSuccess ? (
              <div className="auth-success-box animate-fade-in">
                <div className="auth-success-icon">
                  <CheckCircle size={44} style={{ color: '#27ae60' }} />
                </div>
                <h3 className="auth-success-title">Inscription complétée !</h3>
                <p className="auth-success-desc">
                  Votre compte a été créé avec succès. <strong>Nous venons de vous envoyer votre eBook gratuit par email</strong> ! Vérifiez votre boîte de réception (et vos spams).
                </p>
                <div style={{ marginTop: '20px' }}>
                  <Link to="/login" className="auth-btn-submit" style={{ textDecoration: 'none' }}>
                    Se connecter
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={formik.handleSubmit} className="flex flex-col gap-1">
                {/* Full Name */}
                <div className="auth-form-group">
                  <label htmlFor="name" className="auth-label">
                    Nom et prénom
                  </label>
                  <div className="auth-input-wrapper">
                    <span className="auth-input-icon">
                      <User size={18} />
                    </span>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Jean Dupont"
                      className={`auth-input ${
                        formik.touched.name && formik.errors.name ? 'error' : ''
                      }`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                    />
                  </div>
                  {formik.touched.name && formik.errors.name && (
                    <span className="auth-error-msg">
                      {formik.errors.name}
                    </span>
                  )}
                </div>

                {/* Company Name */}
                <div className="auth-form-group">
                  <label htmlFor="company" className="auth-label">
                    Nom de l'entreprise
                  </label>
                  <div className="auth-input-wrapper">
                    <span className="auth-input-icon">
                      <Building2 size={18} />
                    </span>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      placeholder="Plastique SARL"
                      className={`auth-input ${
                        formik.touched.company && formik.errors.company ? 'error' : ''
                      }`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.company}
                    />
                  </div>
                  {formik.touched.company && formik.errors.company && (
                    <span className="auth-error-msg">
                      {formik.errors.company}
                    </span>
                  )}
                </div>

                {/* Email Address */}
                <div className="auth-form-group">
                  <label htmlFor="email" className="auth-label">
                    Adresse email
                  </label>
                  <div className="auth-input-wrapper">
                    <span className="auth-input-icon">
                      <Mail size={18} />
                    </span>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="exemple@usine.com"
                      className={`auth-input ${
                        formik.touched.email && formik.errors.email ? 'error' : ''
                      }`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                  </div>
                  {formik.touched.email && formik.errors.email && (
                    <span className="auth-error-msg">
                      {formik.errors.email}
                    </span>
                  )}
                </div>

                {/* Password */}
                <div className="auth-form-group">
                  <label htmlFor="password" className="auth-label">
                    Mot de passe
                  </label>
                  <div className="auth-input-wrapper">
                    <span className="auth-input-icon">
                      <Lock size={18} />
                    </span>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className={`auth-input ${
                        formik.touched.password && formik.errors.password ? 'error' : ''
                      }`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />
                    <button
                      type="button"
                      className="auth-input-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {formik.touched.password && formik.errors.password && (
                    <span className="auth-error-msg">
                      {formik.errors.password}
                    </span>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="auth-form-group">
                  <label htmlFor="confirmPassword" className="auth-label">
                    Confirmer le mot de passe
                  </label>
                  <div className="auth-input-wrapper">
                    <span className="auth-input-icon">
                      <Lock size={18} />
                    </span>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className={`auth-input ${
                        formik.touched.confirmPassword && formik.errors.confirmPassword ? 'error' : ''
                      }`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.confirmPassword}
                    />
                  </div>
                  {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                    <span className="auth-error-msg">
                      {formik.errors.confirmPassword}
                    </span>
                  )}
                </div>

                {/* Terms checkbox */}
                <div className="auth-form-group">
                  <label className="auth-checkbox-label">
                    <input
                      name="terms"
                      type="checkbox"
                      className="auth-checkbox"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      checked={formik.values.terms}
                    />
                    <span className="auth-checkbox-text">
                      J'accepte les conditions d'utilisation de PlastiData et la politique de gestion des données.
                    </span>
                  </label>
                  {formik.touched.terms && formik.errors.terms && (
                    <span className="auth-error-msg">
                      {formik.errors.terms}
                    </span>
                  )}
                </div>

                {/* Submit Action using Brand Red Button */}
                <button
                  type="submit"
                  className="auth-btn-submit"
                >
                  Créer mon compte
                </button>

                {/* Footer redirection to Login */}
                <div className="auth-footer">
                  <p>
                    Déjà inscrit ?{' '}
                    <Link to="/login" className="auth-footer-link">
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
