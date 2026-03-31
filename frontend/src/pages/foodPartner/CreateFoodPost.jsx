import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import '../../styles/theme.css'
import './CreateFoodPost.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const CreateFoodPost = () => {
  const navigate = useNavigate()  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()


  const selectedVideo = watch('video')
  const selectedFileName = selectedVideo?.[0]?.name || ''

  const onSubmit = async() => {
    const formData = new FormData()
    formData.append('video', selectedVideo[0])
    formData.append('name', watch('name'))
    formData.append('description', watch('description'))

    try {
     const response = await axios.post("http://localhost:3000/api/food/create-food", formData,{withCredentials: true})
     console.log(response.data);
     navigate('/feed') // Redirect to feed or appropriate page after successful submission
     
     toast.success('Video details saved successfully!')
    } catch (error) {
      toast.error('Failed to save video details.', { description: error.response?.data?.message || error.message })
    }
    // TODO: wire this submit to upload endpoint or state management
  }

  const onError = () => {
    toast.error('Please fix the highlighted fields and try again.')
  }

  return (
    <div className="create-food-post-page">
      <div className="create-food-post-card">
        <header className="create-food-post-header">
          <p className="eyebrow">Food Partner Reel</p>
          <h1>Create New Video Post</h1>
          <p className="subtitle">
            Upload your reel, add a name and description, then submit to share your food story.
          </p>
        </header>

        <form className="create-food-post-form" onSubmit={handleSubmit(onSubmit, onError)} noValidate>
          <div className="form-group">
            <label htmlFor="videoFile">Upload Video</label>
            <div className={`file-upload ${errors.video ? 'file-upload-error' : ''}`}>
              <input
                id="videoFile"
                name="video"
                type="file"
                accept="video/*"
                {...register('video', {
                  required: 'Please upload a video.',
                })}
              />
              <label htmlFor="videoFile" className="file-upload-button">
                <span className="file-upload-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3v12" />
                    <path d="M8 11l4 4 4-4" />
                    <path d="M5 19h14" />
                  </svg>
                </span>
                <span className="file-upload-text">
                  {selectedFileName || 'Choose a reel or video'}
                </span>
                <span className="file-upload-action">Browse</span>
              </label>
            </div>
            {errors.video && (
              <span className="error-message">{errors.video.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="videoName">Video Name</label>
            <input
              id="videoName"
              name="name"
              type="text"
              placeholder="Enter a memorable title"
              {...register('name', {
                required: 'Video name is required.',
              })}
            />
            {errors.name && (
              <span className="error-message">{errors.name.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Describe the video and highlight the food experience"
              {...register('description', {
                required: 'Description is required.',
              })}
            />
            {errors.description && (
              <span className="error-message">{errors.description.message}</span>
            )}
          </div>

          <button type="submit" className="submit-button">
            Create Food Post
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateFoodPost
