import './Column.css';

interface ColumnProps {
    name: string
}

export const Column = ({ name }: ColumnProps) => {
    return (
        <>
            <div className="column">
                <section className="header">
                    <h2>{name} <span>0</span></h2>
                </section>
                <hr />
            </div>
        </>
    )
}