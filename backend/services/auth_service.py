"""
CarbonLens — Authentication Service
JWT token generation, validation, and password handling.
"""

import jwt
import datetime
from functools import wraps
from flask import request, jsonify, current_app
from models import db
from models.user import User


def generate_token(user_id):
    """Generate a JWT access token."""
    payload = {
        'user_id': user_id,
        'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(
            seconds=current_app.config.get('JWT_ACCESS_TOKEN_EXPIRES', 86400)
        ),
        'iat': datetime.datetime.now(datetime.timezone.utc)
    }
    return jwt.encode(
        payload,
        current_app.config['JWT_SECRET_KEY'],
        algorithm='HS256'
    )


def decode_token(token):
    """Decode and validate a JWT token."""
    try:
        payload = jwt.decode(
            token,
            current_app.config['JWT_SECRET_KEY'],
            algorithms=['HS256']
        )
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None


def token_required(f):
    """Decorator to protect routes with JWT authentication."""
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        # Get token from Authorization header
        auth_header = request.headers.get('Authorization', '')
        if auth_header.startswith('Bearer '):
            token = auth_header.split(' ')[1]

        if not token:
            return jsonify({'error': 'Authentication required. Please log in.'}), 401

        payload = decode_token(token)
        if not payload:
            return jsonify({'error': 'Invalid or expired token. Please log in again.'}), 401

        # Get current user
        current_user = db.session.get(User, payload['user_id'])
        if not current_user or not current_user.is_active:
            return jsonify({'error': 'User not found or inactive.'}), 401

        return f(current_user, *args, **kwargs)

    return decorated


def optional_auth(f):
    """Decorator that optionally identifies the user but doesn't require auth."""
    @wraps(f)
    def decorated(*args, **kwargs):
        current_user = None
        auth_header = request.headers.get('Authorization', '')
        if auth_header.startswith('Bearer '):
            token = auth_header.split(' ')[1]
            payload = decode_token(token)
            if payload:
                current_user = db.session.get(User, payload['user_id'])

        return f(current_user, *args, **kwargs)

    return decorated
