import './Card.css';
import type { CardProps} from './types';

export const Card = ({ name, appliedPosition, applicationDate, index }: CardProps) => {     
    return (
        <>
         <div className="card">
                <h3>{index+1}.{name}</h3>
                <hr />
                <p>{appliedPosition}</p>
                <p>{applicationDate}</p>
         </div>  
        </>
    )
}