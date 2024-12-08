export function AddData({date, score}: {date: Date, score: number}) {
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    const month = (date.getMonth() + 1)
    const updatedMonth = month < 10 ? '0' + month : month
    const year = date.getFullYear()
    return (
        <>
            <td>{`${day}.${updatedMonth}.${year}`}</td>
            <td>{score}</td>
        </>
    )
}