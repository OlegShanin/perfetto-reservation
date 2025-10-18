import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import ReservationModal from '../../components/ReservationModal/ReservationModal';
import { checkAvailability } from '../../services/api';
import './Home.scss';

/**
 * Home Page Component - Single Responsibility Principle
 * Responsible for displaying the home page with hero section
 */
const Home = () => {
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [availabilityMessage, setAvailabilityMessage] = useState('');
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);

  // Check availability for tomorrow when component mounts
  useEffect(() => {
    const checkTomorrowAvailability = async () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowString = tomorrow.toISOString().split('T')[0];

      setIsCheckingAvailability(true);
      try {
        const availability = await checkAvailability(tomorrowString);
        if (availability.available) {
          setAvailabilityMessage('Tische verfügbar für morgen!');
        } else {
          setAvailabilityMessage('Heute keine Verfügbarkeiten für morgen');
        }
      } catch (error) {
        setAvailabilityMessage('Verfügbarkeitsprüfung nicht möglich');
      } finally {
        setIsCheckingAvailability(false);
      }
    };

    checkTomorrowAvailability();
  }, []);

  const handleOpenReservationModal = () => {
    setShowReservationModal(true);
  };

  const handleCloseReservationModal = () => {
    setShowReservationModal(false);
  };

  return (
    <div className="home">
      <Header />

      <main className="home__main">
        <section className="hero" id="home">
          <div className="container">
            <div className="hero__content">
              <h1 className="hero__title">
                Willkommen bei Perfetto Caffè
              </h1>
              <p className="hero__subtitle">
                Genießen Sie die authentische italienische Küche in gemütlicher Atmosphäre.
                Reservieren Sie Ihren Tisch und erleben Sie unvergessliche Momente bei uns.
              </p>
              <div className="hero__button">
                <button
                  className="btn btn-perfetto btn-lg"
                  onClick={handleOpenReservationModal}
                  type="button"
                >
                  Tisch reservieren
                </button>

                {availabilityMessage && (
                  <div className="hero__availability">
                    <p className={`hero__availability-message ${availabilityMessage.includes('verfügbar') ? 'hero__availability-message--available' : 'hero__availability-message--unavailable'}`}>
                      <i className={`fas ${availabilityMessage.includes('verfügbar') ? 'fa-check-circle' : 'fa-info-circle'} me-2`}></i>
                      {isCheckingAvailability ? 'Prüfe Verfügbarkeit...' : availabilityMessage}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="home__features">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-6 mb-4">
                <div className="feature-card">
                  <div className="feature-card__icon">
                    <i className="fas fa-coffee"></i>
                  </div>
                  <h3 className="feature-card__title">Authentische Küche</h3>
                  <p className="feature-card__description">
                    Traditionelle italienische Gerichte mit frischen Zutaten
                  </p>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 mb-4">
                <div className="feature-card">
                  <div className="feature-card__icon">
                    <i className="fas fa-heart"></i>
                  </div>
                  <h3 className="feature-card__title">Gemütliche Atmosphäre</h3>
                  <p className="feature-card__description">
                    Warme und einladende Umgebung für entspannte Momente
                  </p>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 mb-4">
                <div className="feature-card">
                  <div className="feature-card__icon">
                    <i className="fas fa-users"></i>
                  </div>
                  <h3 className="feature-card__title">Perfekter Service</h3>
                  <p className="feature-card__description">
                    Freundliche Bedienung und persönliche Betreuung
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <ReservationModal
        show={showReservationModal}
        onHide={handleCloseReservationModal}
      />
    </div >
  );
};

export default Home;

