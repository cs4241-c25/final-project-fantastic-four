import { useSearchParams } from "next/navigation"
import React, { Suspense } from "react"

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
        <Suspense>
            <div className='text-warning'>
                {err}
            </div>
        </Suspense>
    )
}