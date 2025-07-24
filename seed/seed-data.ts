import User from '../models/User';
import Project from '../models/Project';
import Assignment from '../models/Assignment';
import bcrypt from 'bcryptjs';
import dbConnect from '../lib/db';

export async function seedDatabase() {
  await dbConnect();
  
  // Clear existing data
  await User.deleteMany({});
  await Project.deleteMany({});
  await Assignment.deleteMany({});

  // Create manager
  const manager = await User.create({
    email: 'manager@example.com',
    name: 'Sarah Johnson',
    password: 'manager123',
    role: 'manager',
    maxCapacity: 100
  });

  // Create engineers
  const engineer1 = await User.create({
    email: 'engineer1@example.com',
    name: 'Alex Chen',
    /* password: await bcrypt.hash('engineer1', 10), */
    password: 'engineer1',
    role: 'engineer',
    skills: ['React', 'Node.js', 'TypeScript'],
    seniority: 'senior',
    maxCapacity: 100
  });

  const engineer2 = await User.create({
    email: 'engineer2@example.com',
    name: 'Jamie Smith',
    password: await bcrypt.hash('engineer2', 10),
    role: 'engineer',
    skills: ['Python', 'Django', 'AWS'],
    seniority: 'mid',
    maxCapacity: 50
  });

  const engineer3 = await User.create({
    email: 'engineer3@example.com',
    name: 'Taylor Brown',
    password: await bcrypt.hash('engineer3', 10),
    role: 'engineer',
    skills: ['React', 'CSS', 'UI/UX'],
    seniority: 'junior',
    maxCapacity: 100
  });

  // Create projects
  const project1 = await Project.create({
    name: 'Customer Portal Redesign',
    description: 'Revamp customer facing portal',
    startDate: new Date('2023-10-01'),
    endDate: new Date('2024-03-31'),
    requiredSkills: ['React', 'Node.js'],
    teamSize: 5,
    status: 'active',
    managerId: manager._id
  });

  const project2 = await Project.create({
    name: 'Data Analytics Platform',
    description: 'Build analytics dashboard for business metrics',
    startDate: new Date('2023-11-15'),
    endDate: new Date('2024-02-28'),
    requiredSkills: ['Python', 'Django', 'AWS'],
    teamSize: 3,
    status: 'active',
    managerId: manager._id
  });

  const project3 = await Project.create({
    name: 'Mobile App Development',
    description: 'New mobile application for iOS and Android',
    startDate: new Date('2024-01-10'),
    endDate: new Date('2024-06-30'),
    requiredSkills: ['React Native', 'TypeScript'],
    teamSize: 4,
    status: 'planning',
    managerId: manager._id
  });

  // Create assignments
  await Assignment.create({
    engineerId: engineer1._id,
    projectId: project1._id,
    allocationPercentage: 60,
    startDate: new Date('2023-10-01'),
    endDate: new Date('2024-02-28'),
    role: 'Lead Developer'
  });

  await Assignment.create({
    engineerId: engineer1._id,
    projectId: project3._id,
    allocationPercentage: 20,
    startDate: new Date('2024-01-10'),
    endDate: new Date('2024-03-31'),
    role: 'Technical Advisor'
  });

  await Assignment.create({
    engineerId: engineer2._id,
    projectId: project2._id,
    allocationPercentage: 40,
    startDate: new Date('2023-11-15'),
    endDate: new Date('2024-02-28'),
    role: 'Backend Developer'
  });

  await Assignment.create({
    engineerId: engineer3._id,
    projectId: project1._id,
    allocationPercentage: 30,
    startDate: new Date('2023-10-15'),
    endDate: new Date('2024-01-31'),
    role: 'Frontend Developer'
  });

  await Assignment.create({
    engineerId: engineer3._id,
    projectId: project3._id,
    allocationPercentage: 50,
    startDate: new Date('2024-01-10'),
    endDate: new Date('2024-04-30'),
    role: 'UI Developer'
  });

  console.log('Database seeded successfully!');
  process.exit(0);
}

seedDatabase().catch(err => {
  console.error('Seeding failed:', err);
  process.exit(1);
});