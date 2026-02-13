import {auth} from "@/app/_lib/auth";

export const metadata = {
    title: 'Login'
}

async function Page() {
    const session = await auth();

    return (
        <h2 className="font-semibold text-2xl text-accent-400 mb-7">
            Welcome, {session.user.name.split(' ')[1]}
        </h2>
    );
}

export default Page;
