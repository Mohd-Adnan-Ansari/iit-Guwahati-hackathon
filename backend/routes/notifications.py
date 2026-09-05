"""
CarbonLens — Notification Routes
GET  /api/notifications       — Get user notifications
POST /api/notifications/:id/read — Mark as read
"""

from flask import Blueprint, jsonify
from models import db
from models.notification import Notification
from services.auth_service import token_required

notifications_bp = Blueprint('notifications', __name__, url_prefix='/api/notifications')


@notifications_bp.route('', methods=['GET'])
@token_required
def get_notifications(current_user):
    """Get all notifications for the current user."""
    notifications = Notification.query \
        .filter_by(user_id=current_user.id) \
        .order_by(Notification.created_at.desc()) \
        .limit(50) \
        .all()

    unread_count = Notification.query \
        .filter_by(user_id=current_user.id, is_read=False) \
        .count()

    return jsonify({
        'notifications': [n.to_dict() for n in notifications],
        'unreadCount': unread_count
    }), 200


@notifications_bp.route('/<int:notification_id>/read', methods=['POST'])
@token_required
def mark_read(current_user, notification_id):
    """Mark a notification as read."""
    notif = Notification.query.filter_by(
        id=notification_id,
        user_id=current_user.id
    ).first()

    if not notif:
        return jsonify({'error': 'Notification not found.'}), 404

    notif.is_read = True
    db.session.commit()

    return jsonify({'message': 'Marked as read.'}), 200


@notifications_bp.route('/read-all', methods=['POST'])
@token_required
def mark_all_read(current_user):
    """Mark all notifications as read."""
    Notification.query \
        .filter_by(user_id=current_user.id, is_read=False) \
        .update({'is_read': True})
    db.session.commit()

    return jsonify({'message': 'All notifications marked as read.'}), 200
