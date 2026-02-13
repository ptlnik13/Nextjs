
import {auth} from "@/app/_lib/auth";
export const middleware = auth;
// export function middleware(request){
//     console.log(request);
// }

export const config = {
    matcher: ['/account']
}
