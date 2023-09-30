import React from 'react'
import CustomButton from './CustomButton'

const AIPicker = ({prompt, setPrompt, generatingImg, handleSubmit}) => {
  return (
    <div className='aipicker-container'>
      <textarea 
        rows={5}
        placeholder='Ask AI...'
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className='aipicker-textarea'
      />
        <div className='flex flex-wrap gap-3'>
          {/* if generatingImg is true, this button will function like a 
          loading button */}
          {generatingImg ? (
            <CustomButton
              type="outline"
              title="Generating image..."
              customStyles="text-xs"
            />
          ):(
            <>
              <CustomButton
                type="outline"
                title="AI Logo"
                handleClick={() => handleSubmit('logo')}
                customStyles="text-xs"
              />
              <CustomButton
                type="filled"
                title="AI Full"
                handleClick={() => handleSubmit('full')}
                customStyles="text-xs"
              />
            </>
          )}
        </div>
    </div>
  )
}

export default AIPicker