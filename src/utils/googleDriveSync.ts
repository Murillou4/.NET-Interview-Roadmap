import { UserProgress } from '../types';
import { getInitialProgress, PROGRESS_STORAGE_KEY, saveProgress } from './storage';

const GOOGLE_IDENTITY_SCRIPT_ID = 'google-identity-services';
const GOOGLE_IDENTITY_SCRIPT_SRC = 'https://accounts.google.com/gsi/client';
const DRIVE_SYNC_FILE_NAME = 'dotnet-interview-roadmap-sync.json';
const DRIVE_SCOPE = 'https://www.googleapis.com/auth/drive.appdata';
const DRIVE_FILES_URL = 'https://www.googleapis.com/drive/v3/files';
const DRIVE_UPLOAD_URL = 'https://www.googleapis.com/upload/drive/v3/files';
const LOCAL_BACKUP_STORAGE_KEY = 'dotnet_interview_roadmap_pre_drive_restore_backup';

interface GoogleTokenResponse {
  access_token?: string;
  expires_in?: number;
  error?: string;
  error_description?: string;
}

interface GoogleTokenClient {
  requestAccessToken: (options?: { prompt?: string }) => void;
  callback: (response: GoogleTokenResponse) => void;
}

interface GoogleIdentityServices {
  accounts: {
    oauth2: {
      initTokenClient: (config: {
        client_id: string;
        scope: string;
        callback: (response: GoogleTokenResponse) => void;
      }) => GoogleTokenClient;
      revoke: (token: string, done: () => void) => void;
    };
  };
}

declare global {
  interface Window {
    google?: GoogleIdentityServices;
  }
}

export interface DriveSyncFile {
  version: 1;
  updatedAt: string;
  progress: UserProgress;
  localStorage: Record<string, string>;
}

export interface DriveSyncSession {
  accessToken: string;
  expiresAt: number;
}

export interface DriveSyncResult {
  fileId: string;
  data: DriveSyncFile | null;
}

const createEmptyProgress = (): UserProgress => ({
  termStatus: {},
  termConfidence: {},
  simulatorPerformance: {},
  simulatorDrafts: {},
  simulatorCurrentQuestionId: null,
});

const normalizeProgress = (progress?: Partial<UserProgress> | null): UserProgress => ({
  termStatus: progress?.termStatus || {},
  termConfidence: progress?.termConfidence || {},
  simulatorPerformance: progress?.simulatorPerformance || {},
  simulatorDrafts: progress?.simulatorDrafts || {},
  simulatorCurrentQuestionId: progress?.simulatorCurrentQuestionId || null,
});

const getClientId = () => import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined;

export const isGoogleDriveSyncConfigured = () => Boolean(getClientId());

const loadScript = () =>
  new Promise<void>((resolve, reject) => {
    if (window.google?.accounts?.oauth2) {
      resolve();
      return;
    }

    const existingScript = document.getElementById(GOOGLE_IDENTITY_SCRIPT_ID) as HTMLScriptElement | null;
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(), { once: true });
      existingScript.addEventListener('error', () => reject(new Error('Não foi possível carregar o login do Google.')), {
        once: true,
      });
      return;
    }

    const script = document.createElement('script');
    script.id = GOOGLE_IDENTITY_SCRIPT_ID;
    script.src = GOOGLE_IDENTITY_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Não foi possível carregar o login do Google.'));
    document.head.appendChild(script);
  });

export const requestDriveSyncSession = async (): Promise<DriveSyncSession> => {
  const clientId = getClientId();
  if (!clientId) {
    throw new Error('Configure VITE_GOOGLE_CLIENT_ID para ativar o sync com Google Drive.');
  }

  await loadScript();

  return new Promise((resolve, reject) => {
    const tokenClient = window.google?.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: DRIVE_SCOPE,
      callback: (response) => {
        if (response.error || !response.access_token) {
          reject(new Error(response.error_description || response.error || 'Login com Google cancelado.'));
          return;
        }

        resolve({
          accessToken: response.access_token,
          expiresAt: Date.now() + (response.expires_in || 3600) * 1000,
        });
      },
    });

    if (!tokenClient) {
      reject(new Error('Login do Google indisponível neste navegador.'));
      return;
    }

    tokenClient.requestAccessToken({ prompt: 'consent' });
  });
};

export const revokeDriveSyncSession = (session: DriveSyncSession | null) => {
  if (!session?.accessToken || !window.google?.accounts?.oauth2) return;
  window.google.accounts.oauth2.revoke(session.accessToken, () => undefined);
};

const driveFetch = async <T>(session: DriveSyncSession, url: string, init: RequestInit = {}): Promise<T> => {
  const response = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
      ...(init.headers || {}),
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Google Drive retornou ${response.status}: ${body}`);
  }

  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
};

export const createSyncPayload = (progress: UserProgress): DriveSyncFile => {
  const localStorageSnapshot: Record<string, string> = {};

  for (let index = 0; index < localStorage.length; index += 1) {
    const key = localStorage.key(index);
    if (!key || key === PROGRESS_STORAGE_KEY || key === LOCAL_BACKUP_STORAGE_KEY) continue;
    const value = localStorage.getItem(key);
    if (value !== null) localStorageSnapshot[key] = value;
  }

  return {
    version: 1,
    updatedAt: new Date().toISOString(),
    progress: normalizeProgress(progress),
    localStorage: localStorageSnapshot,
  };
};

export const mergeProgress = (localProgress: UserProgress, remoteProgress: UserProgress): UserProgress => {
  const normalizedLocal = normalizeProgress(localProgress);
  const normalizedRemote = normalizeProgress(remoteProgress);

  return {
    termStatus: {
      ...normalizedRemote.termStatus,
      ...normalizedLocal.termStatus,
    },
    termConfidence: {
      ...normalizedRemote.termConfidence,
      ...normalizedLocal.termConfidence,
    },
    simulatorPerformance: {
      ...normalizedRemote.simulatorPerformance,
      ...normalizedLocal.simulatorPerformance,
    },
    simulatorDrafts: {
      ...normalizedRemote.simulatorDrafts,
      ...normalizedLocal.simulatorDrafts,
    },
    simulatorCurrentQuestionId:
      normalizedLocal.simulatorCurrentQuestionId || normalizedRemote.simulatorCurrentQuestionId || null,
  };
};

export const mergeSyncPayload = (localPayload: DriveSyncFile, remotePayload: DriveSyncFile): DriveSyncFile => ({
  version: 1,
  updatedAt: new Date().toISOString(),
  progress: mergeProgress(localPayload.progress, remotePayload.progress),
  localStorage: {
    ...(remotePayload.localStorage || {}),
    ...(localPayload.localStorage || {}),
  },
});

export const savePreRestoreBackup = (payload: DriveSyncFile) => {
  localStorage.setItem(LOCAL_BACKUP_STORAGE_KEY, JSON.stringify(payload));
};

export const applySyncPayload = (payload: DriveSyncFile): UserProgress => {
  Object.entries(payload.localStorage || {}).forEach(([key, value]) => {
    localStorage.setItem(key, value);
  });

  const progress = normalizeProgress(payload.progress || createEmptyProgress());
  saveProgress(progress);
  return progress;
};

export const findDriveSyncFile = async (session: DriveSyncSession): Promise<DriveSyncResult> => {
  const params = new URLSearchParams({
    spaces: 'appDataFolder',
    fields: 'files(id,name,modifiedTime)',
    q: `name='${DRIVE_SYNC_FILE_NAME}' and trashed=false`,
  });

  const result = await driveFetch<{ files?: { id: string }[] }>(session, `${DRIVE_FILES_URL}?${params.toString()}`);
  const fileId = result.files?.[0]?.id;

  if (!fileId) {
    const created = await driveFetch<{ id: string }>(session, DRIVE_FILES_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: DRIVE_SYNC_FILE_NAME, parents: ['appDataFolder'] }),
    });
    return { fileId: created.id, data: null };
  }

  try {
    const data = await driveFetch<DriveSyncFile>(session, `${DRIVE_FILES_URL}/${fileId}?alt=media`);
    return { fileId, data };
  } catch {
    return { fileId, data: null };
  }
};

export const uploadDriveSyncFile = async (
  session: DriveSyncSession,
  fileId: string,
  payload: DriveSyncFile,
): Promise<void> => {
  await driveFetch(session, `${DRIVE_UPLOAD_URL}/${fileId}?uploadType=media`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
};

export const getLocalProgress = getInitialProgress;
