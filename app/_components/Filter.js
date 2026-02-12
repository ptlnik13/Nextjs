'use client';

import React from 'react';
import {usePathname, useRouter, useSearchParams} from "next/navigation";
// import {useRouter} from "next/router";

function Filter() {

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathName = usePathname();

    const activeFilter = searchParams.get('capacity') || 'all';
    function handleFilter(filter) {
        return () => {
            // window.location.href = `/cabins?capacity=${filter}`;
            const params = new URLSearchParams(searchParams); // capacity=small
            params.set('capacity', filter);
            router.replace(`${pathName}?${params.toString()}`, {scroll: false})
        }
    }

    return (
        <div className="border border-primary-800 flex">
            <Button filter='all' handleFilter={handleFilter} activeFilter={activeFilter}>
                All Cabins
            </Button>
            <Button filter='small' handleFilter={handleFilter} activeFilter={activeFilter}>
                1&mdash;3 guest
            </Button>
            <Button filter='medium' handleFilter={handleFilter} activeFilter={activeFilter}>
                4&mdash;7 guest
            </Button>
            <Button filter='large' handleFilter={handleFilter} activeFilter={activeFilter}>
                8&mdash;12 guest
            </Button>
        </div>
    );
}

function Button({children,filter, handleFilter, activeFilter}) {
    return(
        <button
            onClick={handleFilter(filter)}
            className={`px-5 py-2 hover:bg-primary-700 ${activeFilter === filter ? 'bg-primary-700 text-primary-50' : ''}`}>
            {children}
        </button>
    )
}
export default Filter;
