import { NextApiRequest, NextApiResponse } from 'next';
import { getSpamReports } from '../controller/spamController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const spamReports = await getSpamReports();
            res.status(200).json(spamReports);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}
