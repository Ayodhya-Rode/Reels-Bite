import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'



const Profile = () => {
  const { id } = useParams()
   const [profileData, setProfileData] = useState(null)
  const [videos, setVideos] = useState([])
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/auth/food-partner/${id}`,{withCredentials: true})
                        
        setProfileData(response.data.foodPartner)
        setVideos(response.data?.foodPartner?.foodItems || [])
      } catch (error) {
        console.error('Error fetching profile data:', error)
      }
    }

    if (id) {
      fetchProfileData()
    }
  }, [id])

  return (
    <div className="profile-page">
      <section className="profile-card">
        <div className="profile-card-top">
          <div  aria-label="Business logo placeholder" >
            <img className="avatar" src={profileData?.avatar} alt="Business logo" />
          </div>
          <div className="profile-info">
            <h2>{profileData?.restaurantName || 'Business Name'}</h2>
            <p>{profileData?.address || 'Address line 1, City'}</p>
          </div>
        </div>

        <div className="profile-stats">
         
            <div className="stat-item">
              <p className="stat-value">Total meals</p>
              <p className="stat-label">{profileData?.foodItems?.length || '0'}</p>
            </div>
          <div className="stat-item">
              <p className="stat-value">Customer served</p>
              <p className="stat-label">{profileData?.totalCustomers || '0'}</p>
            </div>
        </div>
        <div className="stat-item">
            <p>
              <Link
                to="/create-food-post"
                style={{ textDecoration: "none", color: "inherit" }}
              >
              Create Post
            </Link>
          </p>
</div>
      
      </section>

      <section className="video-grid" aria-label="Video items grid">
        {videos.map((item) => (
          <article key={item._id} className="video-card">
            
            <video  src={item.video} autoPlay loop muted preload="metadata" aria-label={`Video post: ${item.name}`}
            style={{objectFit: "contain", width:"100%", height:"100%"}} />
          </article>
        ))}
      </section>
    </div>
  )
}

export default Profile
