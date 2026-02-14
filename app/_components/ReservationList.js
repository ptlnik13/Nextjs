'use client'
import React, {useOptimistic} from 'react';
import ReservationCard from "@/app/_components/ReservationCard";
import {deleteReservationAction} from "@/app/_lib/actions";

function ReservationList({bookings}) {

    const [optimisticBookings, optimisticDelete] = useOptimistic(bookings, (currBookings, deletedBookingId)=>{
        return currBookings.filter(booking => booking.id !== deletedBookingId);
    })

    async function handleDelete(bookingId) {
        optimisticDelete(bookingId);
        await deleteReservationAction(bookingId);
    }

    return (
        <ul className="space-y-6">
            {optimisticBookings.map((booking) => (
                <ReservationCard onDelete={handleDelete} booking={booking} key={booking.id}/>
            ))}
        </ul>
    );
}

export default ReservationList;
