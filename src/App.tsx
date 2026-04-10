import { useState, useEffect } from 'react'
import { Column } from './components/Column'
import { DragDropContext, type DropResult } from '@hello-pangea/dnd'
import type { CardProps } from './types'
import { Flex } from '@mantine/core'
import '@mantine/core/styles.css'

function App() {
  const [cards, setCards] = useState<CardProps[]>([])

  const getCardsByColumn = (column: string) =>
    cards.filter(card => card.column === column)

  type CandidatesResponse = CardProps[]

  useEffect(() => {
    const fetchCandidates = async () => {
      const res = await fetch('http://localhost:3000/candidate')

      if (!res.ok) {
        console.error('Failed to fetch candidates')
        return
      }

      const data: CandidatesResponse = await res.json()
      setCards(data)
    }

    fetchCandidates()
  }, [])

  const onDragEnd = async (result: DropResult) => {
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

    try {
      await fetch(`http://localhost:3000/candidate/${movingCard.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          column: destination.droppableId,
        }),
      })
    } catch (err) {
      console.error('Failed to update candidate', err)
    }

    const destinationCards = newCards.filter(
      c => c.column === destination.droppableId
    )

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
      <Flex justify='center' gap="xl" p="md">
        {names.map((name,index) => (
          <Column 
            key={index}
            name={name}
            cards={getCardsByColumn(name)}
            count={getCardsByColumn(name).length}
            background={`custom-theme.${index+4}`}
          />
        ))} 
      </Flex>
    </DragDropContext>
  )
}

export default App