import React from 'react';
import '../styles/LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Your Personal Fitness Tracker</h1>
            <p>Track every workout, log your nutrition, monitor your progress, and achieve your fitness goals with Titan Fitness.</p>
            <div className="hero-buttons">
              <a href="/register" className="btn btn-primary">Get Started Free</a>
              <a href="/features" className="btn btn-outline">Learn More</a>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-placeholder">💪</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Powerful Features</h2>
          <p className="section-subtitle">Everything you need to track and improve your fitness</p>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🏋️</div>
              <h3>Workout Tracking</h3>
              <p>Log your exercises with sets, reps, weight, and duration. Track muscle groups and personal records.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🍽️</div>
              <h3>Nutrition Tracking</h3>
              <p>Log meals and track macros including protein, carbs, fats, and fiber. Monitor daily calorie intake.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Progress Analytics</h3>
              <p>Visualize your progress with detailed charts and analytics. Track weight changes and workout volume.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Goal Setting</h3>
              <p>Set fitness goals and track your progress towards them. Monitor your journey with visual indicators.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Multi-Platform</h3>
              <p>Access Titan Fitness on web, iOS, and Android. Sync your data across all devices seamlessly.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🎮</div>
              <h3>Gamification</h3>
              <p>Unlock achievements, earn badges, and track your streaks. Stay motivated with rewards and milestones.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">Get started in three simple steps</p>
          
          <div className="steps-grid">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Create Account</h3>
              <p>Sign up with your email and basic fitness information</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Log Your Activity</h3>
              <p>Track your workouts and meals throughout your day</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Monitor Progress</h3>
              <p>View detailed analytics and adjust your fitness plan</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <h2 className="section-title">What Our Users Say</h2>
          <p className="section-subtitle">Join thousands of fitness enthusiasts</p>
          
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p>"Titan Fitness has completely transformed my fitness journey. The tracking features are intuitive and the progress analytics keep me motivated!"</p>
              <div className="testimonial-author">
                <span className="author-name">Sarah Johnson</span>
                <span className="author-role">Fitness Enthusiast</span>
              </div>
            </div>
            <div className="testimonial-card">
              <p>"I love how easy it is to log workouts and track my nutrition. The mobile app is fantastic for on-the-go tracking."</p>
              <div className="testimonial-author">
                <span className="author-name">Mike Chen</span>
                <span className="author-role">Gym Trainer</span>
              </div>
            </div>
            <div className="testimonial-card">
              <p>"The progress dashboard gives me clear insights into my fitness metrics. Highly recommended for anyone serious about their health!"</p>
              <div className="testimonial-author">
                <span className="author-name">Emily Davis</span>
                <span className="author-role">Health Coach</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <h2>Ready to Transform Your Fitness?</h2>
          <p>Join thousands of users tracking their fitness journey with Titan Fitness</p>
          <a href="/register" className="btn btn-primary">Start Your Free Trial</a>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
