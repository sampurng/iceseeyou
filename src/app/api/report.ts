import { NextApiRequest, NextApiResponse } from 'next';
import { submitReport } from '../controller/reportController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { user_id, location, description } = req.body;
            const report = await submitReport(user_id, location, description);
            res.status(200).json(report);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}
