'use server'

import {auth, signIn, signOut} from "@/app/_lib/auth";
import {supabase} from "@/app/_lib/supabase";
import {revalidatePath} from "next/cache";
import {getBookings} from "@/app/_lib/data-service";
import {redirect} from "next/navigation";

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

    const {error } = await supabase
        .from('guests')
        .update(updateData)
        .eq('id', session.user.guestId);

    if (error) {
        throw new Error('Guest could not be updated');
    }

    revalidatePath('/account/profile'); // for cache invalidation
}

export async function deleteReservationAction(bookingId){
    const session = await auth();
    if(!session) throw new Error('Not authenticated');

    const guestBookings = await getBookings(session?.user?.guestId);
    const guestBookingIds = guestBookings.map(booking => booking.id);

    if(!guestBookingIds.includes(bookingId)) throw new Error('You cannot delete this reservation');

    const {error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', bookingId);

    if (error) {
        throw new Error('Booking could not be deleted');
    }

    revalidatePath('/account/reservations');
}

export async function updateReservationAction(formData){
    const session = await auth();
    if(!session) throw new Error('Not authenticated');

    const guestBookings = await getBookings(session?.user?.guestId);
    const guestBookingIds = guestBookings.map(booking => booking.id);

    console.log('guestBookingIds', guestBookingIds);
    const observations = formData.get('observations');
    const numGuests = Number(formData.get('numGuests'));
    const bookingId = Number(formData.get('bookingId'));

    if(!guestBookingIds.includes(bookingId)) throw new Error('You cannot Edit this reservation');

    const updateFields = {numGuests, observations};

    const { data, error } = await supabase
        .from('bookings')
        .update(updateFields)
        .eq('id', bookingId)
        .select()
        .single();

    if (error) {
        console.error(error);
        throw new Error('Booking could not be updated');
    }

    revalidatePath(`/account/reservations/edit/${bookingId}`);
    redirect(`/account/reservations/`);
}
