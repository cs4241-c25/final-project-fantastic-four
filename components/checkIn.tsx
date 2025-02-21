import React, {useState} from 'react'

interface guestName{
    firstName: string; 
    LastName: string; 
}

const CheckIn: React.FC = () => {
    const [name, setName] = useState("")
    const [timeChecked, setTimeChecked] = useState<string |null>(null)

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) =>{
        const inputVal = e.target.value; 
        setName(inputVal)
        const now = new Date().toLocaleTimeString();
        setTimeChecked(now)
    } 

    return(
        <div>
            <input id='searchName' type='text' value='name' onChange={handleChange}  ></input>
        </div>
    )
}

export default CheckIn


