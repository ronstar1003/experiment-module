import React, { Fragment, useEffect, useRef, useState } from 'react'
import { FaLock, FaLockOpen } from 'react-icons/fa'
import IterationRow from './IterationRow'
import NewIterationRow from './NewIterationRow'

function ExperimentModule ({ id, imList, isLocked, isClosed, onRowClick, onAddIteration, onToggleLock, onReset }) {
  console.log(id)

  const defaultIsAddingIteration = !imList.length
  const [isAddingIteration, setIsAddingIteration] = useState(defaultIsAddingIteration)

  const newIterationInputRef = useRef()

  const handleAddIteration = () => {
    setIsAddingIteration(true)
  }
  const handleGenerateIteration = () => {
    const iterationTitle = `Iteration ${imList.length + 1}`
    if (onAddIteration(id, iterationTitle)) { setIsAddingIteration(false) }
  }
  const handleToggleLock = () => {
    onToggleLock(id)
  }
  const handleReset = () => {
    onReset(id)
  }
  const handleDone = () => {
    const iterationTitle = newIterationInputRef.current.value
    if (onAddIteration(id, iterationTitle)) { setIsAddingIteration(false) }
  }
  const handleCancel = () => {
    if (imList.length) { setIsAddingIteration(false) }
  }

  useEffect(() => {
    setIsAddingIteration(defaultIsAddingIteration)
  }, [isClosed, defaultIsAddingIteration])

  return (
    <div className={`experiment-module ${isClosed && 'closed'} ${imList.length === 0 && 'empty'} ${isLocked && 'locked'}`}>
      <div className='experiment-head' onClick={() => onRowClick(id)}>
        <div className='experiment-title'>Experiment Module</div>
        <div className='experiment-locked'>
          {isLocked ? <FaLock /> : <FaLockOpen />}
        </div>
      </div>
      <div className='experiment-body'>
        <div className='iteration-list'>
          {imList.map((im, i) => (
            <IterationRow
              key={im.title}
              index={i}
              title={im.title}
              selection={im.selection}
            />
          ))}
          {
            isAddingIteration && <NewIterationRow key='__new__' ref={newIterationInputRef} index={imList.length} />
          }
        </div>
        {
          isAddingIteration && (
            <p className='new-iteration-hint'>
              To add a new iteration, start typing a prompt or <a href='javascript:void(0)' onClick={handleGenerateIteration}>generate</a> one.
            </p>
          )
        }
      </div>
      <div className='experiment-footer'>
        {isAddingIteration
          ? (
            <>
              <button className='button' onClick={handleCancel}>cancel</button>
              <button className='button active' onClick={handleDone}>done</button>
            </>)
          : (
            <>
              <button className='button' onClick={handleToggleLock}>{isLocked ? 'unlock' : 'lock'}</button>
              <button className='button' onClick={handleReset}>reset</button>
              <button className='button active' onClick={handleAddIteration}>+ add iteration</button>
            </>)}
      </div>
    </div>
  )
}

const MemoizedExperimentModule = React.memo(ExperimentModule)

export default MemoizedExperimentModule
