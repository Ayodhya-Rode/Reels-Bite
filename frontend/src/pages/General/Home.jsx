import '../../styles/home.css'
import '../../styles/actionButtons.css'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Home = () => {
  const [videos, setVideos] = useState([])
  const [expandedDescription, setExpandedDescription] = useState({})
  const [processingLike, setProcessingLike] = useState({})
  const [processingSave, setProcessingSave] = useState({})
  const videoRefs = useRef({})

  // 🔹 FETCH
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/food', {
          withCredentials: true,
        })

        const normalizedVideos = (res.data.foodItems || []).map((video) => ({
          ...video,
          likes: video.likeCount || 0,
          saves: video.saveCount || 0,
          isLiked: Boolean(video.isLiked),
          isSaved: Boolean(video.isSaved),
          shares: video.shares || 0,
        }))

        setVideos(normalizedVideos)
      } catch (err) {
        console.error('Error fetching videos:', err)
      }
    }

    fetchVideos()
  }, [])

  // 🔹 VIDEO AUTOPLAY
  useEffect(() => {
    if (!videos.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const videoEl = entry.target.querySelector('video')
          if (!videoEl) return

          if (entry.isIntersecting && entry.intersectionRatio >= 0.75) {
            videoEl.play().catch(() => {})
          } else {
            videoEl.pause()
          }
        })
      },
      { threshold: [0.75] }
    )

    const slides = document.querySelectorAll('.video-slide')
    slides.forEach((slide) => observer.observe(slide))

    return () => {
      slides.forEach((slide) => observer.unobserve(slide))
      observer.disconnect()
    }
  }, [videos])

  // 🔹 HELPERS
  const toggleDescription = (id) => {
    setExpandedDescription((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const updateVideo = (id, updater) => {
    setVideos((prev) =>
      prev.map((video) =>
        video._id === id ? updater(video) : video
      )
    )
  }

  // 🔥 LIKE (SERVER IS TRUTH)
  const handleLike = async (id) => {
    if (processingLike[id]) return

    setProcessingLike(prev => ({ ...prev, [id]: true }))

    try {
      const res = await axios.post(
        'http://localhost:3000/api/food/like',
        { foodId: id },
        { withCredentials: true }
      )

      const data = res.data

      if (data.success) {
        updateVideo(id, (item) => ({
          ...item,
          isLiked: data.isLiked,
          likes: data.likeCount
        }))
      }

    } catch (err) {
      console.error('Error toggling like:', err)
    } finally {
      setProcessingLike(prev => ({ ...prev, [id]: false }))
    }
  }

  // 🔥 SAVE (SERVER IS TRUTH)
  const handleSave = async (id) => {
    if (processingSave[id]) return

    setProcessingSave(prev => ({ ...prev, [id]: true }))

    try {
      const res = await axios.post(
        'http://localhost:3000/api/food/save',
        { foodId: id },
        { withCredentials: true }
      )

      const data = res.data

      if (data.success) {
        updateVideo(id, (item) => ({
          ...item,
          isSaved: data.isSaved,
          saves: data.saveCount   // ✅ FIXED
        }))
      }

    } catch (err) {
      console.error('Error saving:', err)
    } finally {
      setProcessingSave(prev => ({ ...prev, [id]: false }))
    }
  }

  const handleAction = (action, id) => {
    if (action === 'like') return handleLike(id)
    if (action === 'save') return handleSave(id)
  }

  return (
    <div className="home-container">
      <div className="videos-container">
        {videos.map((video, index) => (
          <div className="video-slide" key={video._id}>
            <div className="video-background">

              {/* VIDEO */}
              <div className="video-frame">
                <video
                  ref={(el) => {
                    if (el) videoRefs.current[video._id] = el
                  }}
                  className="video-content"
                  src={video.video}
                  playsInline
                  muted
                  autoPlay={index === 0}
                  loop
                />
              </div>

              {/* ACTION BAR */}
              <div className="action-bar">

                {/* LIKE */}
                <div className="action-item">
                  <button
                    className={`action-btn${video.isLiked ? ' liked' : ''}`}
                    onClick={() => handleAction('like', video._id)}
                    disabled={processingLike[video._id]}
                  >
                    <svg className="action-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.77 3 16.5 3c3.08 0 5.5 2.42 5.5 5.5 0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </button>
                  <span className="action-count">{video.likes}</span>
                </div>

            
                {/* SHARE */}
                <div className="action-item">
                  <button className="action-btn">
                    <svg className="action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 12h14" />
                      <path d="M14 6l6 6-6 6" />
                    </svg>
                  </button>
                  <span className="action-count">{video.shares}</span>
                </div>

                {/* SAVE */}
                <div className="action-item">
                  <button
                    className={`action-btn${video.isSaved ? ' saved' : ''}`}
                    onClick={() => handleAction('save', video._id)}
                    disabled={processingSave[video._id]}
                  >
                    <svg
                      className="action-icon"
                      viewBox="0 0 24 24"
                      fill={video.isSaved ? 'currentColor' : 'none'}
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M17 3H7C5.9 3 5 3.9 5 5v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
                    </svg>
                  </button>
                  <span className="action-count">{video.saves}</span>
                </div>

              </div>

              {/* INFO */}
              <div className="video-overlay">
                <div className="video-info">
                  <h3>{video.name || 'Untitled'}</h3>

                  <p
                    className={`video-description ${
                      expandedDescription[video._id] ? 'expanded' : 'collapsed'
                    }`}
                    onClick={() => toggleDescription(video._id)}
                  >
                    {video.description || 'No description'}
                  </p>

                  <Link
                    className="visit-store-btn"
                    to={`/food-partner/${video.foodPartner}`}
                  >
                    Visit Store
                  </Link>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home