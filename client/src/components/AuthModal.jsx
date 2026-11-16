import React, { useState } from 'react';
import { X, Sparkles, Loader2 } from 'lucide-react';
import { loginUser, registerUser } from '../services/api';

export default function AuthModal({ isOpen, onClose, initialMode = 'login', onAuthSuccess }) {
  const [mode, setMode] = useState(initialMode); // 'login' | 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [selectedMascot, setSelectedMascot] = useState('The go-getter');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === 'login') {
        const res = await loginUser(email, password);
        if (res.success) {
          onAuthSuccess(res.user);
          onClose();
        } else {
          setError(res.message || 'Login failed');
        }
      } else {
        const res = await registerUser(name, email, password, selectedMascot);
        if (res.success) {
          onAuthSuccess(res.user);
          onClose();
        } else {
          setError(res.message || 'Registration failed');
        }
      }
    } catch (err) {
      setError(err.message || 'Authentication error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-[24px] max-w-md w-full p-6 sm:p-8 shadow-2xl border border-neutral-100 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-neutral-400 hover:text-neutral-700"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 text-primary-700 font-extrabold text-[10px] tracking-wider uppercase mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Prepify Student Portal</span>
          </div>
          <h3 className="font-extrabold text-2xl text-neutral-900">
            {mode === 'login' ? 'Sign in to Prepify' : 'Create your account'}
          </h3>
          <p className="text-xs text-neutral-600 mt-1">
            {mode === 'login' ? 'Welcome back! Ready for your next study adventure?' : 'Join thousands of students turning notes into know-how.'}
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex bg-neutral-100 p-1 rounded-xl mb-5">
          <button
            type="button"
            onClick={() => { setMode('login'); setError(null); }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              mode === 'login' ? 'bg-white text-primary-700 shadow-sm' : 'text-neutral-600'
            }`}
          >
            Log in
          </button>
          <button
            type="button"
            onClick={() => { setMode('register'); setError(null); }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              mode === 'register' ? 'bg-white text-primary-700 shadow-sm' : 'text-neutral-600'
            }`}
          >
            Create account
          </button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 border border-red-200 text-xs font-medium rounded-xl p-3 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Morgan"
                className="w-full h-11 px-3.5 rounded-xl border border-neutral-300 text-sm focus:border-primary-600 focus:outline-none"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@student.edu"
              className="w-full h-11 px-3.5 rounded-xl border border-neutral-300 text-sm focus:border-primary-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full h-11 px-3.5 rounded-xl border border-neutral-300 text-sm focus:border-primary-600 focus:outline-none"
            />
          </div>

          {mode === 'register' && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                Choose Your Study Companion
              </label>
              <select
                value={selectedMascot}
                onChange={(e) => setSelectedMascot(e.target.value)}
                className="w-full h-11 px-3 rounded-xl border border-neutral-300 text-sm focus:border-primary-600 focus:outline-none bg-white"
              >
                <option value="The go-getter">The go-getter</option>
                <option value="The curious one">The curious one</option>
                <option value="The spark">The spark</option>
                <option value="The page-turner">The page-turner</option>
                <option value="The thinker">The thinker</option>
                <option value="The explorer">The explorer</option>
                <option value="The cheer squad">The cheer squad</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer mt-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            <span>{mode === 'login' ? 'Sign in' : 'Start studying'}</span>
          </button>
        </form>

      </div>
    </div>
  );
}
