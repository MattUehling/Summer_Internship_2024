import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, name, job, email } = req.body;

    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const newEmployee = await prisma.employee.create({
        data: {
          name,
          job,
          email,
          userId,
        },
      });

      res.status(201).json(newEmployee);
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ error: 'Error creating employee', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
