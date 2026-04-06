import './App.css'
import { useState } from 'react'
import { Column } from './Column'
import { cards as initialCards } from './data'
import { DragDropContext, type DropResult } from '@hello-pangea/dnd'
import type { CardProps } from './types'

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

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <section className="columns">
        <Column
          name="New"
          cards={getCardsByColumn('New')}
          count={getCardsByColumn('New').length}
        />
        <Column
          name="Screening"
          cards={getCardsByColumn('Screening')}
          count={getCardsByColumn('Screening').length}
        />
        <Column
          name="Interview"
          cards={getCardsByColumn('Interview')}
          count={getCardsByColumn('Interview').length}
        />
        <Column
          name="Offer"
          cards={getCardsByColumn('Offer')}
          count={getCardsByColumn('Offer').length}
        />
        <Column
          name="Hired"
          cards={getCardsByColumn('Hired')}
          count={getCardsByColumn('Hired').length}
        />
      </section>
    </DragDropContext>
  )
}

export default App