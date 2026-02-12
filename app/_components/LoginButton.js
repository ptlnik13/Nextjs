'use client'
import React from 'react';
import Link from "next/link";
import {useAuth} from "@/app/_lib/AuthContext";

function LoginButton() {
    const session = useAuth();
    return (
        <li>
            {session?.user?.image ? (
                <Link
                    href="/account"
                    className="hover:text-accent-400 transition-colors flex items-center gap-4"
                >
                    <img
                        src={session.user.image}
                        className='h-8 rounded-full'
                        alt={session.user.name}
                        referrerPolicy='no-referrer'/>
                    <span>Hi, {session.user.name}</span>
                </Link>
            ) : (
                <Link
                    href="/account"
                    className="hover:text-accent-400 transition-colors"
                >
                    Guest area
                </Link>
            )}
        </li>
    );
}

export default LoginButton;
