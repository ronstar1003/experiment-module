import React, { forwardRef } from 'react'

const NewIterationRow = forwardRef(({ index, onReturnKeyUp }, ref) => {
  const handleKeyUp = e => {
    if (e.keyCode !== 13) return
    onReturnKeyUp()
  }

  return (
    <div className='new-iteration-row'>
      <div className='iteration-no'>EM-{index + 1}</div>
      <input className='iteration-input' ref={ref} type='text' placeholder='Adding iteration...' onKeyUp={handleKeyUp} />
    </div>
  )
})

export default NewIterationRow
