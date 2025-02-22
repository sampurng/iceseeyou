import { supabase } from '../models/db';

export const getSpamReports = async () => {
    const { data, error } = await supabase
        .from('spam_reports')
        .select('*');

    if (error) throw new Error(error.message);
    return data;
};
