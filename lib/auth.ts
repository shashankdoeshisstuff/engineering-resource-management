// lib/auth.ts
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import User from '@/models/User';
import dbConnect from './db';
import { NextRequest } from 'next/server';

// For server components (no request object available)
export async function getCurrentUser() {
  const token = (await cookies()).get('token')?.value;
  return getUserFromToken(token);
}

// For API routes (request object available)
export async function getCurrentUserFromRequest(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  return getUserFromToken(token);
}

// Shared token handling logic
async function getUserFromToken(token: string | undefined) {
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    await dbConnect();
    return await User.findById(decoded.id).select('-password');
  } catch {
    return null;
  }
}
