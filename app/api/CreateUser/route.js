import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password, name } = req.body;

    try {
      const newUser = await prisma.user.create({
        data: {
          email,
          password,
          name,
        },
      });
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ error: 'Error creating user', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
