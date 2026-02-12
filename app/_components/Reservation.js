import React from 'react';
import DateSelector from "@/app/_components/DateSelector";
import ReservationForm from "@/app/_components/ReservationForm";
import {getBookedDatesByCabinId, getCabin, getSettings} from "@/app/_lib/data-service";

async function Reservation({cabin}) {

    const [settings, bookDates] =
        await Promise.all([
            getSettings(),
            getBookedDatesByCabinId(cabin.id)
        ])
    return (
        <div className='grid grid-cols-2 border border-primary-800 min-h-[400px]'>
            <DateSelector settings={settings} bookDates={bookDates} cabin={cabin}/>
            <ReservationForm cabin={cabin}/>
        </div>
    );
}

export default Reservation;
