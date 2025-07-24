import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  await dbConnect();
  const { email, password } = await req.json();
  
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 401 });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '1d' }
    );

    const response = NextResponse.json({
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      skills: user.skills,
      seniority: user.seniority,
      maxCapacity: user.maxCapacity,
      department: user.department
    });

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 86400,
      sameSite: 'strict',
      path: '/',
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Internal server error' }, 
      { status: 500 }
    );
  }
}