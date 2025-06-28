import { supabase } from "./supabase"

export default async function userRegister(email: string, password: string, name: string) {

    try {
        const { data: signupData, error: signupError } = await supabase.auth.signUp({
            email,
            password
        })

        if (signupError) {
            console.log(signupError.message)
            return "Error signing up"
        }

        const userId = signupData.user?.id;

        if (userId) {
            const { error: insertError } = await supabase.from('profiles').insert({
                id: userId,
                name,
                email
            })

            if (insertError) {
                console.log(insertError.message)
                return "Profile saving failed!"
            }

        } else {
            return "Signup failed. Please try again."
        }

       
        return ""
    } catch (error) {
        console.error("Registration error:", error);
        return "Something went wrong. Try again."
    }
}