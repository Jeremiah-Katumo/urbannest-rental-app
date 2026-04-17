
import React, { useState } from 'react';
import { AuthPage, UserRole } from '../../types';
import { Home, Mail, Lock, User, Phone, ArrowLeft, Loader2 } from 'lucide-react';

interface AuthOverlayProps {
  view: AuthPage;
  onClose: () => void;
  onLogin: (email: string, role: UserRole) => void;
  onNavigate: (view: AuthPage) => void;
}

const AuthOverlay: React.FC<AuthOverlayProps> = ({ view, onLogin, onNavigate }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('TENANT');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (view === 'LOGIN' || view === 'SIGNUP') {
        onLogin(email, role);
      } else {
        alert('Password reset instructions sent!');
        onNavigate('LOGIN');
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in slide-in-from-bottom-8 duration-500">
        <div className="bg-indigo-600 p-8 text-center text-white relative">
          <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <Home className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight">
            {view === 'LOGIN' ? 'Welcome Back' : view === 'SIGNUP' ? 'Join UrbanNest' : 'Reset Password'}
          </h2>
          <p className="text-indigo-100 mt-2">
            {view === 'LOGIN' ? 'Enter your credentials to continue' : view === 'SIGNUP' ? 'Create your rental ecosystem account' : 'We will help you recover access'}
          </p>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {view === 'SIGNUP' && (
              <div className="space-y-4">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="text" placeholder="Full Name" required className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                </div>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="tel" placeholder="Phone Number" required className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                </div>
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="email" 
                placeholder="Email Address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" 
              />
            </div>

            {view !== 'RESET_PASSWORD' && (
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="password" placeholder="Password" required className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
              </div>
            )}

            {(view === 'LOGIN' || view === 'SIGNUP') && (
              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Log in as</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['TENANT', 'LANDLORD', 'AGENT', 'ADMIN'] as UserRole[]).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={`py-3 px-4 rounded-xl text-xs font-bold transition-all border-2 ${
                        role === r ? 'bg-indigo-50 border-indigo-600 text-indigo-700' : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {view === 'LOGIN' && (
              <div className="text-right">
                <button type="button" onClick={() => onNavigate('RESET_PASSWORD')} className="text-xs font-bold text-indigo-600 hover:underline">
                  Forgot password?
                </button>
              </div>
            )}

            <button
              disabled={loading}
              type="submit"
              className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-100 hover:bg-indigo-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : view === 'LOGIN' ? 'Login' : view === 'SIGNUP' ? 'Sign Up' : 'Send Instructions'}
            </button>
          </form>

          <div className="mt-8 text-center">
            {view === 'LOGIN' ? (
              <p className="text-sm text-gray-500">
                Don't have an account?{' '}
                <button onClick={() => onNavigate('SIGNUP')} className="text-indigo-600 font-bold hover:underline">Create one</button>
              </p>
            ) : (
              <button onClick={() => onNavigate('LOGIN')} className="inline-flex items-center gap-2 text-sm text-gray-500 font-bold hover:text-indigo-600 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to Login
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthOverlay;
