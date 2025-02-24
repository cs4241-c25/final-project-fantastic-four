/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState} from 'react'

interface guestName{
    firstName: string; 
    lastName: string; 
}

const CheckIn: React.FC = () => {
    const [name, setName] = useState<guestName>({firstName: "", lastName: ""})
    const [nameExists, setNameExists] = useState<boolean | null>(null)
    const [timeChecked, setTimeChecked] = useState("")

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) =>{
        const fullName = e.target.value.trim().split(" ")
        const firstName = fullName[0] || ""
        const lastName = fullName.length > 1? fullName.slice(1).join(" ") : ""
        setName({ firstName, lastName})
        const now = new Date().toLocaleTimeString();
        setTimeChecked(now)

        if(firstName && lastName){
            checkName(firstName, lastName)

        } else{
            setNameExists(null)
        }
    } 

    const checkName = async(firstName: string, lastName: string) =>{
        try{
            const response = await fetch("")
            const data = await response.json(); 
            setNameExists(data.exists)

        } catch (error) {
            console.error("error checking name", error)
            setNameExists(null)
        }
    }

    

    return(
        <div>
            <input id='searchName' type='text' value={`${name.firstName} ${name.lastName}`.trim()} onChange={handleChange}  ></input>
        </div>
    )
}

export default CheckIn


