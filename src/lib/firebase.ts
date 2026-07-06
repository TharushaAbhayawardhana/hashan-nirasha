import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCf3h3D2IHnH8WRoYglgGxs1aJ932NB-QY',
  authDomain: 'hashan-nirasha.firebaseapp.com',
  projectId: 'hashan-nirasha',
  storageBucket: 'hashan-nirasha.firebasestorage.app',
  messagingSenderId: '178689573386',
  appId: '1:178689573386:web:6e45baeba56360af3b95f3',
  measurementId: 'G-41ZLHYYZH3',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const ADMIN_EMAILS = [
  'tharusharandima1@gmail.com',
  'kavindacc@gmail.com',
  'hashanrathnayake00@gmail.com',
];

export function isAdminEmail(email: string | null): boolean {
  return ADMIN_EMAILS.includes(email ?? '');
}

const googleProvider = new GoogleAuthProvider();

export function loginWithGoogle(): Promise<void> {
  return signInWithPopup(auth, googleProvider).then(() => {});
}

export function logout(): Promise<void> {
  return signOut(auth);
}
