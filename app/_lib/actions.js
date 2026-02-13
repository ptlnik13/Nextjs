'use server'

import {auth, signIn, signOut} from "@/app/_lib/auth";
import {supabase} from "@/app/_lib/supabase";

export async function signInAction(){
    await signIn('google', {redirectTo: '/account'})
}

export async function signOutAction(){
    await signOut({redirect: false });
}

export async function updateGuestAction(formData){
    const session = await auth();
   if(!session) throw new Error('Not authenticated');

   const fullName = formData.get('fullName');
   const nationalID = formData.get('nationalID');
   const email = formData.get('email');
   const [nationality, countryFlag] = formData.get('nationality').split('%');

   if(!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) throw new Error('National ID must be alphanumeric');

   const updateData = {nationality, countryFlag, nationalID}

    const { data, error } = await supabase
        .from('guests')
        .update(updateData)
        .eq('id', session.user.guestId);

    if (error) {
        throw new Error('Guest could not be updated');
    }
}
