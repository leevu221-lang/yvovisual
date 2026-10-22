// src/services/firebase.js
import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, collection, doc, setDoc, 
  deleteDoc, onSnapshot, getDocs, writeBatch 
} from 'firebase/firestore';
import { 
  getStorage, ref, uploadBytes, uploadString, getDownloadURL 
} from 'firebase/storage';

const CONFIG_STORAGE_KEY = 'yvo_firebase_config';

// Default / saved config helper
export function getSavedFirebaseConfig() {
  try {
    const raw = localStorage.getItem(CONFIG_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error parsing stored firebase config:', err);
    return null;
  }
}

export function saveFirebaseConfig(config) {
  try {
    localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(config));
    return true;
  } catch (err) {
    console.error('Error saving firebase config:', err);
    return false;
  }
}

export function clearFirebaseConfig() {
  localStorage.removeItem(CONFIG_STORAGE_KEY);
}

// Global instances
let firebaseApp = null;
let firestoreDb = null;
let firebaseStorage = null;

export function initFirebase(customConfig = null) {
  const config = customConfig || getSavedFirebaseConfig();

  if (!config || !config.projectId || !config.apiKey) {
    return {
      isConfigured: false,
      app: null,
      db: null,
      storage: null
    };
  }

  try {
    if (!getApps().length) {
      firebaseApp = initializeApp(config);
    } else {
      firebaseApp = getApp();
    }

    firestoreDb = getFirestore(firebaseApp);
    firebaseStorage = config.storageBucket ? getStorage(firebaseApp) : null;

    return {
      isConfigured: true,
      app: firebaseApp,
      db: firestoreDb,
      storage: firebaseStorage
    };
  } catch (error) {
    console.warn('Firebase initialization error:', error);
    return {
      isConfigured: false,
      error: error.message,
      app: null,
      db: null,
      storage: null
    };
  }
}

// Test connection
export async function testFirebaseConnection(config) {
  try {
    const tempAppName = `test-${Date.now()}`;
    const tempApp = initializeApp(config, tempAppName);
    const db = getFirestore(tempApp);
    // Try reading photos collection
    const testSnap = await getDocs(collection(db, '_connection_test'));
    return { success: true, count: testSnap.size };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

// Upload image to Firebase Storage (from base64 data URL or File object)
export async function uploadImageToStorage(fileOrDataUrl, photoId) {
  const { storage, isConfigured } = initFirebase();
  if (!isConfigured || !storage) {
    return null;
  }

  try {
    const timestamp = Date.now();
    const filePath = `yvo-photos/${photoId || timestamp}_${timestamp}.jpg`;
    const storageRef = ref(storage, filePath);

    if (typeof fileOrDataUrl === 'string' && fileOrDataUrl.startsWith('data:')) {
      await uploadString(storageRef, fileOrDataUrl, 'data_url', {
        contentType: 'image/jpeg'
      });
    } else if (fileOrDataUrl instanceof Blob || fileOrDataUrl instanceof File) {
      await uploadBytes(storageRef, fileOrDataUrl, {
        contentType: fileOrDataUrl.type || 'image/jpeg'
      });
    } else {
      return null;
    }

    const downloadUrl = await getDownloadURL(storageRef);
    return downloadUrl;
  } catch (err) {
    console.error('Storage upload error:', err);
    return null;
  }
}

// Save or Update Photo in Firestore
export async function savePhotoToCloud(photo) {
  const { db, isConfigured } = initFirebase();
  if (!isConfigured || !db) return false;

  try {
    const photoId = photo.id || `photo-${Date.now()}`;
    const docRef = doc(db, 'photos', photoId);
    await setDoc(docRef, {
      ...photo,
      id: photoId,
      updatedAt: new Date().toISOString()
    }, { merge: true });
    return true;
  } catch (err) {
    console.error('Firestore save photo error:', err);
    return false;
  }
}

// Delete Photo in Firestore
export async function deletePhotoFromCloud(photoId) {
  const { db, isConfigured } = initFirebase();
  if (!isConfigured || !db) return false;

  try {
    await deleteDoc(doc(db, 'photos', photoId));
    return true;
  } catch (err) {
    console.error('Firestore delete photo error:', err);
    return false;
  }
}

// Save Album to Firestore
export async function saveAlbumToCloud(album) {
  const { db, isConfigured } = initFirebase();
  if (!isConfigured || !db) return false;

  try {
    const docRef = doc(db, 'albums', album.id);
    await setDoc(docRef, {
      ...album,
      updatedAt: new Date().toISOString()
    }, { merge: true });
    return true;
  } catch (err) {
    console.error('Firestore save album error:', err);
    return false;
  }
}

// Delete Album in Firestore
export async function deleteAlbumFromCloud(albumId) {
  const { db, isConfigured } = initFirebase();
  if (!isConfigured || !db) return false;

  try {
    await deleteDoc(doc(db, 'albums', albumId));
    return true;
  } catch (err) {
    console.error('Firestore delete album error:', err);
    return false;
  }
}

// Batch Sync all local data to Cloud
export async function batchSyncToCloud(photos, albums) {
  const { db, isConfigured } = initFirebase();
  if (!isConfigured || !db) return { success: false, message: 'Firebase chưa được kết nối' };

  try {
    const batch = writeBatch(db);

    // Sync albums
    albums.forEach(album => {
      const albumRef = doc(db, 'albums', album.id);
      batch.set(albumRef, { ...album, syncedAt: new Date().toISOString() }, { merge: true });
    });

    // Sync photos
    photos.forEach(photo => {
      const photoRef = doc(db, 'photos', photo.id);
      batch.set(photoRef, { ...photo, syncedAt: new Date().toISOString() }, { merge: true });
    });

    await batch.commit();
    return { success: true, countPhotos: photos.length, countAlbums: albums.length };
  } catch (err) {
    console.error('Batch sync error:', err);
    return { success: false, error: err.message };
  }
}
