export function UpdateDataBlock({id, date, score, onChangeDate, onChangeScore, updData, closeBlock}) {
    return (
        <div className="main-create-block">
            <form className="create-table-block" noValidate>
                <div className="item-create">
                    <h4 className="create-text">Дата (ДД.ММ.ГГ) <span className="error-text _hidden"></span></h4>
                    <input type="text" value={date} onChange={onChangeDate} className="create-input" id="date"/>
                </div>
                <div className="item-create">
                    <h4 className="create-text">Пройдено км <span className="error-text _hidden"></span></h4>
                    <input type="text" value={score} onChange={onChangeScore} className="create-input" id="score"/>
                </div>
                <div className="btn-block">
                    <button className="btn" onClick={(e) => updData(e, id)} id="update">Обновить</button>
                    <button className="btn" onClick={() => closeBlock('useEdit')} id="cancel">Отменить</button>
                </div>
            </form>
        </div>
    )
}