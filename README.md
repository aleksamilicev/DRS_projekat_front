# DRS_projekat_front
FRONT DEO

# Folder - file struktura (citljivo u VSC)
src/
├── assets/                     # Svi statički fajlovi (slike, fontovi, ikone)
├── components/                 # Reusable komponente
│   ├── Button/                 # Dugmad
│   │   ├── Button.jsx
│   │   ├── Button.css
│   │   └── index.js            # (Opcionalno: za lakši import)
│   ├── Navbar/                 # Navigacija
│   │   ├── Navbar.jsx
│   │   ├── Navbar.css
│   │   └── index.js
│   └── Footer/
│       ├── Footer.jsx
│       ├── Footer.css
│       └── index.js
├── pages/                      # Stranice aplikacije
│   ├── Home/
│   │   ├── Home.jsx
│   │   ├── Home.css
│   │   └── index.js
│   ├── Login/
│   │   ├── Login.jsx
│   │   ├── Login.css
│   │   └── index.js
│   ├── Profile/
│   │   ├── Profile.jsx
│   │   ├── Profile.css
│   │   └── index.js
│   ├── Posts/
│   │   ├── Posts.jsx
│   │   ├── Posts.css
│   │   └── index.js
│   ├── Friends/
│   │   ├── Friends.jsx
│   │   ├── Friends.css
│   │   └── index.js
│   └── NotFound/
│       ├── NotFound.jsx
│       ├── NotFound.css
│       └── index.js
├── services/                   # API funkcije
│   ├── api.js                  # Sve HTTP pozive grupisane ovde
├── utils/                      # Pomoćne funkcije (helperi)
│   ├── formatDate.js           # Primer: funkcija za formatiranje datuma
│   ├── constants.js            # Konstante za aplikaciju
├── App.jsx                     # Glavna aplikacija
├── App.css                     # Globalni stilovi aplikacije
├── index.js                    # Ulazna tačka React aplikacije
└── routes.js                   # Definicija ruta za aplikaciju

