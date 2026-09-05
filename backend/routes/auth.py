"""
CarbonLens — Authentication Routes
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
"""

from flask import Blueprint, request, jsonify
from models import db
from models.user import User
from services.auth_service import generate_token, token_required
from services.demo_service import create_welcome_notifications

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')


@auth_bp.route('/register', methods=['POST'])
def register():
    """Register a new user."""
    data = request.get_json()

    if not data:
        return jsonify({'error': 'Request body is required.'}), 400

    username = (data.get('username') or '').strip()
    email = (data.get('email') or '').strip().lower()
    password = data.get('password', '')
    display_name = (data.get('displayName') or username).strip()

    # Validation
    errors = []
    if not username or len(username) < 3:
        errors.append('Username must be at least 3 characters.')
    if not email or '@' not in email:
        errors.append('Please enter a valid email address.')
    if not password or len(password) < 6:
        errors.append('Password must be at least 6 characters.')
    if len(username) > 80:
        errors.append('Username must be 80 characters or fewer.')
    if len(email) > 120:
        errors.append('Email must be 120 characters or fewer.')

    if errors:
        return jsonify({'error': errors[0], 'errors': errors}), 400

    # Check for existing user
    if User.query.filter_by(username=username).first():
        return jsonify({'error': 'This username is already taken.'}), 409
    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'An account with this email already exists.'}), 409

    # Create user
    user = User(
        username=username,
        email=email,
        display_name=display_name
    )
    user.set_password(password)

    db.session.add(user)
    db.session.commit()

    # Create welcome notifications
    create_welcome_notifications(user.id)

    # Generate token
    token = generate_token(user.id)

    return jsonify({
        'message': 'Account created successfully!',
        'token': token,
        'user': user.to_dict()
    }), 201


@auth_bp.route('/login', methods=['POST'])
def login():
    """Log in an existing user."""
    data = request.get_json()

    if not data:
        return jsonify({'error': 'Request body is required.'}), 400

    username = (data.get('username') or '').strip()
    password = data.get('password', '')

    if not username or not password:
        return jsonify({'error': 'Username and password are required.'}), 400

    # Find user by username or email
    user = User.query.filter(
        (User.username == username) | (User.email == username.lower())
    ).first()

    if not user or not user.check_password(password):
        return jsonify({'error': 'Invalid username or password.'}), 401

    if not user.is_active:
        return jsonify({'error': 'Account is inactive.'}), 403

    token = generate_token(user.id)

    return jsonify({
        'message': 'Login successful!',
        'token': token,
        'user': user.to_dict()
    }), 200


@auth_bp.route('/me', methods=['GET'])
@token_required
def get_current_user(current_user):
    """Get current authenticated user info."""
    return jsonify({'user': current_user.to_dict()}), 200
