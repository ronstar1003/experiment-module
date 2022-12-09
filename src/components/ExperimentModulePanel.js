import React, { useCallback, useState, useEffect, createRef } from 'react'
import ExperimentModule from './ExperimentModule'

const defaultEmList = [
  {
    id: 1,
    imList: [{
      title: 'Iteration 1',
      selection: ''
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
  },
  {
    id: 3,
    imList: [],
    isLocked: false
  },
  {
    id: 4,
    imList: [],
    isLocked: false
  },
  {
    id: 5,
    imList: [],
    isLocked: false
  }
]

export default function ExperimentModulePanel () {
  const [emList, setEmList] = useState(defaultEmList)

  const [openedEmId, setOpenedEmId] = useState(1)

  const [refMap, setRefMap] = useState(
    defaultEmList.reduce((obj, em) => ({ ...obj, [em.id]: createRef() }), {})
  )

  useEffect(() => {
    setRefMap((refMap) => {
      return emList.reduce((obj, em) => (
        { ...obj, [em.id]: refMap[em.id] || createRef() }
      ), {})
    })
  }, [emList])

  const handleEMClick = useCallback((emId) => {
    setOpenedEmId(emId)
  }, [])

  const handleAddIteration = useCallback((emId, iterationTitle) => {
    if (iterationTitle === '') return false
    setEmList((emList) => emList.map(em => {
      if (emId !== em.id) return em
      if (em.imList.findIndex(im => im.title === iterationTitle) !== -1) {
        return em
      }
      return {
        ...em,
        imList: [
          ...em.imList,
          {
            title: iterationTitle,
            selection: ''
          }
        ]
      }
    }))
    return true
  }, [])

  const handleToggleLock = useCallback((emId) => {
    setEmList((emList) => emList.map(em => {
      if (emId !== em.id) return em
      return {
        ...em,
        isLocked: !em.isLocked
      }
    }))
    return true
  }, [])

  const handleReset = useCallback((emId) => {
    setEmList((emList) => emList.map(em => {
      if (emId !== em.id) return em
      return {
        ...em,
        imList: []
      }
    }))
    return true
  }, [])

  const handleIterationSelectionChange = useCallback(
    (emId, imTitle, selection) => {
      setEmList(emList => emList.map(em => {
        if (emId !== em.id) return em
        return {
          ...em,
          imList: em.imList.map(im => {
            if (im.title !== imTitle) return im
            return {
              ...im,
              selection
            }
          })
        }
      }))
      return true
    }, [])

  const handleIterationRemove = useCallback((emId, imTitle) => {
    setEmList(emList => emList.map(em => {
      if (emId !== em.id) return em
      return {
        ...em,
        imList: em.imList.filter(im => im.title !== imTitle)
      }
    }))
    return true
  }, [])

  useEffect(() => {
    const handleKeyup = e => {
      if (e.keyCode >= 65 && e.keyCode <= 90) {
        if (openedEmId === -1) return
        if (document.activeElement === refMap[openedEmId].current) return
        refMap[openedEmId].current.focus()
        refMap[openedEmId].current.value += e.key
      }
    }
    document.addEventListener('keyup', handleKeyup)

    return () => {
      document.removeEventListener('keyup', handleKeyup)
    }
  }, [openedEmId, refMap])

  return (
    <div className='experiment-module-panel'>
      {emList.map((em, i) => (
        <ExperimentModule
          key={em.id}
          id={em.id}
          imList={em.imList}
          isLocked={em.isLocked}
          isClosed={em.id !== openedEmId}
          onRowClick={handleEMClick}
          onAddIteration={handleAddIteration}
          onToggleLock={handleToggleLock}
          onReset={handleReset}
          onIterationSelectionChange={handleIterationSelectionChange}
          onIterationRemove={handleIterationRemove}
          ref={refMap[em.id]}
        />
      ))}
    </div>
  )
}
