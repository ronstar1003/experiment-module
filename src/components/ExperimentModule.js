import React, { Fragment, useState } from 'react'
import { FaLock, FaLockOpen } from 'react-icons/fa'
import IterationRow from './IterationRow'
import NewIterationRow from './NewIterationRow'

export default function ExperimentModule ({ id, imList, isLocked, isClosed, onRowClick }) {
  const [isAddingIteration, setIsAddingIteration] = useState(!imList.length)

  const handleAddIteration = () => {
    setIsAddingIteration(true)
  }
  const handleCancel = () => {
    if (imList.length) { setIsAddingIteration(false) }
  }
  const handleGenerateIteration = () => {

  }

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
            isAddingIteration && <NewIterationRow key='__new__' index={imList.length} />
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
              <button className='button active'>done</button>
            </>)
          : (
            <>
              <button className='button'>lock</button>
              <button className='button'>reset</button>
              <button className='button active' onClick={handleAddIteration}>+ add iteration</button>
            </>)}
      </div>
    </div>
  )
}
