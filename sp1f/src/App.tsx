import './App.css'
import { useState } from 'react'
import { Column } from './Column'
import { cards as initialCards } from './data'
import { DragDropContext, type DropResult } from '@hello-pangea/dnd'
import type { CardProps } from './types'

function App() {
  const [cards, setCards] = useState<CardProps[]>(initialCards)

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result

    if (!destination) return
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return

    const sourceCards = cards.filter(card => card.column === source.droppableId)
    const destinationCards = cards.filter(card => card.column === destination.droppableId)
    const movingCard = sourceCards[source.index]
    if (!movingCard) return

    const updatedCard: CardProps = {
      ...movingCard,
      column: destination.droppableId,
    }

    if (source.droppableId === destination.droppableId) {
      const reordered = Array.from(sourceCards)
      const [removed] = reordered.splice(source.index, 1)
      reordered.splice(destination.index, 0, removed)

      setCards(cards.map(card => {
        if (card.column !== source.droppableId) return card
        return reordered.shift() ?? card
      }))
      return
    }

    const newSourceCards = Array.from(sourceCards)
    newSourceCards.splice(source.index, 1)

    const newDestinationCards = Array.from(destinationCards)
    newDestinationCards.splice(destination.index, 0, updatedCard)

    setCards(cards.map(card => {
      if (card.id === movingCard.id) return updatedCard
      if (card.column === source.droppableId) return newSourceCards.shift() ?? card
      if (card.column === destination.droppableId) return newDestinationCards.shift() ?? card
      return card
    }))
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <section className="columns">
        <Column name="New" cards={cards.filter(card => card.column === 'New')} count={cards.filter(card => card.column === 'New').length} />
        <Column name="Screening" cards={cards.filter(card => card.column === 'Screening')} count={cards.filter(card => card.column === 'Screening').length} />
        <Column name="Interview" cards={cards.filter(card => card.column === 'Interview')} count={cards.filter(card => card.column === 'Interview').length} />
        <Column name="Offer" cards={cards.filter(card => card.column === 'Offer')} count={cards.filter(card => card.column === 'Offer').length} />
        <Column name="Hired" cards={cards.filter(card => card.column === 'Hired')} count={cards.filter(card => card.column === 'Hired').length} />
      </section>
    </DragDropContext>
  )
}

export default App
