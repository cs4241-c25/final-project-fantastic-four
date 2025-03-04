import { Image } from "react-bootstrap"

export default function Footer() {
    return (
        <footer className="footer text-center">
            <div className="d-flex flex-column align-items-center">
                <Image src="/crossncrescent.png" alt="Cross and Crescent" width={80} height={80}/>
                <p className="mt-2 small">𝞹 1989, 𝞹 1996, 𝞹 2005</p>
            </div>
        </footer>
    )
}