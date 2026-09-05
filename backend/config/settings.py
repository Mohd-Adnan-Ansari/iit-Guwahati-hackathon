"""
CarbonLens — Application Configuration
"""

import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    """Base configuration."""
    SECRET_KEY = os.environ.get('SECRET_KEY', 'carbonlens-dev-secret-change-in-production')
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'carbonlens-jwt-secret-change-in-production')
    JWT_ACCESS_TOKEN_EXPIRES = 86400  # 24 hours in seconds

    # Database
    BASE_DIR = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))
    DATABASE_DIR = os.path.join(os.path.dirname(BASE_DIR), 'database')
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        'DATABASE_URL',
        f'sqlite:///{os.path.join(DATABASE_DIR, "carbonlens.db")}'
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # CORS — allow all origins so Vercel frontend can reach Railway backend
    CORS_ORIGINS = os.environ.get('CORS_ORIGINS', '*')

    # App
    APP_NAME = 'CarbonLens'
    APP_VERSION = '1.0.0'
    DEBUG = os.environ.get('FLASK_DEBUG', 'True').lower() == 'true'

    # Demo
    DEMO_MODE_ENABLED = True


class DevelopmentConfig(Config):
    """Development configuration."""
    DEBUG = True


class ProductionConfig(Config):
    """Production configuration."""
    DEBUG = False


config_by_name = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}
