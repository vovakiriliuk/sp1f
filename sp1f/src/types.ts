export type ColumnProps = {
    name: string,
    cards?: CardProps[],
    count: number
}

export type CardProps = {
    id: string,
    name: string,
    appliedPosition: string,
    applicationDate: string,
    column: string,
    index?: number
}