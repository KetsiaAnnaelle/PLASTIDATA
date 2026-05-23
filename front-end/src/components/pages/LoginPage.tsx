import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { Header } from '../sections/Header';
import { Footer } from '../sections/Footer';

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
    <div className="auth-page-wrapper">
      {/* Background ambient lighting glows */}
      <div className="auth-glow-1" />
      <div className="auth-glow-2" />

      <Header />

      <main className="flex-grow flex items-center justify-center py-16 px-4">
        <div className="auth-container">
          <div className="auth-card animate-slide-up">
            {/* Header info with official logo */}
            <div className="auth-header">
              <img src="/img/logo-plastidata.png" alt="PlastiData Logo" className="auth-logo" />
              <h1>Connexion</h1>
              <p>Accédez à votre espace et à vos tableaux de bord industriels</p>
            </div>

            {loginSuccess ? (
              <div className="auth-success-box animate-fade-in">
                <div className="auth-success-icon">
                  <CheckCircle2 size={44} />
                </div>
                <h3 className="auth-success-title">Connexion réussie !</h3>
                <p className="auth-success-desc">
                  Redirection en cours vers vos dashboards opérationnels...
                </p>
              </div>
            ) : (
              <form onSubmit={formik.handleSubmit} className="flex flex-col gap-1">
                {/* Email Field */}
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

                {/* Password Field */}
                <div className="auth-form-group">
                  <div className="flex justify-between items-center">
                    <label htmlFor="password" className="auth-label">
                      Mot de passe
                    </label>
                    <a href="#forgot" className="auth-forgot">
                      Mot de passe oublié ?
                    </a>
                  </div>
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

                {/* Submit Action using Brand Red Button */}
                <button
                  type="submit"
                  className="auth-btn-submit"
                >
                  Se connecter
                </button>

                {/* Footer redirection to Register */}
                <div className="auth-footer">
                  <p>
                    Pas encore de compte ?{' '}
                    <Link to="/register" className="auth-footer-link">
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
