import Counter from "@/app/components/counter";

async function Page(props) {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await res.json();

    return (
        <div>
            <h1>Cabins Page</h1>
            <ul>
                {data.map(user => <li key={user.id}>{user.name}</li>)}
            </ul>

            <Counter users={data}/>
        </div>
    );
}

export default Page;
