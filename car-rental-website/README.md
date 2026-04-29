# 🚗 Ulan Car Rental Website

A modern, feature-rich car rental management application built with React. This Single Page Application (SPA) provides a seamless experience for browsing available vehicles, managing bookings, and handling administrative tasks.

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)
- [API Service](#api-service)
- [Component Architecture](#component-architecture)
- [State Management](#state-management)
- [Internationalization](#internationalization)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

### Core Features
- **🔐 Authentication System**
  - Secure login/signup pages
  - Protected routes with ProtectedRoute component
  - Session persistence with localStorage

- **🚙 Vehicle Management**
  - Browse complete car fleet
  - Advanced search and filtering with debouncing
  - Create, read, update, and delete vehicle records
  - Detailed vehicle specifications display

- **📅 Booking System**
  - Real-time price calculation
  - Date validation and selection
  - Form validation with inline error messages
  - Booking confirmation with summary

- **🌐 Multi-language Support**
  - English, Chinese (中文), and Kazakh (Қазақша)
  - Language persistence across sessions
  - Comprehensive translation dictionary

- **📱 Responsive Design**
  - Mobile-first approach
  - Tablet and desktop optimized layouts
  - Touch-friendly interface

### Advanced Features
- **⚡ Performance Optimizations**
  - Debounced search input (300ms delay)
  - Memoized computed values
  - Code splitting with React Router

- **🎨 User Experience**
  - Toast notifications for user feedback
  - Loading spinners for async operations
  - Smooth animations and transitions
  - Accessible form validation

- **🛡️ Error Handling**
  - Comprehensive API error handling
  - User-friendly error messages
  - Graceful error recovery

---

## 🛠️ Technology Stack

| Category | Technologies |
|----------|---------------|
| **Frontend Framework** | React 19.2.4 |
| **Routing** | React Router DOM 7.13.0 |
| **State Management** | React Hooks (useState, useReducer, useContext) |
| **Styling** | CSS3 with responsive design |
| **Development** | React Scripts 5.0.1 |
| **Code Quality** | PropTypes for type checking |
| **Formatting** | Prettier |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── AuthContext.js          # Authentication context
│   ├── LanguageContext.js      # Language/i18n context
│   ├── ToastContext.js         # Toast notifications system
│   ├── ProtectedRoute.js       # Route protection wrapper
│   ├── Header.js               # Main navigation header
│   ├── Footer.js               # Footer component
│   ├── Brand.js                # Brand/logo component
│   ├── NavLinks.js             # Navigation links
│   ├── CarCard.js              # Individual car card
│   ├── CarGrid.js              # Car grid layout
│   ├── CarsLayout.js           # Cars management layout
│   ├── LoadingSpinner.js       # Loading indicator
│   └── PageTitle.js            # Page header component
│
├── pages/
│   ├── Home.js                 # Home/dashboard page
│   ├── Login.js                # Login page
│   ├── Signup.js               # Registration page
│   ├── Cars.js                 # Cars listing page
│   ├── CarForm.js              # Car CRUD form
│   ├── Booking.js              # Booking form page
│   ├── Support.js              # Customer support page
│   └── NotFound.js             # 404 page
│
├── hooks/
│   ├── useDebounce.js          # Debounce hook
│   └── useLocalStorage.js      # LocalStorage hook
│
├── services/
│   └── api.js                  # Mock API service
│
├── assets/
│   └── styles.css              # Global styles
│
├── App.js                      # Main app component
├── index.js                    # React entry point
└── ...config files
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Steps

1. **Clone the repository** (or download the project)
   ```bash
   cd car-rental-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment** (optional)
   - Copy `.env.example` to `.env`
   - Update any necessary configuration variables

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open in browser**
   - Navigate to `http://localhost:3000`
   - Default login credentials:
     - Email: `johndoe@gmail.com`
     - Password: `123`

### Build for Production

```bash
npm run build
```

The build folder will contain the optimized production build.

---

## 💻 Usage

### User Workflow

1. **Access the Application**
   - Visit the login page
   - Sign up for a new account or use demo credentials

2. **Browse Vehicles**
   - Navigate to the Cars page
   - Search for specific vehicles using the search bar
   - Filter results by name or type

3. **Make a Booking**
   - Click "Book Now" on any vehicle
   - Fill in booking details (name, phone, dates, location)
   - Review the calculated total price
   - Confirm the booking

4. **Manage Vehicles** (Admin features)
   - Add new vehicles via "Add Car" button
   - Edit vehicle information
   - Delete vehicles from the fleet

5. **Change Language**
   - Use language selector in header
   - Switch between English, Chinese, and Kazakh
   - Language preference is saved automatically

---

## 🔌 API Service

The application uses a mock API service (`src/services/api.js`) that simulates backend operations.

### Available Methods

```javascript
// Get all cars
carService.fetchCars()

// Add new car
carService.addCar(carData)

// Update car
carService.updateCar(carData)

// Delete car
carService.deleteCar(id)
```

### Error Handling

The API service includes:
- Input validation
- Error messages with HTTP status codes
- Retry-ready error objects
- Graceful error recovery

---

## 🏗️ Component Architecture

### Context API Usage

1. **AuthContext** - Manages authentication state
2. **LanguageContext** - Manages language/localization
3. **ToastContext** - Manages toast notifications

### Custom Hooks

```javascript
// Debounce hook
useDebounce(value, delay = 500)

// LocalStorage hook
useLocalStorage(key, initialValue)

// Toast hook
useToast() // returns { success, error, warning, info }
```

### Protected Routes

```javascript
<Route
  path="/protected"
  element={
    <ProtectedRoute>
      <ProtectedComponent />
    </ProtectedRoute>
  }
/>
```

---

## 📊 State Management

The application uses React's built-in state management:

- **Local State**: `useState` for component-level state
- **Reducer**: `useReducer` in CarForm for complex form state
- **Context**: Global state for auth, language, and notifications
- **LocalStorage**: Persistence for user preferences and data

---

## 🌍 Internationalization

The application supports 3 languages:

| Language | Code | Status |
|----------|------|--------|
| English | `en` | ✅ Complete |
| Chinese | `cn` | ✅ Complete |
| Kazakh | `kz` | ✅ Complete |

Translation files are in `LanguageContext.js`. Add new languages by extending the `translations` object.

---

## 🎯 Key Features Explained

### Search with Debouncing
- Reduces API calls by delaying search execution
- Default delay: 300ms
- Customizable via `useDebounce` hook

### Form Validation
- Real-time inline validation
- Displays error messages as user types
- Prevents submission with invalid data

### Loading States
- Loading spinners during async operations
- Disabled buttons during submission
- User feedback for all actions

### Toast Notifications
- Non-intrusive user notifications
- Auto-dismiss after 3 seconds
- Different styles for success, error, warning, info

---

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1200px
- **Desktop**: > 1200px

All layouts automatically adjust for optimal viewing experience.

---

## 🧪 Testing

Currently, the project doesn't include automated tests. To add tests:

```bash
npm test
```

Configure Jest and React Testing Library as needed.

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=build
```

### GitHub Pages

1. Update `package.json`:
   ```json
   "homepage": "https://yourusername.github.io/car-rental-website"
   ```

2. Deploy:
   ```bash
   npm run build
   npm run deploy
   ```

---

## 🐛 Troubleshooting

### Issue: Port 3000 already in use
```bash
# Use a different port
PORT=3001 npm start
```

### Issue: Styles not loading
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Issue: localStorage not persisting
- Check browser's privacy settings
- Ensure third-party cookies are allowed
- Test in incognito/private mode

---

## 📚 Code Guidelines

- **Components**: Use functional components with hooks
- **Naming**: Use PascalCase for components, camelCase for functions
- **Props**: Always define propTypes for components
- **Comments**: Add JSDoc comments for complex functions
- **Styling**: Use the global stylesheet or CSS-in-JS for inline styles

---

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

---

## 📄 License

This project is open source and available under the MIT License.

---

## 📞 Support

For questions or issues:
- Create an issue on GitHub
- Contact the development team
- Check the FAQ in the Support section

---

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [React Router Guide](https://reactrouter.com)
- [React Hooks API](https://react.dev/reference/react)
- [CSS Best Practices](https://web.dev/css/)

---

**Last Updated**: April 2026  
**Version**: 1.0.0  
**Maintainer**: Development Team