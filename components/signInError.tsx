import { useSearchParams } from "next/navigation"
import React from "react"

export const SignInError = () => {
    const [err, setErr] = React.useState('')
    const searchParams = useSearchParams()

    React.useEffect(() => {
        const error = searchParams.get('error')
        if(error == 'CredentialsSignin'){
            setErr('Invalid Credentials!')
        }
    }, [searchParams])

    return (
        <div className='text-warning'>
            {err}
        </div>
    )
}