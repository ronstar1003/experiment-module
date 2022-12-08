import React, { forwardRef } from 'react'

const NewIterationRow = forwardRef(({ index, title, selection }, ref) => {
  return (
    <div className='iteration-row'>
      <div className='iteration-no'>EM-{index + 1}</div>
      <input className='iteration-input' ref={ref} type='text' placeholder='Adding iteration...' />
    </div>
  )
})

export default NewIterationRow
