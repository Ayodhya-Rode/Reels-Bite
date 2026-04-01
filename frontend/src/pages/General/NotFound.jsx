import { Link } from 'react-router-dom'
import "../../styles/notFound.css"

const NotFound = () => {
  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>
          The page you're looking for doesn’t exist or has been moved.
        </p>

        <Link to="/" className="notfound-btn">
          Go to Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound