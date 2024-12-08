import React, { Component } from "react";
import { AddData } from "./AddData";
import { UpdateDataBlock } from "./UpdateData";
import { AddDataBlock } from "./AddDataBlock";
import { v4 as uuidv4 } from 'uuid';

export class Table extends Component<PropsDefault, StateDefault> {
    errorTag: string
    errorText: string
    constructor(props: PropsDefault) {
        super(props);
        this.state = {
          items: [],
          date: '',
          score: '',
          useAdd: false,
          useEdit: false,
          editId: ''
        };
        this.errorTag = ''
        this.errorText = ''
        this.onChangeDate = this.onChangeDate.bind(this)
        this.onChangeScore = this.onChangeScore.bind(this)
        this.addData = this.addData.bind(this)
        this.updData = this.updData.bind(this)
        this.closeBlock = this.closeBlock.bind(this)
        this.editItem = this.editItem.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
    }

    addData(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault()
        if (this.checkValidity()) {
            return
        }
        const itemOn = this.checkDate(this.state.items, undefined, this.state.date, this.state.score, false)
        if(!itemOn) {
            this.addItemtoArr(this.state.date, this.state.score)
        }
        this.closeBlock('useAdd')
    }

    addItemtoArr(date: string, score: string) {
        const [day, month, year] = date.split('.');
        const setItem = this.state.items
        const updatedItems = {id: uuidv4(), date: new Date(+year, +month - 1, +day), score: +score};
        setItem.push(updatedItems)
        this.setState({...this.state, items: setItem });
    }

    updData(e: React.ChangeEvent<HTMLInputElement>, index: string) {
        e.preventDefault()
        if (this.checkValidity()) {
            return
        }
        const item: TableRow | undefined = this.state.items.find(el => el.id === index)
        this.checkDate(this.state.items, item, this.state.date, this.state.score, true)
        this.closeBlock('useEdit')
    }

    checkValidity() {
        let result = false;
        
        if (isNaN(+(this.state.score).replace(/\s?\W/g, '')) || this.state.score == '') {
            if (isNaN(+(this.state.score).replace(/\s?\W/g, ''))) {
                this.showError('#score', 'Только цифры');
            } else {
                this.showError('#score', 'Только цифры');
            }
            result = true;
        } else {
            this.hideError("#score")
        }

        if(this.state.date) {
            const [date, month, year] = this.state.date.split('.')
            if(!(+date > 0 && +date <= 31 && +month > 0 && +month <= 12 && +year > 0 && +year < 9999)) {
                this.showError("#date", 'Только цифры');
                result = true
            } else {
                this.hideError("#date")
            }
        } else if (this.state.date == '') {
            this.showError('#date', 'Только цифры');
            result = true;
        } else {
            this.hideError("#date")
        }
        
        return result;
    }

    showError(input: string, message: string) {
        const tag = document.querySelector(input)!
        const errorText = tag.previousElementSibling!.querySelector('.error-text')!;
        errorText.textContent = message;
        if (errorText.classList.contains('_hidden')) {
            errorText.classList.remove('_hidden');
        }
    }

    hideError(input: string) {
        const tag = document.querySelector(input)!
        const errorText = tag.previousElementSibling!.querySelector('.error-text')!;
        if (!errorText.classList.contains('_hidden')) {
            errorText.classList.add('_hidden');
        }
    }

    checkDate(items: TableRow[], currItem: TableRow | undefined, date: string, score: string, newDate: boolean) {
        const [day, month, year] = date.split('.');
        const item = items.findIndex(el => el.date.getTime() === new Date(+year, +month - 1, +day).getTime())
        if (item != -1) {
            if (newDate) {
                let test = false
                const newItemsList = items.map(el => {
                    if (el.id === this.state.items[item].id && this.state.items[item].id !== currItem?.id) {
                        el.date = new Date(+year, +month - 1, +day);
                        el.score = el.score + +score
                        test = true
                    } else if (el.id === this.state.items[item].id) {
                        el.date = new Date(+year, +month - 1, +day);
                        el.score = +score
                    }
                    return el
                })
                if (test) {
                    this.setState({ ...this.state }, () => {
                        this.deleteItem(currItem!.id)
                    });
                    test = false
                } else {
                    this.setState({ ...this.state });
                }
                this.setState({ ...this.state, items: newItemsList, date: '', score: '', editId: '' })
                return
            }
            items[item].score = items[item].score + +score
            this.setState({ ...this.state, items: items, date: '', score: '' })
            return true
        } else if (newDate) {
            const newItemsList = items.map(el => {
                if (el.id === currItem?.id) {
                    el.date = new Date(+year, +month - 1, +day);
                    el.score = +score
                }
                return el
            })
            this.setState({ ...this.state, items: newItemsList, date: '', score: '', editId: '' })
            return
        }
        return false
    }

    onChangeDate(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({...this.state, date: e.target.value})
    }

    onChangeScore(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({...this.state, score: e.target.value})
    }

    addItem() {
        this.setState({...this.state, useAdd: true})
    }

    editItem(id: string) {
        this.setState({...this.state, editId: id, useEdit: true})
    }

    deleteItem(id: string) {
        console.log('del')
        const updatedItems = this.state.items.filter(el => el.id !== id)
        console.log(updatedItems)
        this.setState({...this.state, items: updatedItems})
    }

    closeBlock(type: string) {
        const closeObjData = {date: '', score: '', [type]: false}
        this.setState({...this.state, ...closeObjData})
    }

    render () {
        return (
            <div className="product-table">
                <div className="create-table-data">
                    <h1>Товары</h1>
                    <label htmlFor="create-data" onClick={() => this.addItem()} className="table-row create">
                        <input type="checkbox" id="create-data" className="visually-hidden"/>
                    </label>
                </div>
                <table>
                    <tr>
                        <th>Дата (ДД.ММ.ГГ)</th>
                        <th>Пройдено км</th>
                        <th>Действия</th>
                    </tr>
                    {this.state.items.sort((a,b) => b.date.getTime() - a.date.getTime()).map((el) => (
                        <tr key={el.id} data-id={el.id}>
                            <AddData date={el.date} score={el.score} />
                            <td>
                                <div className="chexbox-btn">
                                    <label htmlFor={`edit-data${el.id}`} className="table-row edit">
                                        <input type="checkbox" onClick={() => this.editItem(el.id)} id={`edit-data${el.id}`} className="visually-hidden"/>
                                    </label>
                                    <label htmlFor={`delete-data${el.id}`} className="table-row delete">
                                        <input type="checkbox" onClick={() => this.deleteItem(el.id)} id={`delete-data${el.id}`} className="visually-hidden"/>
                                    </label>
                                </div>
                            </td>
                        </tr>
                    ))}
                </table>
                {this.state.useAdd && <AddDataBlock
                    date={this.state.date}
                    score={this.state.score}
                    onChangeDate={this.onChangeDate}
                    onChangeScore={this.onChangeScore}
                    addData={this.addData}
                    closeBlock={this.closeBlock} />}
                {this.state.useEdit && <UpdateDataBlock
                    id={this.state.editId}
                    date={this.state.date}
                    score={this.state.score}
                    onChangeDate={this.onChangeDate}
                    onChangeScore={this.onChangeScore}
                    updData={this.updData}
                    closeBlock={this.closeBlock} />}
            </div>
        )
    }
}
