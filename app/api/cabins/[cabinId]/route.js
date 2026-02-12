import {getBookedDatesByCabinId, getCabin} from "@/app/_lib/data-service";

export async function GET(req, res) {
    const {cabinId} = res.params

    try{
      const [cabin, bookedDates] =
          await Promise.all([getCabin(cabinId), getBookedDatesByCabinId(cabinId)]);
        return Response.json({cabin, bookedDates});
    }catch(e){
        return Response.json({message: 'Cabin not found'});
    }


}

// export async function POST(req, res) {}
