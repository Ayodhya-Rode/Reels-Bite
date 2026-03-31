import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'



const Profile = () => {
  const { id } = useParams()
  
  

  const [profileData, setProfileData] = useState(null)
  const [videos, setVideos] = useState([])
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/auth/food-partner/${id}`,{withCredentials: true})
        console.log(response.data);
        
        
        
        setProfileData(response.data)
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
            <img className="avatar" src="https://images.unsplash.com/photo-1615109398623-88346a601842?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Business logo" />
          </div>
          <div className="profile-info">
            <h2>{profileData?.foodPartner?.restaurantName || 'Business Name'}</h2>
            <p>{profileData?.foodPartner?.address || 'Address line 1, City'}</p>
          </div>
        </div>

        <div className="profile-stats">
         
            <div className="stat-item">
              <p className="stat-value">Total meals</p>
              <p className="stat-label">{profileData?.foodPartner?.foodItems?.length || '0'}</p>
            </div>
          <div className="stat-item">
              <p className="stat-value">Customer served</p>
              <p className="stat-label">{profileData?.foodPartner ?.totalCustomers || '0'}</p>
            </div>
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
