import React, { useState, useEffect } from 'react';
import { Modal, Button, Alert, Spinner } from 'react-bootstrap';
import { createReservation } from '../../services/api';
import './ReservationModal.scss';

/**
 * ReservationModal Component - Single Responsibility Principle
 * Responsible for handling reservation form and submission
 */
const ReservationModal = ({ show, onHide }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    date: '',
    guests: 1
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [reservationData, setReservationData] = useState(null);
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');

  // Set date constraints (tomorrow to one month ahead)
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 1);

    setMinDate(tomorrow.toISOString().split('T')[0]);
    setMaxDate(maxDate.toISOString().split('T')[0]);
  }, []);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!show) {
      setFormData({
        firstName: '',
        lastName: '',
        date: '',
        guests: 1
      });
      setErrors({});
      setIsSubmitted(false);
      setIsLoading(false);
      setApiError('');
      setReservationData(null);
    }
  }, [show]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Clear API error when user makes changes
    if (apiError) {
      setApiError('');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate first name
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Vorname ist erforderlich';
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'Vorname muss mindestens 2 Zeichen lang sein';
    } else if (!/^[a-zA-ZäöüÄÖÜß\s-]+$/.test(formData.firstName.trim())) {
      newErrors.firstName = 'Vorname darf nur Buchstaben, Leerzeichen und Bindestriche enthalten';
    }
    
    // Validate last name
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Nachname ist erforderlich';
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'Nachname muss mindestens 2 Zeichen lang sein';
    } else if (!/^[a-zA-ZäöüÄÖÜß\s-]+$/.test(formData.lastName.trim())) {
      newErrors.lastName = 'Nachname darf nur Buchstaben, Leerzeichen und Bindestriche enthalten';
    }
    
    // Validate date
    if (!formData.date) {
      newErrors.date = 'Datum ist erforderlich';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const maxDate = new Date(today);
      maxDate.setMonth(maxDate.getMonth() + 1);
      
      if (selectedDate < tomorrow) {
        newErrors.date = 'Reservierungen sind erst ab morgen möglich';
      } else if (selectedDate > maxDate) {
        newErrors.date = 'Reservierungen sind nur bis zu einem Monat im Voraus möglich';
      }
    }
    
    // Validate guests
    if (!formData.guests || formData.guests < 1 || formData.guests > 20) {
      newErrors.guests = 'Anzahl der Gäste muss zwischen 1 und 20 liegen';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setApiError('');

    try {
      const reservationData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        date: formData.date,
        guests: parseInt(formData.guests)
      };

      const result = await createReservation(reservationData);
      setReservationData(result);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Reservation error:', error);
      setApiError(error.message || 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setIsLoading(false);
    setApiError('');
    setReservationData(null);
    onHide();
  };

  if (isSubmitted) {
    return (
      <Modal
        show={show}
        onHide={handleClose}
        centered
        className="modal-perfetto"
      >
        <Modal.Header closeButton>
          <Modal.Title>Reservierung erfolgreich!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <div className="success-message">
            <div className="success-message__icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <h4 className="success-message__title">
              Vielen Dank für Ihre Reservierung!
            </h4>
            <p className="success-message__text">
              Ihre Tischreservierung für <strong>{reservationData?.guests} {reservationData?.guests === 1 ? 'Person' : 'Personen'}</strong>
              am <strong>{reservationData?.date ? new Date(reservationData.date).toLocaleDateString('de-DE') : ''}</strong>
              unter dem Namen <strong>{reservationData?.firstName} {reservationData?.lastName}</strong> wurde erfolgreich erstellt.
            </p>
            {reservationData?.confirmationCode && (
              <p className="success-message__code">
                <strong>Bestätigungscode: {reservationData.confirmationCode}</strong>
              </p>
            )}
            <p className="success-message__note">
              Sie erhalten in Kürze eine Bestätigungs-E-Mail.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="perfetto"
            onClick={handleClose}
            className="btn-perfetto"
          >
            Schließen
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      className="modal-perfetto"
    >
      <Modal.Header closeButton>
        <Modal.Title>Tisch reservieren</Modal.Title>
      </Modal.Header>

      <form onSubmit={handleSubmit}>
        <Modal.Body>
          {apiError && (
            <Alert variant="danger" className="reservation-modal__error">
              <i className="fas fa-exclamation-triangle me-2"></i>
              {apiError}
            </Alert>
          )}
          
          <div className="form-perfetto">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="firstName" className="form-label">
                  Vorname *
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Ihr Vorname"
                />
                {errors.firstName && (
                  <div className="invalid-feedback">
                    {errors.firstName}
                  </div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="lastName" className="form-label">
                  Nachname *
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Ihr Nachname"
                />
                {errors.lastName && (
                  <div className="invalid-feedback">
                    {errors.lastName}
                  </div>
                )}
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="date" className="form-label">
                  Datum *
                </label>
                <input
                  type="date"
                  className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  min={minDate}
                  max={maxDate}
                />
                {errors.date && (
                  <div className="invalid-feedback">
                    {errors.date}
                  </div>
                )}
                <small className="form-text text-muted">
                  Reservierungen sind von morgen bis zu einem Monat im Voraus möglich
                </small>
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="guests" className="form-label">
                  Anzahl der Gäste *
                </label>
                <select
                  className={`form-control ${errors.guests ? 'is-invalid' : ''}`}
                  id="guests"
                  name="guests"
                  value={formData.guests}
                  onChange={handleInputChange}
                >
                  {Array.from({ length: 20 }, (_, i) => i + 1).map(num => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Person' : 'Personen'}
                    </option>
                  ))}
                </select>
                {errors.guests && (
                  <div className="invalid-feedback">
                    {errors.guests}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="outline-secondary"
            onClick={onHide}
            className="btn-perfetto-outline"
            disabled={isLoading}
          >
            Abbrechen
          </Button>
          <Button
            type="submit"
            variant="perfetto"
            className="btn-perfetto"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Wird verarbeitet...
              </>
            ) : (
              'Reservierung bestätigen'
            )}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ReservationModal;

