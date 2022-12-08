import React from 'react'
import { FaLock, FaLockOpen } from 'react-icons/fa'
import IterationRow from './IterationRow'

export default function ExperimentModule ({ imList, isLocked, isClosed }) {
  return (
    <div className={`experiment-module ${isClosed && 'closed'}`}>
      <div className='experiment-head'>
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
        </div>
      </div>
      <div className='experiment-footer'>
        <button className='button'>lock</button>
        <button className='button'>reset</button>
        <button className='button active'>+ add iteration</button>
      </div>
    </div>
  )
}
