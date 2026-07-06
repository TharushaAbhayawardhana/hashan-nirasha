import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth, isAdminEmail, loginWithGoogle, logout } from '../lib/firebase';
import { downloadExcel, getEntryCount } from '../services/excelService';
import { Heart, Download, LogOut, ShieldAlert, Loader2 } from 'lucide-react';

export function Admin() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthorized(isAdminEmail(u?.email ?? null));
      setLoading(false);
    });
    return unsub;
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#2F2430] flex items-center justify-center">
        <Loader2 size={32} className="text-[#E9A5B3] animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#2F2430] flex items-center justify-center p-4">
        <div className="bg-white/90 backdrop-blur-xl rounded-[32px] p-10 sm:p-14 max-w-md w-full text-center shadow-[0_30px_80px_rgba(0,0,0,0.3)]">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#E9A5B3] to-[#D9A06F] flex items-center justify-center mx-auto mb-6 shadow-[0_8px_30px_rgba(233,165,179,0.4)]">
            <ShieldAlert size={32} className="text-white" />
          </div>
          <h1 className="font-playfair text-3xl text-[#2F2430] font-semibold mb-2">Admin Access</h1>
          <p className="font-cormorant text-lg text-[#72646A] italic mb-8">
            Sign in with your Google account to manage RSVP data
          </p>
          <button
            onClick={loginWithGoogle}
            className="w-full h-14 bg-gradient-to-r from-[#E9A5B3] to-[#D9A06F] text-white font-inter text-sm tracking-widest uppercase rounded-full shadow-[0_8px_30px_rgba(233,165,179,0.35)] hover:shadow-[0_12px_45px_rgba(233,165,179,0.5)] transition-all duration-300 flex items-center justify-center gap-3"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  if (!authorized) {
    return (
      <div className="min-h-screen bg-[#2F2430] flex items-center justify-center p-4">
        <div className="bg-white/90 backdrop-blur-xl rounded-[32px] p-10 sm:p-14 max-w-md w-full text-center shadow-[0_30px_80px_rgba(0,0,0,0.3)]">
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
            <ShieldAlert size={32} className="text-red-500" />
          </div>
          <h1 className="font-playfair text-3xl text-[#2F2430] font-semibold mb-2">Access Denied</h1>
          <p className="font-cormorant text-lg text-[#72646A] italic mb-2">
            {user.email} is not authorized.
          </p>
          <p className="font-inter text-sm text-[#72646A] mb-8">
            Only invited admins can access this page.
          </p>
          <button
            onClick={() => logout().then(() => navigate('/'))}
            className="w-full h-14 bg-gradient-to-r from-[#E9A5B3] to-[#D9A06F] text-white font-inter text-sm tracking-widest uppercase rounded-full shadow-[0_8px_30px_rgba(233,165,179,0.35)] hover:shadow-[0_12px_45px_rgba(233,165,179,0.5)] transition-all duration-300 flex items-center justify-center gap-3"
          >
            <LogOut size={16} />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#2F2430] flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-xl rounded-[32px] p-10 sm:p-14 max-w-lg w-full text-center shadow-[0_30px_80px_rgba(0,0,0,0.3)]">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#E9A5B3] to-[#D9A06F] flex items-center justify-center mx-auto mb-6 shadow-[0_8px_30px_rgba(233,165,179,0.4)]">
          <Heart size={32} className="text-white fill-white" />
        </div>
        <h1 className="font-playfair text-3xl text-[#2F2430] font-semibold mb-1">Admin Dashboard</h1>
        <p className="font-inter text-sm text-[#72646A] mb-1">{user.email}</p>
        <p className="font-cormorant text-lg text-[#72646A] italic mb-8">
          {getEntryCount()} RSVP {getEntryCount() === 1 ? 'response' : 'responses'} recorded
        </p>

        <button
          onClick={downloadExcel}
          className="w-full h-14 bg-gradient-to-r from-[#E9A5B3] to-[#D9A06F] text-white font-inter text-sm tracking-widest uppercase rounded-full shadow-[0_8px_30px_rgba(233,165,179,0.35)] hover:shadow-[0_12px_45px_rgba(233,165,179,0.5)] transition-all duration-300 flex items-center justify-center gap-3 mb-4"
        >
          <Download size={16} />
          Download RSVP Excel
        </button>

        <button
          onClick={() => logout().then(() => navigate('/'))}
          className="w-full h-12 border border-[#E9A5B3]/30 text-[#72646A] font-inter text-sm tracking-widest uppercase rounded-full hover:bg-[#E9A5B3]/10 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <LogOut size={14} />
          Sign Out
        </button>
      </div>
    </div>
  );
}
