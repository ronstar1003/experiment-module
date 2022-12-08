import React from 'react'

export default function NewIterationRow ({ index, title, selection }) {
  return (
    <div className='iteration-row'>
      <div className='iteration-no'>EM-{index + 1}</div>
      <input className='iteration-input' type='text' placeholder='Adding iteration...' />
    </div>
  )
}
