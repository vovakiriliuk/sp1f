import { useState } from 'react'
import { Column } from './components/Column'
import { cards as initialCards } from './db/data'
import { DragDropContext, type DropResult } from '@hello-pangea/dnd'
import type { CardProps } from './types'
import { Flex } from '@mantine/core'
import '@mantine/core/styles.css'

function App() {
  const [cards, setCards] = useState<CardProps[]>(initialCards)

  const getCardsByColumn = (column: string) =>
    cards.filter(card => card.column === column)

  const onDragEnd = (result: DropResult) => {
  const { destination, source } = result

  if (!destination) return

  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ) return

  const sourceCards = cards.filter(c => c.column === source.droppableId)
  const movingCard = sourceCards[source.index]
  if (!movingCard) return

  let newCards = cards.filter(c => c.id !== movingCard.id)

  const updatedCard = {
    ...movingCard,
    column: destination.droppableId,
  }

  const destinationCards = newCards.filter(c => c.column === destination.droppableId)

  const before = destinationCards.slice(0, destination.index)
  const after = destinationCards.slice(destination.index)

  const newDestinationCards = [...before, updatedCard, ...after]

  newCards = [
    ...newCards.filter(c => c.column !== destination.droppableId),
    ...newDestinationCards,
  ]

  setCards(newCards)
}
  const names = ['New','Screening','Interview','Offer','Hired']

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Flex
        justify='center'
        gap="xl"
        p={'20px'}
      >
        {names.map((name,index) => (
            <Column 
            key={index}
            name={name}
            cards={getCardsByColumn(name)}
            count={getCardsByColumn(name).length}
            />
        ))   
        } 
      </Flex>
    </DragDropContext>
  )
}

export default App