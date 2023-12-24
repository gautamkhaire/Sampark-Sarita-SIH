import React, { useState, useEffect } from 'react'

const SpeechToText = ({textTranscript}) => {
  const [recognition, setRecognition] = useState(null)
  const [listening, setListening] = useState(false)
  const [interimTranscript, setInterimTranscript] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('en-US') // Default language is English

  useEffect(() => {
    const initRecognition = () => {
      const recognitionInstance = new window.webkitSpeechRecognition()
      recognitionInstance.continuous = true
      recognitionInstance.interimResults = true
      recognitionInstance.lang = selectedLanguage

      recognitionInstance.onresult = event => {
        let interim = ''

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          interim += event.results[i][0].transcript
          setInterimTranscript(interim)
        }
      }

      setRecognition(recognitionInstance)
    }

    if ('webkitSpeechRecognition' in window) {
      initRecognition()
    } else {
      console.error('Speech recognition not supported in this browser.')
    }
  }, [selectedLanguage])

  const toggle = () => {
    if (listening) {
      recognition.stop()
      setListening(false)
    } else {
      recognition.start()
      setListening(true)
    }
  }

  const startListening = () => {
    recognition.start()
    setListening(true)
  }

  const stopListening = () => {
    recognition.stop()
    setListening(false)
    textTranscript(interimTranscript);
    console.log("Stop",interimTranscript,textTranscript)
  }

  const reset = () => {
    recognition.stop()
    setInterimTranscript('')
    setListening(false)
  }

  const handleLanguageChange = event => {
    const newLanguage = event.target.value
    setSelectedLanguage(newLanguage)
  }

  return (
    <div className='w-full mx-auto p-4 border-2 border-blue-500 rounded-lg text-center'>
      <p>{interimTranscript}</p>
      <p className='text-sm mt-8 mb-2 text-gray-600'>
        Microphone: {listening ? 'on' : 'off'}
      </p>
      <div className='flex justify-center space-x-4'>
        <select
          className='px-4 py-2 text-white bg-blue-500 rounded-xl cursor-pointer'
          value={selectedLanguage}
          onChange={handleLanguageChange}
        >
          <option value='en-US'>English</option>
          <option value='hi-IN'>Hindi</option>
        </select>
        <button
          className='px-4 py-2 text-white bg-blue-500 rounded-xl cursor-pointer'
          onClick={startListening}
          disabled={listening}
        >
          {'Start'}
        </button>
        <button
          className='px-4 py-2 text-white bg-blue-500 rounded-xl cursor-pointer'
          onClick={stopListening}
          disabled={!listening}
        >
          {'Stop'}
        </button>
        <button
          className='px-4 py-2 text-white bg-blue-500 rounded-xl cursor-pointer'
          onClick={reset}
        >
          Reset
        </button>
      </div>
    </div>
  )
}

export default SpeechToText