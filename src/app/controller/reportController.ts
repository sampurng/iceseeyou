import { supabase } from '../models/db';

export const submitReport = async (user_id: string, location: string, description: string) => {
    // Check user credibility
    const { data: user, error: userError } = await supabase
        .from('users')
        .select('credibility_score, email')
        .eq('uuid', user_id)
        .single();

    if (userError || !user) throw new Error("User not found");

    let status = "pending";
    if (user.credibility_score < 50) {
        status = "spam";
    }

    // Insert report
    const { data: report, error: reportError } = await supabase
        .from('input_form')
        .insert([{ user_id, location, description, status }])
        .select();

    if (reportError) throw new Error(reportError.message);

    // If spam, insert into spam_reports table
    if (status === "spam") {
        await supabase
            .from('spam_reports')
            .insert([{ user_email: user.email, report_id: report[0].id }]);
    }

    return report;
};
