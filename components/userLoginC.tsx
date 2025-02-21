import React, {useState} from 'react'

interface LoginForm{
    email: string; 
    password: string; 
}

const Login: React.FC = () => {
    const [formData, setFormData] = useState<LoginForm>({ email: "", password: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    return(
        <div>
            <form>
                <input type='email'placeholder='email'value={formData.email} onChange={handleChange}></input>
                <input type='password' placeholder='password' value={formData.password} onChange={handleChange}></input>
                <button type='submit'> Login</button>
            </form>
        </div>
    )
}; 
    
export default Login



