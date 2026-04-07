import { Card } from './Card'
import type { ColumnProps } from '../types'
import { Droppable, Draggable } from '@hello-pangea/dnd'
import { Box, Flex, Text, Title } from '@mantine/core'
import '@mantine/core/styles/Flex.css'

export const Column = ({ name, cards, count }: ColumnProps) => {
  return (
    <Droppable droppableId={name}>
  {provided => (
    <Box 
    bd={'1px solid #000'}
    p={'15px'}
    w={'200px'}
    h={'100%'}
    bg={'#f0f0f0'}
    bdrs={'md'}
    ref={provided.innerRef} {...provided.droppableProps}>
      
      <Flex justify="center" align="center">
        <Title order={4} 
        fz={'20px'}
        fw={'500'}
        >{name}: </Title>
        <Text fz={'20px'} ml={'sm'}>{count}</Text>
        
      </Flex>
      <hr />
      <Box mt="xl">
        <Flex direction="column" gap="xl">
          {cards?.map((card, index) => (
            <Draggable key={card.id} draggableId={card.id} index={index}>
              {provided => (
                <Box
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <Card index={index} {...card} />
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
