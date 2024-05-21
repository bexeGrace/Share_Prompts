"use client"

import { useState, useEffect } from 'react'

import PromptCard from './PromptCard'

const PromptCardList = ({ data, handleTagClick}) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((promp) => (
        <PromptCard 
          key={promp._id}
          post={promp}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}


const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [prompts, setPrompts] = useState([])

  const handleSearchChange = (e) => {
    setSearchText(e.value)
  }

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
      const response = await fetch('/api/prompt')
      const data = await response.json()

      setPrompts(data);
      } catch(error) {
        console.log("this is the error", error)
      }
    }

    fetchPrompts();
  }, [])
  return (
    <div>
      <section className='feed'>
        <form className='relative w-full flex-center'>
          <input 
            type="text"
            placeholder='Search for a tag or a username'
            value={searchText}
            onChange={handleSearchChange}
            required 
            className='search_input peer'
          />
        </form>

        <PromptCardList 
          data={prompts}
          handleTagClick= {() => {}}
        />
      </section>
    </div>
  )
}

export default Feed