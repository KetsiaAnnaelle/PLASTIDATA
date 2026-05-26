import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { Header } from '../sections/Header';
import { Footer } from '../sections/Footer';
import { useAuthStore } from '../../store/useAuthStore';
import { API_URL } from '../../config';

export const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/';

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

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
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await axios.post(`${API_URL}/token/`, {
          username: values.email,
          password: values.password,
        });
        
        const { access, refresh, user } = response.data;
        
        useAuthStore.getState().login(
          {
            name: user?.name || '',
            company: user?.company || '',
            email: user?.email || values.email,
          },
          access,
          refresh
        );
        
        setLoginSuccess(true);
        setTimeout(() => {
          window.location.href = redirectTo;
        }, 1500);
      } catch (error: any) {
        console.error('Login error:', error);
        alert(error.response?.data?.detail || 'Identifiants invalides ou erreur serveur.');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="auth-page-wrapper">
      <div className="auth-glow-1" />
      <div className="auth-glow-2" />

      <Header />

      <main className="flex-grow flex items-center justify-center py-16 px-4">
        <div className="auth-container">
          <div className="auth-card animate-slide-up">
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

                <button type="submit" className="auth-btn-submit">
                  Se connecter
                </button>

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
