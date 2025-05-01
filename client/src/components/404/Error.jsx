import './style.css'
import { Link } from "react-router-dom"

const Error = () => {
    return (
        <div className='all center'>

            <div className="er">
                <h1 className="h1">404</h1>
                <h1 className='h2'>Ошибочка......</h1>
                <Link  to={'/'}>
                    <h3 className='h3'>На главную</h3>
                </Link>
            </div>
        </div>
    )
}

export default Error;