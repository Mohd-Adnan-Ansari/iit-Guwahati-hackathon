import { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../hooks/useAuth';
import { Bell, X, CheckCheck } from 'lucide-react';

export default function NotificationPanel({ onClose }) {
  const { isAuthenticated } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      api.get('/notifications')
        .then((res) => setNotifications(res.data.notifications || []))
        .catch(() => {})
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const markRead = async (id) => {
    try {
      await api.post(`/notifications/${id}/read`);
      setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
    } catch {}
  };

  const markAllRead = async () => {
    try {
      await api.post('/notifications/read-all');
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch {}
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden text-slate-800">
      <div className="flex items-center justify-between p-3.5 border-b border-slate-100 bg-slate-50/80">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <Bell className="w-4 h-4 text-emerald-600" />
          Notifications
        </h3>
        <div className="flex items-center gap-1">
          <button
            onClick={markAllRead}
            className="p-1 text-slate-400 hover:text-emerald-600 transition-colors"
            title="Mark all as read"
          >
            <CheckCheck className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
        {loading ? (
          <div className="p-4 text-center text-slate-400 text-xs">Loading...</div>
        ) : notifications.length === 0 ? (
          <div className="p-6 text-center text-slate-400 text-xs">No notifications yet</div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-3.5 hover:bg-slate-50 transition-colors cursor-pointer text-left ${
                !notif.isRead ? 'bg-emerald-50/40' : ''
              }`}
              onClick={() => markRead(notif.id)}
            >
              <div className="flex items-start gap-2.5">
                {!notif.isRead && (
                  <span className="w-2 h-2 mt-1.5 bg-emerald-500 rounded-full flex-shrink-0"></span>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-900">{notif.title}</p>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{notif.message}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
