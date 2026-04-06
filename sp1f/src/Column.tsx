import './Column.css'
import { Card } from './Card'
import type { ColumnProps } from './types'
import { Droppable, Draggable } from '@hello-pangea/dnd'

export const Column = ({ name, cards, count }: ColumnProps) => {
  return (
    <Droppable droppableId={name}>
      {provided => (
        <div className="column" ref={provided.innerRef} {...provided.droppableProps}>
          <section className="header">
            <h2>{name}: <span>{count}</span></h2>
          </section>
          <hr />
          <section className="cards">
            {cards?.map((card, index) => (
              <Draggable key={card.id} draggableId={card.id} index={index}>
                {provided => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Card index={index} {...card} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </section>
        </div>
      )}
    </Droppable>
  )
}
