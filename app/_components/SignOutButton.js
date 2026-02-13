import {ArrowRightOnRectangleIcon} from '@heroicons/react/24/solid';
import {signOutAction} from "@/app/_lib/actions";
import {useAuth} from "@/app/_lib/AuthContext";
import { useRouter } from 'next/navigation';

function SignOutButton() {
    const { resetAuthState } = useAuth();
    const router = useRouter();

    async function handleSignOut() {
        try{
            await signOutAction();
            resetAuthState();
            router.push('/');
        }catch (e) {
            console.log("Couldn't sign out:");
        }
    }

    return (
        <form action={handleSignOut}>
            <button
                className='py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 w-full'>
                <ArrowRightOnRectangleIcon className='h-5 w-5 text-primary-600'/>
                <span>Sign out</span>
            </button>
        </form>
    );
}

export default SignOutButton;
