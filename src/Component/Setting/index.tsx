import React from "react"

type Tpost={
    name:string[],
}
const Setting = ({name}: Tpost) => {

    const btnValue = (user: string) =>{
        alert(user)
    }
    return(
        <>
        {name.map((data: string)=> <button style={{cursor: "pointer"}} onClick={()=>btnValue(data)}>{data}</button>) }
        </>
    )
}

export default Setting