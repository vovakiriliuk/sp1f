import type { CardProps } from '../types';
import { Text,Title,Card, Divider } from '@mantine/core'
import '@mantine/core/styles/Title.css'
import '@mantine/core/styles/Text.css'
import '@mantine/core/styles/Card.css'

export const FullCard = ({ name, appliedPosition, applicationDate, index }: CardProps) => {     
    const info = [appliedPosition, applicationDate]
    return (
        <>
         <Card style={{textAlign: "start"}}>
                <Title order={4}
                >
                    {index!+1}.{name}
                </Title>
                <Divider bg="custom-theme.3" my='xs'/>

                {info.map((text) => (
                    <Text fz={'14px'}>{text}</Text>
                    ))
                }
         </Card>  
        </>
    )
}