import { useEffect, useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth, isAdminEmail, loginWithGoogle, logout } from '../lib/firebase';
import { subscribeParticipants, type Participant } from '../services/participantService';
import {
  LogOut, ShieldAlert, Loader2, Search, Download, ChevronLeft, ChevronRight,
  Users, CheckCircle, Clock, XCircle, ArrowUpDown, ArrowUp, ArrowDown, ExternalLink, FileText,
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from 'recharts';

type SortField = 'name' | 'email' | 'attendance' | 'side' | 'hasInvitationCard' | 'familyParticipants' | 'submittedAt';
type SortDir = 'asc' | 'desc';
type AttendanceFilter = 'all' | 'yes' | 'no' | 'maybe';

const PAGE_SIZE = 10;

const PIE_COLORS = ['#5B8C5A', '#D9A06F', '#C8748A'];
const SIDE_COLORS = ['#6B5B95', '#E9A5B3'];

// Paste your published Google Sheet URL here to show the "Open Sheets" button.
// Create a sheet → Publish to web (File > Share > Publish to web) → Copy link.
const ADMIN_GOOGLE_SHEET_URL = '';

function formatDate(ts: unknown): string {
  if (!ts) return '-';
  const d = (ts as { toDate?: () => Date }).toDate?.();
  if (!d) return '-';
  return d.toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

function StatCard({ icon, label, value, color }: {
  icon: React.ReactNode; label: string; value: number; color: string;
}) {
  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-4 sm:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-[#E9A5B3]/10 flex items-center gap-3 sm:gap-4">
      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0`} style={{ background: `${color}18` }}>
        <div style={{ color }}>{icon}</div>
      </div>
      <div className="min-w-0">
        <p className="font-inter text-[11px] sm:text-xs tracking-[0.1em] uppercase text-[#72646A] truncate">{label}</p>
        <p className="font-playfair text-xl sm:text-2xl text-[#2F2430] font-semibold tabular-nums">{value.toLocaleString()}</p>
      </div>
    </div>
  );
}

function SortTh({ field, label, sortField, sortDir, onSort }: {
  field: SortField; label: string;
  sortField: SortField; sortDir: SortDir; onSort: (f: SortField) => void;
}) {
  const active = sortField === field;
  return (
    <th
      className="font-inter text-[11px] tracking-[0.1em] uppercase text-[#72646A] py-3 px-3 text-left cursor-pointer select-none hover:text-[#2F2430] transition-colors whitespace-nowrap"
      onClick={() => onSort(field)}
    >
      <span className="inline-flex items-center gap-1">
        {label}
        {active ? (
          sortDir === 'asc' ? <ArrowUp size={12} /> : <ArrowDown size={12} />
        ) : (
          <ArrowUpDown size={12} className="opacity-30" />
        )}
      </span>
    </th>
  );
}

export function Admin() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const navigate = useNavigate();

  const [participants, setParticipants] = useState<Participant[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [dataError, setDataError] = useState<string | null>(null);

  const [search, setSearch] = useState('');
  const [filterAttendance, setFilterAttendance] = useState<AttendanceFilter>('all');
  const [sortField, setSortField] = useState<SortField>('submittedAt');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [page, setPage] = useState(0);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthorized(isAdminEmail(u?.email ?? null));
      setLoading(false);
    });
    return unsub;
  }, []);

  useEffect(() => {
    if (!authorized) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDataLoading(true);
    const unsub = subscribeParticipants(
      (list) => {
        setParticipants(list);
        setDataLoading(false);
        setDataError(null);
      },
      (err) => {
        setDataError(err.message);
        setDataLoading(false);
      },
    );
    return unsub;
  }, [authorized]);

  const handleSort = useCallback((field: SortField) => {
    setSortField((prev) => {
      if (prev === field) {
        setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
        return prev;
      }
      setSortDir('asc');
      return field;
    });
  }, []);

  const stats = useMemo(() => {
    const total = participants.length;
    const confirmed = participants.filter((p) => p.attendance === 'yes').length;
    const pending = participants.filter((p) => p.attendance === 'maybe').length;
    const declined = participants.filter((p) => p.attendance === 'no').length;
    const groomSide = participants.filter((p) => p.side === 'groom').length;
    const brideSide = participants.filter((p) => p.side === 'bride').length;
    const totalFamily = participants.reduce((sum, p) => sum + (p.familyParticipants ?? 1), 0);
    const invitationCards = participants.filter((p) => p.hasInvitationCard).length;
    return { total, confirmed, pending, declined, groomSide, brideSide, totalFamily, invitationCards };
  }, [participants]);

  const processed = useMemo(() => {
    let list = [...participants];

    if (filterAttendance !== 'all') {
      list = list.filter((p) => p.attendance === filterAttendance);
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.email ?? '').toLowerCase().includes(q) ||
          p.side.toLowerCase().includes(q) ||
          (p.hasInvitationCard ? 'yes' : 'no').includes(q),
      );
    }

    list.sort((a, b) => {
      let cmp = 0;
      switch (sortField) {
        case 'name':
          cmp = a.name.localeCompare(b.name);
          break;
        case 'email':
          cmp = (a.email ?? '').localeCompare(b.email ?? '');
          break;
        case 'attendance':
          cmp = a.attendance.localeCompare(b.attendance);
          break;
        case 'side':
          cmp = a.side.localeCompare(b.side);
          break;
        case 'hasInvitationCard':
          cmp = Number(a.hasInvitationCard) - Number(b.hasInvitationCard);
          break;
        case 'familyParticipants':
          cmp = (a.familyParticipants ?? 1) - (b.familyParticipants ?? 1);
          break;
        case 'submittedAt': {
          const at = (a.submittedAt as unknown as { seconds?: number })?.seconds ?? 0;
          const bt = (b.submittedAt as unknown as { seconds?: number })?.seconds ?? 0;
          cmp = at - bt;
          break;
        }
      }
      return sortDir === 'asc' ? cmp : -cmp;
    });

    return list;
  }, [participants, search, filterAttendance, sortField, sortDir]);

  const totalPages = Math.max(1, Math.ceil(processed.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages - 1);
  const paginated = processed.slice(safePage * PAGE_SIZE, (safePage + 1) * PAGE_SIZE);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setPage(0); }, [search, filterAttendance]);

  const chartData = useMemo(() => [
    { name: 'Confirmed', value: stats.confirmed, fill: '#5B8C5A' },
    { name: 'Pending', value: stats.pending, fill: '#D9A06F' },
    { name: 'Declined', value: stats.declined, fill: '#C8748A' },
  ].filter((d) => d.value > 0), [stats]);

  const barData = useMemo(() => [
    { label: 'Confirmed', count: stats.confirmed, fill: '#5B8C5A' },
    { label: 'Pending', count: stats.pending, fill: '#D9A06F' },
    { label: 'Declined', count: stats.declined, fill: '#C8748A' },
  ], [stats]);

  const sideData = useMemo(() => [
    { name: "Groom's Side", value: stats.groomSide, fill: '#6B5B95' },
    { name: "Bride's Side", value: stats.brideSide, fill: '#E9A5B3' },
  ].filter((d) => d.value > 0), [stats]);

  const sideBarData = useMemo(() => [
    { label: "Groom's Side", count: stats.groomSide, fill: '#6B5B95' },
    { label: "Bride's Side", count: stats.brideSide, fill: '#E9A5B3' },
  ], [stats]);

  const exportCSV = useCallback(() => {
    const headers = ['Name', 'Email', 'Phone', 'Attendance', 'Side', 'Family Participants', 'Invitation Card', 'Dietary', 'Message', 'Submitted At'];
    const rows = participants.map((p) => [
      p.name,
      p.email || '-',
      p.phone || '-',
      p.attendance,
      p.side === 'groom' ? "Groom's Side" : p.side === 'bride' ? "Bride's Side" : p.side,
      String(p.familyParticipants ?? 1),
      p.hasInvitationCard ? 'Yes' : 'No',
      p.dietary || '-',
      p.message || '-',
      formatDate(p.submittedAt),
    ]);
    const csv = [headers.join(','), ...rows.map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Hashan_Nirasha_RSVP_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [participants]);

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
    <div className="min-h-screen bg-[#2F2430]">
      <div className="bg-white/90 backdrop-blur-xl border-b border-[#E9A5B3]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E9A5B3] to-[#D9A06F] flex items-center justify-center shadow-[0_4px_15px_rgba(233,165,179,0.3)]">
              <Users size={18} className="text-white" />
            </div>
            <div>
              <h1 className="font-playfair text-xl text-[#2F2430] font-semibold">Admin Dashboard</h1>
              <p className="font-inter text-[11px] text-[#72646A]">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            {ADMIN_GOOGLE_SHEET_URL && (
              <a
                href={ADMIN_GOOGLE_SHEET_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 px-4 bg-gradient-to-r from-[#34A853] to-[#2D9248] text-white font-inter text-xs tracking-widest uppercase rounded-full hover:shadow-[0_8px_25px_rgba(52,168,83,0.35)] transition-all duration-300 flex items-center gap-2"
              >
                <ExternalLink size={14} />
                <span className="hidden sm:inline">Sheets</span>
              </a>
            )}
            <button
              onClick={exportCSV}
              className="h-10 px-4 bg-gradient-to-r from-[#5B8C5A] to-[#4A7A49] text-white font-inter text-xs tracking-widest uppercase rounded-full hover:shadow-[0_8px_25px_rgba(91,140,90,0.35)] transition-all duration-300 flex items-center gap-2"
            >
              <Download size={14} />
              <span className="hidden sm:inline">Export CSV</span>
            </button>
            <button
              onClick={() => logout().then(() => navigate('/'))}
              className="h-10 px-4 border border-[#E9A5B3]/30 text-[#72646A] font-inter text-xs tracking-widest uppercase rounded-full hover:bg-[#E9A5B3]/10 transition-all duration-300 flex items-center gap-2"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          <StatCard icon={<Users size={18} />} label="Total Submissions" value={stats.total} color="#2F2430" />
          <StatCard icon={<CheckCircle size={18} />} label="Confirmed" value={stats.confirmed} color="#5B8C5A" />
          <StatCard icon={<Clock size={18} />} label="Pending" value={stats.pending} color="#D9A06F" />
          <StatCard icon={<XCircle size={18} />} label="Declined" value={stats.declined} color="#C8748A" />
          <StatCard icon={<Users size={18} />} label="Groom's Side" value={stats.groomSide} color="#6B5B95" />
          <StatCard icon={<Users size={18} />} label="Bride's Side" value={stats.brideSide} color="#E9A5B3" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <StatCard icon={<Users size={18} />} label="Total Family Participants" value={stats.totalFamily} color="#2F2430" />
          <StatCard icon={<FileText size={18} />} label="Invitation Cards Issued" value={stats.invitationCards} color="#E9A5B3" />
        </div>

        {chartData.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-4 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-[#E9A5B3]/10">
              <h3 className="font-playfair text-lg text-[#2F2430] font-semibold mb-4">Attendance Breakdown</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={barData}>
                  <XAxis dataKey="label" tick={{ fill: '#72646A', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis allowDecimals={false} tick={{ fill: '#72646A', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ borderRadius: 12, border: '1px solid rgba(233,165,179,0.2)', fontSize: 13 }}
                  />
                  <Bar dataKey="count" radius={[8, 8, 0, 0]} maxBarSize={60}>
                    {barData.map((entry, idx) => (
                      <Cell key={idx} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-4 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-[#E9A5B3]/10">
              <h3 className="font-playfair text-lg text-[#2F2430] font-semibold mb-4">Status Distribution</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    innerRadius={50}
                    paddingAngle={4}
                  >
                    {chartData.map((_, idx) => (
                      <Cell key={idx} fill={PIE_COLORS[idx % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ borderRadius: 12, border: '1px solid rgba(233,165,179,0.2)', fontSize: 13 }}
                  />
                  <Legend
                    formatter={(value: string) => <span style={{ color: '#72646A', fontSize: 13 }}>{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {sideData.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-4 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-[#E9A5B3]/10">
              <h3 className="font-playfair text-lg text-[#2F2430] font-semibold mb-4">Side Breakdown</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={sideBarData}>
                  <XAxis dataKey="label" tick={{ fill: '#72646A', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis allowDecimals={false} tick={{ fill: '#72646A', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ borderRadius: 12, border: '1px solid rgba(233,165,179,0.2)', fontSize: 13 }}
                  />
                  <Bar dataKey="count" radius={[8, 8, 0, 0]} maxBarSize={60}>
                    {sideBarData.map((entry, idx) => (
                      <Cell key={idx} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-4 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-[#E9A5B3]/10">
              <h3 className="font-playfair text-lg text-[#2F2430] font-semibold mb-4">Side Distribution</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={sideData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    innerRadius={50}
                    paddingAngle={4}
                  >
                    {sideData.map((_, idx) => (
                      <Cell key={idx} fill={SIDE_COLORS[idx % SIDE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ borderRadius: 12, border: '1px solid rgba(233,165,179,0.2)', fontSize: 13 }}
                  />
                  <Legend
                    formatter={(value: string) => <span style={{ color: '#72646A', fontSize: 13 }}>{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {dataError && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
            <p className="font-inter text-sm text-red-600 mb-2">Failed to load participant data</p>
            <p className="font-inter text-xs text-red-400">{dataError}</p>
          </div>
        )}

        {!dataError && (
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-[#E9A5B3]/10 overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-[#E9A5B3]/10">
              <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#72646A]" />
                  <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full h-10 pl-10 pr-4 bg-white/70 border border-[#E9A5B3]/20 rounded-xl font-inter text-sm text-[#2F2430] placeholder:text-[#72646A]/40 focus:outline-none focus:border-[#E9A5B3] focus:ring-4 focus:ring-[#E9A5B3]/10 transition-all"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="font-inter text-[11px] tracking-[0.1em] uppercase text-[#72646A]">Status:</label>
                  <select
                    value={filterAttendance}
                    onChange={(e) => setFilterAttendance(e.target.value as AttendanceFilter)}
                    className="h-10 px-3 bg-white/70 border border-[#E9A5B3]/20 rounded-xl font-inter text-sm text-[#2F2430] focus:outline-none focus:border-[#E9A5B3] focus:ring-4 focus:ring-[#E9A5B3]/10 transition-all"
                  >
                    <option value="all">All</option>
                    <option value="yes">Confirmed</option>
                    <option value="maybe">Pending</option>
                    <option value="no">Declined</option>
                  </select>
                </div>
              </div>
            </div>

            {dataLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 size={28} className="text-[#E9A5B3] animate-spin" />
              </div>
            ) : processed.length === 0 ? (
              <div className="text-center py-16">
                <Users size={40} className="mx-auto text-[#E9A5B3]/30 mb-3" />
                <p className="font-playfair text-xl text-[#72646A]">
                  {participants.length === 0 ? 'No RSVP submissions yet' : 'No results match your search'}
                </p>
                <p className="font-inter text-sm text-[#72646A]/60 mt-1">
                  {participants.length === 0 ? 'Share the wedding link to start collecting RSVPs' : 'Try adjusting your search or filters'}
                </p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#E9A5B3]/10">
                        <th className="font-inter text-[11px] tracking-[0.1em] uppercase text-[#72646A] py-3 px-3 text-left whitespace-nowrap">#</th>
                        <SortTh field="name" label="Name" sortField={sortField} sortDir={sortDir} onSort={handleSort} />
                        <th className="font-inter text-[11px] tracking-[0.1em] uppercase text-[#72646A] py-3 px-3 text-left whitespace-nowrap hidden md:table-cell">Email</th>
                        <th className="font-inter text-[11px] tracking-[0.1em] uppercase text-[#72646A] py-3 px-3 text-left whitespace-nowrap hidden md:table-cell">Phone</th>
                        <SortTh field="attendance" label="Attendance" sortField={sortField} sortDir={sortDir} onSort={handleSort} />
                        <SortTh field="side" label="Side" sortField={sortField} sortDir={sortDir} onSort={handleSort} />
                        <SortTh field="familyParticipants" label="Family" sortField={sortField} sortDir={sortDir} onSort={handleSort} />
                        <SortTh field="hasInvitationCard" label="Invitation Card" sortField={sortField} sortDir={sortDir} onSort={handleSort} />
                        <th className="font-inter text-[11px] tracking-[0.1em] uppercase text-[#72646A] py-3 px-3 text-left whitespace-nowrap hidden lg:table-cell">Dietary</th>
                        <th className="font-inter text-[11px] tracking-[0.1em] uppercase text-[#72646A] py-3 px-3 text-left whitespace-nowrap hidden lg:table-cell">Message</th>
                        <SortTh field="submittedAt" label="Date" sortField={sortField} sortDir={sortDir} onSort={handleSort} />
                      </tr>
                    </thead>
                    <tbody>
                      {paginated.map((p, idx) => (
                        <tr key={p.id} className="border-b border-[#E9A5B3]/5 hover:bg-[#E9A5B3]/[0.03] transition-colors">
                          <td className="py-3 px-3 font-inter text-sm text-[#72646A] whitespace-nowrap">{safePage * PAGE_SIZE + idx + 1}</td>
                          <td className="py-3 px-3 font-inter text-sm text-[#2F2430] font-medium whitespace-nowrap">{p.name}</td>
                          <td className="py-3 px-3 font-inter text-sm text-[#72646A] whitespace-nowrap hidden md:table-cell">{p.email || '-'}</td>
                          <td className="py-3 px-3 font-inter text-sm text-[#72646A] whitespace-nowrap hidden md:table-cell">{p.phone || '-'}</td>
                          <td className="py-3 px-3 whitespace-nowrap">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-inter text-[11px] font-medium ${
                              p.attendance === 'yes' ? 'bg-[#5B8C5A]/10 text-[#5B8C5A]' :
                              p.attendance === 'maybe' ? 'bg-[#D9A06F]/10 text-[#D9A06F]' :
                              'bg-[#C8748A]/10 text-[#C8748A]'
                            }`}>
                              {p.attendance === 'yes' ? 'Confirmed' : p.attendance === 'maybe' ? 'Pending' : 'Declined'}
                            </span>
                          </td>
                          <td className="py-3 px-3 whitespace-nowrap">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-inter text-[11px] font-medium ${
                              p.side === 'groom' ? 'bg-[#6B5B95]/10 text-[#6B5B95]' :
                              p.side === 'bride' ? 'bg-[#E9A5B3]/20 text-[#C8748A]' :
                              'bg-[#72646A]/10 text-[#72646A]'
                            }`}>
                              {p.side === 'groom' ? "Groom's" : p.side === 'bride' ? "Bride's" : p.side || '-'}
                            </span>
                          </td>
                          <td className="py-3 px-3 font-inter text-sm text-[#2F2430] font-semibold tabular-nums whitespace-nowrap">{p.familyParticipants ?? 1}</td>
                          <td className="py-3 px-3 whitespace-nowrap">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-inter text-[11px] font-medium ${
                              p.hasInvitationCard ? 'bg-[#E9A5B3]/20 text-[#C8748A]' : 'bg-[#72646A]/10 text-[#72646A]'
                            }`}>
                              {p.hasInvitationCard ? 'Yes' : 'No'}
                            </span>
                          </td>
                          <td className="py-3 px-3 font-inter text-sm text-[#72646A] max-w-[160px] truncate hidden lg:table-cell">{p.dietary || '-'}</td>
                          <td className="py-3 px-3 font-inter text-sm text-[#72646A] max-w-[200px] truncate hidden lg:table-cell">{p.message || '-'}</td>
                          <td className="py-3 px-3 font-inter text-sm text-[#72646A] whitespace-nowrap">{formatDate(p.submittedAt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-t border-[#E9A5B3]/10">
                  <p className="font-inter text-xs text-[#72646A]">
                    Showing {safePage * PAGE_SIZE + 1}–{Math.min((safePage + 1) * PAGE_SIZE, processed.length)} of {processed.length}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPage((p) => Math.max(0, p - 1))}
                      disabled={safePage === 0}
                      className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#E9A5B3]/20 text-[#72646A] hover:bg-[#E9A5B3]/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i}
                        onClick={() => setPage(i)}
                        className={`w-8 h-8 rounded-lg font-inter text-xs font-medium transition-all ${
                          i === safePage
                            ? 'bg-gradient-to-r from-[#E9A5B3] to-[#D9A06F] text-white shadow-[0_4px_15px_rgba(233,165,179,0.3)]'
                            : 'border border-[#E9A5B3]/20 text-[#72646A] hover:bg-[#E9A5B3]/10'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                      disabled={safePage >= totalPages - 1}
                      className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#E9A5B3]/20 text-[#72646A] hover:bg-[#E9A5B3]/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
