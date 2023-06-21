import prisma from '../../prisma/client';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name } = req.body;

    try {
      // Store the name in the database using Prisma
      await prisma.student.create({
        data: { name },
      });

      res.status(200).json({ message: 'Name stored successfully' });
    } catch (error) {
      console.error('Failed to store name:', error);
      res.status(500).json({ error: 'Failed to store name' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
