import React from 'react'

const selectionTagValues = ['short', 'medium length', 'very very very very long (up to 35 char)']

function SelectionTag ({ value, onClick, active = false }) {
  const handleClick = () => {
    onClick(value)
  }

  return <div className={`iteration-selection-tag ${active && 'active'}`} onClick={handleClick}>{value}</div>
}

export default function IterationModule ({ index, title, selection, isClosed, onRowClick, onSelectionChange, onDone }) {
  const handleRowClick = () => {
    if (isClosed) onRowClick(title)
  }
  const handleTagClick = (tagValue) => {
    if (tagValue === selection) onSelectionChange(title, '')
    else onSelectionChange(title, tagValue)
  }
  const handleDone = () => {
    onDone()
  }

  return (
    <div className='iteration-module' onClick={handleRowClick}>
      <div className='iteration-no'>EM-{index + 1}</div>
      <div className='iteration-info'>
        <div className='iteration-head'>
          <div className='iteration-title'>{title}</div>
          {isClosed && <div className={`iteration-selection ${selection && 'active'}`} title={selection}>{selection.slice(0, 20)}{selection.length > 20 && '...'}</div>}
        </div>
        {!isClosed && (
          <>
            <div className='iteration-body'>
              {selectionTagValues.map(value => <SelectionTag key={value} value={value} active={selection === value} onClick={handleTagClick} />)}
            </div>
            <div className='iteration-footer'>
              <button className='button'>remove</button>
              <button className='button active' onClick={handleDone}>done</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
