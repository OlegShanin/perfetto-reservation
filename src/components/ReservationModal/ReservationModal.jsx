import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
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
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Vorname ist erforderlich';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Nachname ist erforderlich';
    }

    if (!formData.date) {
      newErrors.date = 'Datum ist erforderlich';
    }

    if (formData.guests < 1 || formData.guests > 20) {
      newErrors.guests = 'Anzahl der Gäste muss zwischen 1 und 20 liegen';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Simulate API call
      setTimeout(() => {
        setIsSubmitted(true);
      }, 1000);
    }
  };

  const handleClose = () => {
    setIsSubmitted(false);
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
              Ihre Tischreservierung für <strong>{formData.guests} {formData.guests === 1 ? 'Person' : 'Personen'}</strong>
              am <strong>{new Date(formData.date).toLocaleDateString('de-DE')}</strong>
              unter dem Namen <strong>{formData.firstName} {formData.lastName}</strong> wurde erfolgreich erstellt.
            </p>
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
          >
            Abbrechen
          </Button>
          <Button
            type="submit"
            variant="perfetto"
            className="btn-perfetto"
          >
            Reservierung bestätigen
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ReservationModal;

