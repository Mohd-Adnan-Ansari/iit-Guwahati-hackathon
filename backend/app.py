"""
CarbonLens — Flask Application Factory
Main entry point for the backend server.
"""

import os
import sys

# Add backend directory to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from flask import Flask, jsonify
from flask_cors import CORS
from config.settings import config_by_name
from models import db


def create_app(config_name='default'):
    """Create and configure the Flask application."""
    app = Flask(__name__)
    app.config.from_object(config_by_name.get(config_name, config_by_name['default']))

    # Initialize extensions
    db.init_app(app)
    cors_origins = app.config.get('CORS_ORIGINS', '*')
    CORS(app,
         origins=cors_origins,
         supports_credentials=(cors_origins != '*'),
         allow_headers=['Content-Type', 'Authorization'],
         expose_headers=['Authorization'])

    # Register blueprints
    from routes.auth import auth_bp
    from routes.calculations import calculations_bp
    from routes.dashboard import dashboard_bp
    from routes.scenarios import scenarios_bp
    from routes.campus import campus_bp
    from routes.challenges import challenges_bp
    from routes.badges import badges_bp
    from routes.notifications import notifications_bp
    from routes.emission_factors import emission_factors_bp

    app.register_blueprint(auth_bp)
    app.register_blueprint(calculations_bp)
    app.register_blueprint(dashboard_bp)
    app.register_blueprint(scenarios_bp)
    app.register_blueprint(campus_bp)
    app.register_blueprint(challenges_bp)
    app.register_blueprint(badges_bp)
    app.register_blueprint(notifications_bp)
    app.register_blueprint(emission_factors_bp)

    # Create database tables and seed demo data
    with app.app_context():
        # Ensure database directory exists
        db_dir = app.config.get('DATABASE_DIR', os.path.join(os.path.dirname(__file__), '..', 'database'))
        os.makedirs(db_dir, exist_ok=True)

        db.create_all()

        # Seed demo data
        from services.demo_service import seed_all_demo_data
        seed_all_demo_data()

    # Health check endpoint
    @app.route('/api/health', methods=['GET'])
    def health():
        return jsonify({
            'status': 'healthy',
            'app': 'CarbonLens',
            'version': app.config.get('APP_VERSION', '1.0.0')
        }), 200

    # Global error handlers
    @app.errorhandler(400)
    def bad_request(e):
        return jsonify({'error': 'Bad request. Please check your input.'}), 400

    @app.errorhandler(404)
    def not_found(e):
        return jsonify({'error': 'Resource not found.'}), 404

    @app.errorhandler(405)
    def method_not_allowed(e):
        return jsonify({'error': 'Method not allowed.'}), 405

    @app.errorhandler(500)
    def internal_error(e):
        return jsonify({'error': 'An unexpected error occurred. Please try again.'}), 500

    return app
    
if __name__ == '__main__':
    app = create_app(os.environ.get('FLASK_ENV', 'development'))
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=app.config['DEBUG'])


