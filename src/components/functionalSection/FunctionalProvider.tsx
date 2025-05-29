import {createContext, useContext, useState} from 'react'

const FunctionalContext = createContext({})

export const FunctionalProvider = ({items, children}) => {
  const [currentItem, setCurrentItem] = useState(items[0])
  const [currentListItemId, setCurrentListItemId] = useState(currentItem.list[0].id)

  const listItem = currentItem.list.find(i => i.id === currentListItemId)

  const handleNext = () => {
    setCurrentListItemId(prevId => prevId + 1)
  }

  const handlePrev = () => {
    setCurrentListItemId(prevId => prevId - 1)
  }

  const handleItem = (item) => {
    setCurrentItem(item)
    setCurrentListItemId(item.list[0].id)
  }

  const hasPrev = currentItem.list[0].id === currentListItemId
  const hasNext = currentItem.list[currentItem.list.length - 1].id === currentListItemId

  return (
    <FunctionalContext.Provider
      value={{items,
        item: currentItem,
        listItem,
        handleNext,
        handlePrev,
        handleItem,
        hasPrev,
        hasNext
    }}>
      {children}
    </FunctionalContext.Provider>
  )
}

export const useFunctional = () => useContext(FunctionalContext)
