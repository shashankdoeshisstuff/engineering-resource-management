import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  await dbConnect();
  
  try {
    const { name, email, password, role, skills = [], seniority, employmentType, department } = await req.json();
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const maxCapacity = employmentType === 'full-time' ? 100 : 50;
    
    // Create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      skills: skills.split(',').map((s: string) => s.trim()),
      seniority,
      maxCapacity,
      department
    });
    
    return NextResponse.json(
      { id: newUser._id, email: newUser.email, name: newUser.name, role: newUser.role },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}