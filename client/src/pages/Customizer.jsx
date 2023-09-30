import React,{useState, useEffect} from 'react'
import {AnimatePresence, motion} from 'framer-motion'
import {useSnapshot} from 'valtio'

import config from '../config/config'
import state from '../store'
import {download} from '../assets'
import {downloadCanvasToImage, reader} from '../config/helpers'
import {EditorTabs, FilterTabs, DecalTypes} from '../config/constants'
import {fadeAnimation, slideAnimation} from '../config/motion'

import { AIPicker, ColorPicker, FilePicker, Tab, CustomButton } from '../components'

const Customizer = () => {
  const snap = useSnapshot(state);

  const [file, setFile] = useState('');//to check if a file is uploaded ot not
  const [prompt, setPrompt] = useState('');
  //to check if we are generating image through AI or not
  const [generatingImg, setGeneratingImg] = useState(false);

  //2 states to check which FilterTab is active and which EditorTab is active
  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    //to toggle btw logoShirt and stylishShirt on click of FilterTab buttons
    logoShirt: true,
    stylishShirt: false,
  })

  //show tab content based on the activeTab
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker/>
      case "filepicker":
        return <FilePicker
          file={file}
          setFile={setFile}
          readFile={readFile}
        />
      case "aipicker":
        return <AIPicker
          prompt={prompt}
          setPrompt={setPrompt}
          generatingImg={generatingImg}
          handleSubmit={handleSubmit}
        />
      default:
        return null;
    }
  }  

  const handleSubmit = async (type) => {
    if(!prompt)
      return alert('Please enter a prompt!')

      try {
        //calling our backend to generate an AI image
        setGeneratingImg(true);//start loading
        
        //initially
        // const response = await fetch('http://localhost:8080/api/v1/dalle', {

        //after deployment
        const response = await fetch
        ('https://threejs-ai-nmzc.onrender.com//api/v1/dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            prompt,
          })
        })

        const data = await response.json();

        //that's how we can render base64 string
        handleDecals(type, `data:image/png;base64,${data.photo}`)

      } catch (error) {
        alert(error)
      }
      finally{
        setGeneratingImg(false)
        setActiveEditorTab("")
      }
  }

  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];
    //logo or full design stateProperty(image) will be replaced by result
    state[decalType.stateProperty] = result; 

    if(!activeFilterTab[decalType.filterTab]){
      handleActiveFilterTab(decalType.filterTab);
    }
  }

  //to toggle logoTexture or stylishTexture or both, on or off
  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName]
        break;
      
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName]
        break;
    
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
    }
    //after setting the state, activeFilterTab is updated
    //now we will set setActiveFilterTab's value to toggle filter on and off
    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName]
      }
    })
  }

  const readFile = (type) => {
    reader(file)
      .then((result) => {
        handleDecals(type, result);
        setActiveEditorTab("");
      })
  }

  return (
    <AnimatePresence>
    {/* if not at home page then show the following */}
      {!snap.intro && (
        <>
          <motion.div
            key="custom" className='absolute top-0 left-0 z-10'
            {...slideAnimation('left')}
          >
            <div className='flex items-center min-h-screen'>
              <div className='tabs editortabs-container'>
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => setActiveEditorTab(tab.name)}
                  />
                ))}

                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          <motion.div
            className='absolute z-10 top-5 right-5' {...fadeAnimation}
          >
            <CustomButton
              type="filled" title="Go Back"
              handleClick={() => state.intro = true}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>

          <motion.div
            className="filtertabs-container" {...slideAnimation('up')}
          > 
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={() => handleActiveFilterTab(tab.name)}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Customizer