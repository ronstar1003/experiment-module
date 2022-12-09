import React, { forwardRef, useEffect, useState } from 'react'
import { FaLock, FaLockOpen } from 'react-icons/fa'
import IterationModule from './IterationModule'
import NewIterationRow from './NewIterationRow'

const ExperimentModule = forwardRef(function ExperimentModule (
  {
    id, imList, isLocked, isClosed, onRowClick, onAddIteration, onToggleLock,
    onReset, onIterationSelectionChange, onIterationRemove
  }, ref) {
  const defaultIsAddingIteration = !imList.length
  const [isAddingIteration, setIsAddingIteration] =
    useState(defaultIsAddingIteration)
  const [openedImTitle, setOpenedImTitle] = useState('')

  const handleImRowClick = (imTitle) => {
    if (isLocked) return
    setOpenedImTitle(imTitle)
  }
  const handleRowClick = () => {
    if (isClosed) onRowClick(id)
    else onRowClick(-1)
  }
  const handleAddIteration = () => {
    setOpenedImTitle('')
    setIsAddingIteration(true)
  }
  const handleGenerateIteration = () => {
    const iterationTitle = `Iteration ${imList.length + 1}`
    if (onAddIteration(id, iterationTitle)) {
      setOpenedImTitle('')
      setIsAddingIteration(false)
    }
  }
  const handleToggleLock = () => {
    onToggleLock(id)
  }
  const handleReset = () => {
    onReset(id)
  }
  const handleDone = () => {
    const iterationTitle = ref.current.value
    if (onAddIteration(id, iterationTitle)) {
      setOpenedImTitle('')
      setIsAddingIteration(false)
    }
  }
  const handleCancel = () => {
    if (imList.length) { setIsAddingIteration(false) }
  }
  const handleIterationSelectionChange = (imTitle, selection) => {
    onIterationSelectionChange(id, imTitle, selection)
  }
  const handleIterationDone = () => {
    setOpenedImTitle('')
  }
  const handleIterationRemove = (imTitle) => {
    onIterationRemove(id, imTitle)
  }

  useEffect(() => {
    setIsAddingIteration(defaultIsAddingIteration)
  }, [isClosed, defaultIsAddingIteration])

  return (
    <div className={`experiment-module ${isClosed && 'closed'}
    ${imList.length === 0 && 'empty'} ${isLocked && 'locked'}`}
    >
      <div className='experiment-head' onClick={handleRowClick}>
        <div className='experiment-title'>Experiment Module</div>
        <div className='experiment-locked'>
          {isLocked ? <FaLock /> : <FaLockOpen />}
        </div>
      </div>
      <div className='experiment-body'>
        <div className='iteration-list'>
          {imList.map((im, i) => (
            <IterationModule
              key={im.title}
              index={i}
              title={im.title}
              selection={im.selection}
              isClosed={openedImTitle !== im.title}
              onRowClick={handleImRowClick}
              onSelectionChange={handleIterationSelectionChange}
              onDone={handleIterationDone}
              onRemove={handleIterationRemove}
            />
          ))}
          {
            isAddingIteration && (
              <NewIterationRow
                key='__new__' ref={ref}
                index={imList.length} onReturnKeyUp={handleDone}
              />)
          }
        </div>
        {
          isAddingIteration && (
            <p className='new-iteration-hint'>
              To add a new iteration, start typing a prompt or{' '}
              <a
                href='javascript:void(0)'
                onClick={handleGenerateIteration}>
                generate
              </a> one.
            </p>
          )
        }
      </div>
      <div className='experiment-footer'>
        {isAddingIteration
          ? (
            <>
              <button className='button' onClick={handleCancel}>
                cancel
              </button>
              <button className='button active' onClick={handleDone}>
                done
              </button>
            </>)
          : (
            <>
              <button className='button' onClick={handleToggleLock}>
                {isLocked ? 'unlock' : 'lock'}
              </button>
              {!isLocked && (
                <>
                  <button className='button' onClick={handleReset}>
                    reset
                  </button>
                  <button
                    className='button active'
                    onClick={handleAddIteration}
                  >
                    + add iteration
                  </button>
                </>
              )}
            </>)}
      </div>
    </div>
  )
})

const MemoizedExperimentModule = React.memo(ExperimentModule)

export default MemoizedExperimentModule
