# Titan Fitness Website

A complete web-based fitness tracking platform built with React, allowing users to log workouts, track nutrition, and monitor their fitness progress.

## Features

- **User Authentication**: Secure login and registration
- **Workout Tracking**: Log exercises with detailed metrics
- **Nutrition Tracking**: Monitor meals and macronutrients
- **Progress Dashboard**: Visual analytics and progress tracking
- **Responsive Design**: Works seamlessly on all devices
- **Real-time Sync**: Synchronized with mobile app via shared backend

## Tech Stack

- **Frontend**: React 18, React Router v6
- **Styling**: CSS3 with responsive design
- **HTTP Client**: Axios for API requests
- **Backend**: Node.js/Express (shared with mobile app)

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## Project Structure

```
website/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   └── Footer.js
│   ├── pages/
│   │   ├── LandingPage.js
│   │   ├── LoginPage.js
│   │   ├── RegisterPage.js
│   │   ├── Dashboard.js
│   │   ├── LogWorkout.js
│   │   └── Progress.js
│   ├── styles/
│   │   ├── index.css
│   │   ├── variables.css
│   │   ├── Header.css
│   │   ├── Footer.css
│   │   ├── LandingPage.css
│   │   ├── Auth.css
│   │   ├── Dashboard.css
│   │   ├── LogWorkout.css
│   │   └── Progress.css
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```

## Pages

### Public Pages
- **Landing Page**: Hero section, features, testimonials, CTA
- **Login**: Secure user login
- **Register**: New user registration with profile setup

### Protected Pages (Auth Required)
- **Dashboard**: Overview of stats and quick actions
- **Log Workout**: Form to log exercises
- **Progress**: Analytics and history

## Environment Setup

Create a `.env` file in the website root:

```
REACT_APP_API_URL=http://localhost:5000/api
```

## Development

```bash
# Start development server (runs on localhost:3000)
npm start

# Run tests
npm test

# Build for production
npm run build
```

## API Integration

The website connects to the Titan Fitness backend API. Ensure the backend is running on `http://localhost:5000`.

### Required Backend Endpoints

- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile
- `POST /api/workouts` - Log workout
- `GET /api/workouts` - Get user workouts
- `POST /api/meals` - Log meal
- `GET /api/meals` - Get user meals
- `GET /api/bodyweight` - Get weight history

## Performance

- Lazy loading for pages
- Optimized images and assets
- CSS minification
- Code splitting with React Router

## Security

- JWT token storage in localStorage
- Protected routes with auth checks
- CORS enabled for API requests
- Input validation on forms

## Deployment

### Vercel

```bash
vercel deploy
```

### Netlify

```bash
netlify deploy --prod --dir=build
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Customization

### Colors
Edit `src/styles/variables.css` to change the color scheme:

```css
:root {
    --primary: #007AFF;
    --secondary: #FF9500;
    /* ... more colors ... */
}
```

### Fonts
Update font family in `src/styles/index.css`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- [ ] Advanced analytics and charts
- [ ] Meal planning features
- [ ] Social sharing
- [ ] Push notifications
- [ ] Offline support
- [ ] Dark mode
- [ ] Export data as PDF
- [ ] Mobile app sync with push notifications

## Troubleshooting

### API Connection Issues

1. Ensure backend is running on `http://localhost:5000`
2. Check CORS is enabled in backend
3. Verify `REACT_APP_API_URL` in `.env`

### Build Errors

1. Clear node_modules: `rm -rf node_modules && npm install`
2. Clear cache: `npm start -- --reset-cache`

## Support

For issues or questions, please open an issue on GitHub.

## License

MIT License
