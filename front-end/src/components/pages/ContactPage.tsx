import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useSearchParams } from 'react-router-dom';
import { Header } from '../sections/Header';
import { Footer } from '../sections/Footer';
import { useAuthStore } from '../../store/useAuthStore';
import { API_URL } from '../../config';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const { isAuthenticated } = useAuthStore();
  const [searchParams] = useSearchParams();
  const initialNeed = searchParams.get('need') || '';

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, 'Le nom doit contenir au moins 2 caractères')
      .required('Nom et prénom requis'),
    email: Yup.string().test(
      'email-required-when-unauthenticated',
      'Une adresse email valide est requise',
      function (value) {
        if (isAuthenticated) return true;
        return typeof value === 'string' && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);
      }
    ),
    company: Yup.string()
      .required('Nom de votre entreprise requis'),
    need: Yup.string()
      .required('Veuillez sélectionner votre besoin'),
    selectedDashboards: Yup.array().of(Yup.string()).test(
      'demo-dashboards-required',
      'Veuillez sélectionner au moins un tableau de bord',
      function (value) {
        const { need } = this.parent;
        if (need === 'demo') {
          return Array.isArray(value) && value.length > 0;
        }
        return true;
      }
    ),
    message: Yup.string()
      .min(10, 'Le message doit faire au moins 10 caractères')
      .required('Le message ne peut pas être vide'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      company: '',
      need: initialNeed,
      selectedDashboards: [] as string[],
      message: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const token = useAuthStore.getState().accessToken;
        const headers: Record<string, string> = {};
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        await axios.post(
          `${API_URL}/contact/`,
          {
            name: values.name,
            email: !isAuthenticated ? values.email : '',
            company: values.company,
            need: values.need,
            selected_dashboards: values.need === 'demo' ? values.selectedDashboards : [],
            message: values.message,
          },
          { headers }
        );
        setSubmitted(true);
        formik.resetForm();
      } catch (error) {
        console.error('Error submitting contact form:', error);
        alert('Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="contact-page-wrapper flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        <section className="contact-hero">
          <img src="/img/img-contact.svg" alt="logo" className="contact-hero-icon w-60 h-60" />
          <h1>Contactez-nous</h1>
          <p>Discutons de votre projet d'amélioration qualité</p>
        </section>

        <div className="contact-content">
          <div className="contact-left-col">
            <div className="contact-intro">
              <h2>Parlons de votre projet</h2>
              <p>
                Que vous souhaitiez obtenir le guide, demander une démonstration de nos dashboards, ou discuter d'une intervention sur site, nous sommes là pour vous accompagner.
              </p>
            </div>

            <p className="contact-subtext">
              Remplissez le formulaire ci-contre et nous vous recontacterons dans les 24&nbsp;heures pour échanger sur vos besoins.
            </p>

            <div className="contact-email-info">
              <div className="contact-icon-box">
                <svg viewBox="0 0 24 24">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M2 7l10 7 10-7" />
                </svg>
              </div>
              <div>
                <div className="label">Email</div>
                <div className="value">
                  <a href="mailto:contact@plastidata.fr" style={{ color: 'inherit', fontWeight: 'bold', textDecoration: 'none' }} className="hover:underline">
                    contact@plastidata.fr
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-features-card">
              <h3>Ce que nous pouvons faire pour vous</h3>
              <ul>
                <li>
                  <div className="contact-bullet"></div>
                  <span>Vous envoyer le guide PlastiData</span>
                </li>
                <li>
                  <div className="contact-bullet"></div>
                  <span>Organiser une démonstration de nos dashboards</span>
                </li>
                <li>
                  <div className="contact-bullet"></div>
                  <span>Discuter d'une intervention ou conférence</span>
                </li>
                <li>
                  <div className="contact-bullet"></div>
                  <span>Répondre à vos questions sur la méthode</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="contact-right-col">
            <div className="contact-form-card">
              {submitted ? (
                <div className="contact-success-msg" id="successMsg">
                  <div className="check">
                    <svg viewBox="0 0 24 24">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <h3>Message envoyé !</h3>
                  <p>Nous vous répondrons dans les 24 heures.</p>
                  <button
                    type="button"
                    className="contact-btn-send"
                    style={{ marginTop: '24px' }}
                    onClick={() => setSubmitted(false)}
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={formik.handleSubmit} id="formContent">
                  <h2>Envoyez-nous un message</h2>

                  <div className="contact-field">
                    <label htmlFor="name">Nom et prénom</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Votre nom complet"
                      className={formik.touched.name && formik.errors.name ? 'error' : ''}
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.name && formik.errors.name && (
                      <div style={{ color: '#dc2626', fontSize: '0.8rem', fontWeight: 'bold', marginTop: '6px' }}>
                        {formik.errors.name}
                      </div>
                    )}
                  </div>

                  {!isAuthenticated && (
                    <div className="contact-field animate-fade-in">
                      <label htmlFor="email">Adresse email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="exemple@usine.com"
                        className={formik.touched.email && formik.errors.email ? 'error' : ''}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.email && formik.errors.email && (
                        <div style={{ color: '#dc2626', fontSize: '0.8rem', fontWeight: 'bold', marginTop: '6px' }}>
                          {formik.errors.email}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="contact-field">
                    <label htmlFor="company">Entreprise</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      placeholder="Nom de votre entreprise"
                      className={formik.touched.company && formik.errors.company ? 'error' : ''}
                      value={formik.values.company}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.company && formik.errors.company && (
                      <div style={{ color: '#dc2626', fontSize: '0.8rem', fontWeight: 'bold', marginTop: '6px' }}>
                        {formik.errors.company}
                      </div>
                    )}
                  </div>

                  <div className="contact-field">
                    <label htmlFor="need">Besoin</label>
                    <div className="contact-select-wrap">
                      <select
                        id="need"
                        name="need"
                        className={`${formik.values.need ? 'filled' : ''} ${formik.touched.need && formik.errors.need ? 'error' : ''}`}
                        value={formik.values.need}
                        onChange={(e) => {
                          formik.handleChange(e);
                          if (e.target.value !== 'demo') {
                            formik.setFieldValue('selectedDashboards', []);
                          }
                        }}
                        onBlur={formik.handleBlur}
                      >
                        <option value="" disabled>Sélectionnez votre besoin</option>
                        <option value="guide">Obtenir le guide</option>
                        <option value="demo">Demander une démonstration</option>
                        <option value="conference">Intervention / Conférence</option>
                        <option value="other">Autre demande</option>
                      </select>
                    </div>
                    {formik.touched.need && formik.errors.need && (
                      <div style={{ color: '#dc2626', fontSize: '0.8rem', fontWeight: 'bold', marginTop: '6px' }}>
                        {formik.errors.need}
                      </div>
                    )}
                  </div>

                  {formik.values.need === 'demo' && (
                    isAuthenticated ? (
                      <div className="contact-field animate-fade-in" style={{ animationDuration: '0.3s' }}>
                        <label>Tableaux de bord à découvrir (sélectionnez-en au moins un)</label>
                        <div className="dashboards-selection-grid">
                          {[
                            { id: 'qualite', title: 'Dashboard Qualité', desc: 'Maîtrisez PPM, rebuts & Pareto' },
                            { id: 'process', title: 'Dashboard Process', desc: 'TRS, CP/CPK, cycles machine' },
                            { id: 'donnees', title: 'Dashboard Données', desc: 'Complétude & anomalies sources' },
                            { id: 'organisation', title: 'Dashboard Organisation', desc: 'Retards, actions, récidives' },
                          ].map((db) => {
                            const isChecked = formik.values.selectedDashboards.includes(db.id);
                            return (
                              <div
                                key={db.id}
                                className={`dashboard-select-card ${isChecked ? 'active' : ''}`}
                                onClick={() => {
                                  const current = [...formik.values.selectedDashboards];
                                  if (isChecked) {
                                    formik.setFieldValue(
                                      'selectedDashboards',
                                      current.filter((id) => id !== db.id)
                                    );
                                  } else {
                                    formik.setFieldValue('selectedDashboards', [...current, db.id]);
                                  }
                                }}
                              >
                                <div className="card-checkbox">
                                  {isChecked && <div className="card-checkbox-checked" />}
                                </div>
                                <div className="card-info">
                                  <span className="card-title">{db.title}</span>
                                  <span className="card-desc">{db.desc}</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        {formik.touched.selectedDashboards && formik.errors.selectedDashboards && (
                          <div style={{ color: '#dc2626', fontSize: '0.8rem', fontWeight: 'bold', marginTop: '6px' }}>
                            {formik.errors.selectedDashboards}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="unauthorized-demo-box animate-fade-in">
                        <h3 className="unauthorized-demo-title">Connexion requise</h3>
                        <p className="unauthorized-demo-desc">
                          Pour demander une démonstration et explorer nos tableaux de bord opérationnels, vous devez posséder un compte et être connecté.
                        </p>
                        <div className="unauthorized-demo-actions">
                          <Link to="/login" className="unauthorized-btn-login">
                            Se connecter
                          </Link>
                          <Link to="/register" className="unauthorized-btn-register">
                            Créer un compte
                          </Link>
                        </div>
                      </div>
                    )
                  )}

                  <div className="contact-field">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Décrivez votre besoin ou votre projet…"
                      className={formik.touched.message && formik.errors.message ? 'error' : ''}
                      value={formik.values.message}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.message && formik.errors.message && (
                      <div style={{ color: '#dc2626', fontSize: '0.8rem', fontWeight: 'bold', marginTop: '6px' }}>
                        {formik.errors.message}
                      </div>
                    )}
                  </div>

                  {formik.values.need === 'demo' && !isAuthenticated ? (
                    <Link
                      to="/login"
                      className="contact-btn-send"
                      style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      Se connecter pour continuer
                    </Link>
                  ) : (
                    <button type="submit" className="contact-btn-send">
                      Envoyer le message
                    </button>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
