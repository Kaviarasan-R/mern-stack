import {useEffect, useState} from "react";

const UseEffectExample = () => {
    const [show, setShow] = useState(false);
    const [data, setData] = useState(null);

    useEffect(() => {
        console.log("Component did mount");

        return () => {
            console.log("Component will unmount 1");
        }
    }, [])

    useEffect(() => {
        console.log("Component did update");

        async function fetchUsers() {
            const data = await fetch("https://jsonplaceholder.typicode.com/users")
            const response = await data.json()
            setData(response)
        }

        if(show) fetchUsers()

        // return () => {
        //     console.log("Component will unmount 2");
        // }
    }, [show])

    return <>
        <button onClick={() => setShow(!show)}>Toggle Show</button>
        <section>
            {
                data?.map((item, index) => {
                    return  (
                        <div key={index}>
                            <div style={{ marginTop: "10px", padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}>
                                <p>User ID: <strong>{item.id}</strong></p>
                                <p>User Name: <strong>{item.name}</strong></p>
                            </div>
                        </div>
                    )
                })
            }
        </section>
    </>
}

export default UseEffectExample