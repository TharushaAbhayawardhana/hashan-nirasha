import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, type Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface ParticipantFormData {
  name: string;
  email?: string;
  phone: string;
  attendance: string;
  side: string;
  familyParticipants: number;
  dietary?: string;
  message?: string;
}

export interface Participant extends ParticipantFormData {
  id: string;
  submittedAt: Timestamp;
}

const COLLECTION = 'participants';

export async function addParticipant(data: ParticipantFormData): Promise<void> {
  await addDoc(collection(db, COLLECTION), {
    ...data,
    email: data.email ?? '',
    dietary: data.dietary ?? '',
    message: data.message ?? '',
    submittedAt: serverTimestamp(),
  });
}

export function subscribeParticipants(
  onData: (participants: Participant[]) => void,
  onError: (error: Error) => void,
): () => void {
  const q = query(collection(db, COLLECTION), orderBy('submittedAt', 'desc'));

  return onSnapshot(
    q,
    (snapshot) => {
      const list: Participant[] = snapshot.docs.map((doc) => {
        const d = doc.data();
        return {
          id: doc.id,
          name: d.name ?? '',
          email: d.email ?? '',
          phone: d.phone ?? '',
          attendance: d.attendance ?? '',
          side: d.side ?? '',
          familyParticipants: d.familyParticipants ?? 1,
          dietary: d.dietary ?? '',
          message: d.message ?? '',
          submittedAt: d.submittedAt,
        } as Participant;
      });
      onData(list);
    },
    (err) => {
      onError(new Error(err.message));
    },
  );
}
