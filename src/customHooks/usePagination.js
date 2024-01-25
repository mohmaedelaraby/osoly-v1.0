import { range } from "../utils/range"

export const usePagination = (totalCount, pageSize) => {
    const totalPageCount = Math.ceil(totalCount / pageSize)
    const paginationRange = range(1, totalPageCount)

    return [...paginationRange]
}