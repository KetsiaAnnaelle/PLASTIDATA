import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Header } from '../sections/Header';
import { Footer } from '../sections/Footer';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  // Form validation schema matching the premium design requirements
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, 'Le nom doit contenir au moins 2 caractères')
      .required('Nom et prénom requis'),
    company: Yup.string()
      .required('Nom de votre entreprise requis'),
    need: Yup.string()
      .required('Veuillez sélectionner votre besoin'),
    message: Yup.string()
      .min(10, 'Le message doit faire au moins 10 caractères')
      .required('Le message ne peut pas être vide'),
  });

  // Formik configuration
  const formik = useFormik({
    initialValues: {
      name: '',
      company: '',
      need: '',
      message: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('Contact form submitted with values:', values);
      setSubmitted(true);
      formik.resetForm();
    },
  });

  return (
    <div className="contact-page-wrapper flex flex-col min-h-screen">
      {/* HEADER */}
      <Header />

      <main className="flex-grow">
        {/* HERO */}
        <section className="contact-hero">
             <img src="/img/img-contact.svg" alt="logo" className='contact-hero-icon w-60 h-60'/>
        
          <h1>Contactez-nous</h1>
          <p>Discutons de votre projet d'amélioration qualité</p>
        </section>

        {/* CONTENT */}
        <div className="contact-content">
          
          {/* Left Column: Parlons de votre projet content checklist */}
          <div className="contact-left-col">
            {/* INTRO */}
            <div className="contact-intro">
              <h2>Parlons de votre projet</h2>
              <p>
                Que vous souhaitiez obtenir le guide, demander une démonstration de nos dashboards, ou discuter d'une intervention sur site, nous sommes là pour vous accompagner.
              </p>
            </div>

            {/* SOUS-TEXTE */}
            <p className="contact-subtext">
              Remplissez le formulaire ci-contre et nous vous recontacterons dans les 24&nbsp;heures pour échanger sur vos besoins.
            </p>

            {/* EMAIL */}
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

            {/* FEATURES */}
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

          {/* Right Column: Form Card */}
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

                  {/* Name Field */}
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

                  {/* Company Field */}
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

                  {/* Need Select Field */}
                  <div className="contact-field">
                    <label htmlFor="need">Besoin</label>
                    <div className="contact-select-wrap">
                      <select
                        id="need"
                        name="need"
                        className={`${formik.values.need ? 'filled' : ''} ${formik.touched.need && formik.errors.need ? 'error' : ''}`}
                        value={formik.values.need}
                        onChange={formik.handleChange}
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

                  {/* Message Field */}
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

                  {/* Submit button */}
                  <button type="submit" className="contact-btn-send">
                    Envoyer le message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};
