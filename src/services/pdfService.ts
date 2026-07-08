import { jsPDF } from 'jspdf';
import { COUPLE, WEDDING_DATE, VENUE } from '../data/weddingData';

const ROSE = [233, 165, 179] as const;
const ROSE_DEEP = [201, 116, 138] as const;
const DARK = [47, 36, 48] as const;
const MUTED = [114, 100, 106] as const;
const IVORY = [248, 244, 238] as const;

function setOpacity(doc: jsPDF, value: number): void {
  doc.setGState(doc.GState({ opacity: value }));
}

function drawDivider(doc: jsPDF, y: number): void {
  const pw = doc.internal.pageSize.getWidth();
  const cx = pw / 2;
  const w = 50;
  doc.setDrawColor(...ROSE);
  setOpacity(doc, 0.5);
  doc.setLineWidth(0.3);
  doc.line(cx - w, y, cx - 4, y);
  doc.line(cx + 4, y, cx + w, y);
  doc.setFillColor(...ROSE);
  doc.circle(cx, y, 1.5, 'F');
  setOpacity(doc, 1);
}

function drawCornerOrnaments(doc: jsPDF): void {
  const pw = doc.internal.pageSize.getWidth();
  const ph = doc.internal.pageSize.getHeight();
  const m = 24;
  setOpacity(doc, 0.12);
  doc.setFillColor(...ROSE);
  const positions = [
    [m + 8, m + 8], [pw - m - 8, m + 8],
    [m + 8, ph - m - 8], [pw - m - 8, ph - m - 8],
  ];
  for (const [x, y] of positions) {
    for (let i = 0; i < 3; i++) {
      doc.circle(x + i * 4, y, 2, 'F');
    }
  }
  setOpacity(doc, 1);
}

function drawBorders(doc: jsPDF): void {
  const pw = doc.internal.pageSize.getWidth();
  const ph = doc.internal.pageSize.getHeight();
  const m = 20;
  doc.setDrawColor(...ROSE);
  doc.setLineWidth(0.6);
  doc.rect(m, m, pw - 2 * m, ph - 2 * m);
  setOpacity(doc, 0.35);
  doc.setLineWidth(0.3);
  doc.rect(m + 4, m + 4, pw - 2 * m - 8, ph - 2 * m - 8);
  setOpacity(doc, 1);
}

function getForLine(hasInvitationCard: boolean, familyParticipants: number): string {
  if (!hasInvitationCard) return 'For You';
  if (familyParticipants >= 3) return 'For Your Family';
  if (familyParticipants === 2) return 'For Both of You';
  return 'For You';
}

function formatDate(date: Date): { dayName: string; fullDate: string } {
  const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
  const fullDate = date.toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
  return { dayName, fullDate };
}

export function generateInvitationPDF(data: {
  name: string;
  hasInvitationCard: boolean;
  familyParticipants: number;
}): void {
  const doc = new jsPDF('p', 'mm', 'a4');
  const pw = doc.internal.pageSize.getWidth();

  doc.setFillColor(...IVORY);
  doc.rect(0, 0, pw, doc.internal.pageSize.getHeight(), 'F');

  drawBorders(doc);
  drawCornerOrnaments(doc);

  const { dayName, fullDate } = formatDate(WEDDING_DATE);

  doc.setFont('times', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(...ROSE_DEEP);
  doc.text('WEDDING INVITATION', pw / 2, 48, { align: 'center' });

  drawDivider(doc, 55);

  doc.setFont('times', 'bold');
  doc.setFontSize(34);
  doc.setTextColor(...DARK);
  doc.text(COUPLE.groom, pw / 2, 85, { align: 'center' });
  doc.setFontSize(28);
  doc.setTextColor(...ROSE_DEEP);
  doc.setFont('times', 'italic');
  doc.text('&', pw / 2, 98, { align: 'center' });
  doc.setFont('times', 'bold');
  doc.setFontSize(34);
  doc.setTextColor(...DARK);
  doc.text(COUPLE.bride, pw / 2, 115, { align: 'center' });

  drawDivider(doc, 125);

  doc.setFont('times', 'italic');
  doc.setFontSize(11);
  doc.setTextColor(...MUTED);
  const inviteLines = [
    'Together with our families, we warmly invite you',
    'to celebrate the wedding of',
    `${COUPLE.groom} & ${COUPLE.bride}.`,
    '',
    'Your presence will make our special day',
    'even more meaningful, and we would be honoured',
    'to celebrate this joyful occasion with you.',
  ];
  let ty = 142;
  for (const line of inviteLines) {
    doc.text(line, pw / 2, ty, { align: 'center' });
    ty += line ? 5.5 : 3;
  }

  drawDivider(doc, ty + 6);

  ty += 16;
  doc.setFont('times', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...ROSE_DEEP);
  doc.text(dayName.toUpperCase() + ', ' + fullDate.toUpperCase(), pw / 2, ty, { align: 'center' });

  ty += 9;
  doc.setFont('times', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(...MUTED);
  doc.text(`Ceremony at ${VENUE.ceremony.time}`, pw / 2, ty, { align: 'center' });

  ty += 6;
  doc.text(`Reception to follow at ${VENUE.reception.time}`, pw / 2, ty, { align: 'center' });

  ty += 9;
  doc.setFont('times', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...DARK);
  doc.text(VENUE.name, pw / 2, ty, { align: 'center' });

  ty += 6;
  doc.setFont('times', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(...MUTED);
  doc.text(VENUE.address, pw / 2, ty, { align: 'center' });

  drawDivider(doc, ty + 10);

  const forLine = getForLine(data.hasInvitationCard, data.familyParticipants);

  ty += 22;
  doc.setFont('times', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(...DARK);
  doc.text(data.name, pw / 2, ty, { align: 'center' });

  ty += 8;
  doc.setFont('times', 'italic');
  doc.setFontSize(11);
  doc.setTextColor(...ROSE_DEEP);
  doc.text(forLine, pw / 2, ty, { align: 'center' });

  drawDivider(doc, ty + 10);

  ty += 20;
  doc.setFont('times', 'italic');
  doc.setFontSize(10);
  doc.setTextColor(...MUTED);
  const closingLines = [
    'We sincerely look forward to celebrating',
    'this unforgettable day with you and your loved ones.',
  ];
  for (const line of closingLines) {
    doc.text(line, pw / 2, ty, { align: 'center' });
    ty += 5.5;
  }

  doc.save(`Wedding_Invitation_${data.name.replace(/\s+/g, '_')}.pdf`);
}
