import { FullCard } from './Card'
import type { ColumnProps } from '../types'
import { Droppable, Draggable } from '@hello-pangea/dnd'
import { Box, Divider, Flex, Title } from '@mantine/core'
import '@mantine/core/styles/Flex.css'
import '@mantine/core/styles/Title.css'

export const Column = ({ name, cards, count }: ColumnProps) => {
  return (
    <Droppable droppableId={name}>
      {provided => (
      <Box 
        bd={'1px solid custom-theme.1'}
        p={'md'}
        w={'200px'}
        h={'100%'}
        bg="custom-theme.0"
        bdrs={'md'}
        ref={provided.innerRef} {...provided.droppableProps}>
      
        <Title order={4}>{name}: {count}</Title>
       
        <Divider color="custom-theme.6"/>

        <Box mt="md">
          <Flex direction="column" gap='md'>
            {cards?.map((card, index) => (
              <Draggable key={card.id} draggableId={card.id} index={index}>
                {provided => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <FullCard index={index} {...card} />
                  </Box>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Flex>
        </Box>

      </Box>
      )}
    </Droppable>
  )
}
