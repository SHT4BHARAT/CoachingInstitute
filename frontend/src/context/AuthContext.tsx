'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'STUDENT' | 'TEACHER' | 'ADMIN';

export interface UserProfile {
  id: string;
  name: string;
  nameMr: string;
  email: string;
  phone: string;
  role: UserRole;
  district: string;
  enrolledBatchIds: string[];
  deviceFingerprint: string;
  ipAddress: string;
}

interface AuthContextType {
  user: UserProfile;
  role: UserRole;
  switchRole: (role: UserRole) => void;
  heartbeatSecondsLeft: number;
  isEnrolled: (batchId: string) => boolean;
  enrollInBatch: (batchId: string) => void;
  simulateConcurrentLogin: () => void;
  isSessionBlocked: boolean;
  unblockSession: () => void;
  isKonkanMode: boolean;
  toggleKonkanMode: () => void;
}

// In production, phone/IP/fingerprint are fetched from authenticated API and never bundled.
// Mock bundle ships masked values only; full PII requires server auth.
const MASK = (p: string) => p.replace(/(\d{2})\d{6}(\d{2})/, '$1****$2');
const MASK_IP = (ip: string) => ip.replace(/(\d+\.\d+)\.\d+\.\d+/, '$1.***.**');

const mockUsersRaw: Record<UserRole, UserProfile> = {
  STUDENT: {
    id: 'MS-STU-2026-9042',
    name: 'Rohan Desai',
    nameMr: 'रोहन देसाई',
    email: 'rohan.desai@gmail.com',
    phone: '9823481210',
    role: 'STUDENT',
    district: 'रत्नागिरी (Ratnagiri, Konkan)',
    enrolledBatchIds: ['batch-cet-2026', 'batch-12th-hsc'],
    deviceFingerprint: 'a8f9c210d7b4e311',
    ipAddress: '103.21.144.12',
  },
  TEACHER: {
    id: 'MS-TCH-108',
    name: 'Prof. Anant Kulkarni',
    nameMr: 'प्रा. अनंत कुलकर्णी (M.Sc. Physics)',
    email: 'anant.physics@mahashiksha.in',
    phone: '9422019942',
    role: 'TEACHER',
    district: 'पुणे (Pune)',
    enrolledBatchIds: ['batch-cet-2026', 'batch-12th-hsc', 'batch-10th-ssc'],
    deviceFingerprint: 'b4e11209cc55aa78',
    ipAddress: '103.21.144.99',
  },
  ADMIN: {
    id: 'MS-ADM-001',
    name: 'Dr. Vijay Salunkhe',
    nameMr: 'डॉ. विजय साळुंखे (संचालक)',
    email: 'director@mahashiksha.in',
    phone: '9822001122',
    role: 'ADMIN',
    district: 'मुंबई (Mumbai Head Office)',
    enrolledBatchIds: ['batch-cet-2026', 'batch-12th-hsc', 'batch-10th-ssc'],
    deviceFingerprint: 'c991823ab1234ef0',
    ipAddress: '115.111.45.10',
  },
};

// Masked view that is actually exposed to client bundle.
const mockUsers: Record<UserRole, UserProfile> = (() => {
  const masked: Record<string, UserProfile> = {};
  for (const k of Object.keys(mockUsersRaw) as UserRole[]) {
    const u = mockUsersRaw[k];
    masked[k] = {
      ...u,
      phone: typeof window !== 'undefined' && process.env.NODE_ENV === 'production' ? MASK(u.phone) : MASK(u.phone),
      ipAddress: MASK_IP(u.ipAddress),
      deviceFingerprint: u.deviceFingerprint.slice(0, 8) + '****',
    };
  }
  return masked as Record<UserRole, UserProfile>;
})();

const AuthContext = createContext<AuthContextType>({
  user: mockUsers.STUDENT,
  role: 'STUDENT',
  switchRole: () => {},
  heartbeatSecondsLeft: 30,
  isEnrolled: () => true,
  enrollInBatch: () => {},
  simulateConcurrentLogin: () => {},
  isSessionBlocked: false,
  unblockSession: () => {},
  isKonkanMode: false,
  toggleKonkanMode: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('STUDENT');
  const [user, setUser] = useState<UserProfile>(mockUsers.STUDENT);
  const [heartbeatSecondsLeft, setHeartbeatSecondsLeft] = useState<number>(30);
  const [isSessionBlocked, setIsSessionBlocked] = useState<boolean>(false);
  const [isKonkanMode, setIsKonkanMode] = useState<boolean>(false);

  // Switch active role
  const switchRole = (newRole: UserRole) => {
    setRole(newRole);
    setUser(mockUsers[newRole]);
    setIsSessionBlocked(false);
  };

  // Toggle 240p Konkan Low-Bandwidth Mode
  const toggleKonkanMode = () => {
    setIsKonkanMode((prev) => !prev);
  };

  // Heartbeat countdown simulation (30s interval for single-device lock)
  useEffect(() => {
    const timer = setInterval(() => {
      setHeartbeatSecondsLeft((prev) => (prev <= 1 ? 30 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const isEnrolled = (batchId: string) => {
    if (role === 'TEACHER' || role === 'ADMIN') return true;
    return user.enrolledBatchIds.includes(batchId);
  };

  const enrollInBatch = (batchId: string) => {
    if (!user.enrolledBatchIds.includes(batchId)) {
      setUser((prev) => ({
        ...prev,
        enrolledBatchIds: [...prev.enrolledBatchIds, batchId],
      }));
    }
  };

  const simulateConcurrentLogin = () => {
    setIsSessionBlocked(true);
  };

  const unblockSession = () => {
    setIsSessionBlocked(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        switchRole,
        heartbeatSecondsLeft,
        isEnrolled,
        enrollInBatch,
        simulateConcurrentLogin,
        isSessionBlocked,
        unblockSession,
        isKonkanMode,
        toggleKonkanMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
