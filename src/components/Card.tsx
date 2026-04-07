import type { CardProps} from '../types';
import { Text,Title,Box } from '@mantine/core'
import '@mantine/core/styles/Title.css'
import '@mantine/core/styles/Text.css'

export const Card = ({ name, appliedPosition, applicationDate, index }: CardProps) => {     
    return (
        <>
         <Box style={{textAlign: "start"}} bd={'1px solid #000'} p={'sm'} bdrs={'md'}>
                <Title 
                    fz={'20px'}
                >
                    {index!+1}.{name}
                </Title>
                <hr />
                <Text fz={'14px'}>{appliedPosition}</Text>
                <Text fz={'14px'}>{applicationDate}</Text>
         </Box>  
        </>
    )
}