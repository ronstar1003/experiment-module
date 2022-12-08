import React, { useState } from 'react'
import ExperimentModule from './ExperimentModule'

export default function ExperimentModulePanel () {
  const [emList, setEmList] = useState([
    {
      id: 1,
      imList: [{
        title: 'Iteration 1',
        selection: 'short'
      }, {
        title: 'Iteration 2',
        selection: 'medium length'
      }],
      isLocked: false
    },
    {
      id: 2,
      imList: [{
        title: 'Iteration 1',
        selection: 'short'
      }, {
        title: 'Iteration 2',
        selection: 'medium length'
      }],
      isLocked: true
    }
  ])

  const [openedEmId, setOpenedEmId] = useState(1)

  return (
    <div className='experiment-module-panel'>
      {emList.map((em, i) => (
        <ExperimentModule
          key={em.id}
          imList={em.imList}
          isLocked={em.isLocked}
          isClosed={em.id !== openedEmId}
        />
      ))}
    </div>
  )
}
