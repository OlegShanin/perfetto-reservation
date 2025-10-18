# Perfetto Caffè - Tischreservierung

Eine elegante React-Anwendung für Tischreservierungen im Stil von Perfetto Caffè.

## 🚀 Features

- **Responsive Design**: Optimiert für alle Geräte
- **Elegante UI**: Warme Beige- und Kaffeetöne im Stil von Perfetto Caffè
- **Formularvalidierung**: Vollständige Validierung der Reservierungsdaten
- **Datumseinschränkungen**: Reservierungen nur von morgen bis zu einem Monat im Voraus
- **Erfolgsmeldung**: Bestätigung nach erfolgreicher Reservierung
- **BEM-Methodologie**: Saubere und wartbare CSS-Struktur
- **SOLID-Prinzipien**: Gut strukturierter, erweiterbarer Code

## 🛠️ Technologien

- **React 18** - Moderne React-Features
- **Vite** - Schneller Build-Tool
- **Bootstrap 5** - Responsive UI-Framework
- **SCSS** - Erweiterte CSS-Funktionalität
- **Font Awesome** - Icons
- **Google Fonts** - Elegante Typografie

## 📁 Projektstruktur

```
src/
├── components/
│   ├── Header/
│   │   ├── Header.jsx
│   │   └── Header.scss
│   └── ReservationModal/
│       ├── ReservationModal.jsx
│       └── ReservationModal.scss
├── pages/
│   └── Home/
│       ├── Home.jsx
│       └── Home.scss
├── styles/
│   └── main.scss
├── App.jsx
└── main.jsx
```

## 🎨 Design-System

### Farbpalette
- **Perfetto Cream**: `#f5f1e8` - Haupt-Hintergrundfarbe
- **Perfetto Beige**: `#e8dcc0` - Sekundäre Hintergrundfarbe
- **Perfetto Coffee**: `#8b4513` - Primäre Akzentfarbe
- **Perfetto Dark Coffee**: `#5d2f0a` - Dunkle Akzentfarbe
- **Perfetto Gold**: `#d4af37` - Goldene Akzente

### Typografie
- **Primary Font**: Playfair Display (Serif) - Für Überschriften
- **Secondary Font**: Source Sans Pro (Sans-Serif) - Für Fließtext

## 🚀 Installation und Start

1. **Abhängigkeiten installieren**:
   ```bash
   npm install
   ```

2. **Entwicklungsserver starten**:
   ```bash
   npm run dev
   ```

3. **Anwendung öffnen**:
   Öffnen Sie [http://localhost:5173](http://localhost:5173) in Ihrem Browser

## 📝 Verwendung

1. **Startseite**: Willkommensnachricht und "Tisch reservieren" Button
2. **Reservierungsformular**: 
   - Vorname und Nachname eingeben
   - Datum auswählen (morgen bis ein Monat im Voraus)
   - Anzahl der Gäste wählen (1-20 Personen)
3. **Bestätigung**: Erfolgsmeldung nach der Reservierung

## 🏗️ Build für Produktion

```bash
npm run build
```

## 🧪 Tests

```bash
npm run test
```

## 📋 SOLID-Prinzipien

- **Single Responsibility**: Jede Komponente hat eine klare Verantwortung
- **Open/Closed**: Komponenten sind erweiterbar ohne Modifikation
- **Liskov Substitution**: Komponenten sind austauschbar
- **Interface Segregation**: Klare, spezifische Interfaces
- **Dependency Inversion**: Abhängigkeiten werden injiziert

## 🎯 BEM-Methodologie

Alle CSS-Klassen folgen der BEM-Konvention:
- **Block**: `.header`, `.reservation-modal`
- **Element**: `.header__brand`, `.modal__title`
- **Modifier**: `.btn--primary`, `.form--large`

## 📱 Responsive Design

- **Desktop**: Vollständige Funktionalität mit erweitertem Layout
- **Tablet**: Angepasstes Layout für mittlere Bildschirme
- **Mobile**: Optimiert für Touch-Geräte

## 🔧 Anpassungen

### Farben ändern
Bearbeiten Sie die CSS-Variablen in `src/styles/main.scss`:

```scss
:root {
  --perfetto-cream: #f5f1e8;
  --perfetto-coffee: #8b4513;
  // ... weitere Farben
}
```

### Schriftarten ändern
Aktualisieren Sie die Google Fonts-Importe und CSS-Variablen:

```scss
@import url('https://fonts.googleapis.com/css2?family=YourFont:wght@400;500;600;700&display=swap');

:root {
  --font-primary: 'YourFont', serif;
}
```

## 📄 Lizenz

Dieses Projekt ist für Demonstrationszwecke erstellt.