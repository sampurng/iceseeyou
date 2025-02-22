import { supabase } from '../models/db';

export const createUser = async (email: string) => {
    const { data, error } = await supabase
        .from('users')
        .insert([{ email }])
        .select();

    if (error) throw new Error(error.message);
    return data;
};
