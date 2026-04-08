export type ColumnProps = {
    name: string,
    cards?: CardProps[],
    count: number,
    index?: number,
    background?: string
}

export type CardProps = {
    id: string,
    name: string,
    appliedPosition: string,
    applicationDate: string,
    column: string,
    index?: number
}