import { NextApiRequest, NextApiResponse } from 'next';
import { createUser } from '../controller/userController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { email } = req.body;
            const user = await createUser(email);
            res.status(200).json(user);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}
