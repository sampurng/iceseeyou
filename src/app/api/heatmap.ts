import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../models/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const { data, error } = await supabase
                .from('input_form')
                .select('location, date, description')
                .eq('status', 'verified'); // Only fetch verified reports

            if (error) throw new Error(error.message);
            res.status(200).json(data);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}
