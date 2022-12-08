import React from 'react'

export default function IterationRow ({ index, title, selection }) {
  return (
    <div className='iteration-row'>
      <div className='iteration-no'>EM-{index}</div>
      <div className='iteration-title'>{title}</div>
      <div className={`iteration-selection ${selection && 'active'}`}>{selection}</div>
    </div>
  )
}
