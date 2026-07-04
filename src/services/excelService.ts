import * as XLSX from 'xlsx';

const STORAGE_KEY = 'hashan_nirasha_rsvp_data';

export interface RSVPFormData {
  name: string;
  email: string;
  phone?: string;
  attendance: string;
  dietary?: string;
  message?: string;
}

interface RSVPEntry extends RSVPFormData {
  submittedAt: string;
}

function getStoredEntries(): RSVPEntry[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveEntries(entries: RSVPEntry[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export function addRSVPEntry(data: RSVPFormData): void {
  const entries = getStoredEntries();
  entries.push({
    name: data.name,
    email: data.email,
    phone: data.phone ?? '',
    attendance: data.attendance,
    dietary: data.dietary ?? '',
    message: data.message ?? '',
    submittedAt: new Date().toISOString(),
  });
  saveEntries(entries);
}

export function downloadExcel(): void {
  const entries = getStoredEntries();

  const data = entries.map((entry, i) => ({
    '#': i + 1,
    Name: entry.name,
    Email: entry.email,
    Phone: entry.phone || '-',
    Attendance: entry.attendance,
    'Dietary Requirements': entry.dietary || '-',
    Message: entry.message || '-',
    'Submitted At': new Date(entry.submittedAt).toLocaleString(),
  }));

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'RSVP');

  ws['!cols'] = [
    { wch: 4 },
    { wch: 25 },
    { wch: 30 },
    { wch: 18 },
    { wch: 18 },
    { wch: 25 },
    { wch: 40 },
    { wch: 22 },
  ];

  XLSX.writeFile(wb, 'Hashan_Nirasha_RSVP.xlsx');
}

export function getEntryCount(): number {
  return getStoredEntries().length;
}
