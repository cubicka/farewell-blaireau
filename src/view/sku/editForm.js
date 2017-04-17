import React from 'react'
import Om from '../om'
import Icon from 'react-fontawesome'
import {WithLoading as Button} from '../components/button'
import style from './editForm.css'

function Item({idx, item, EditItem}) {
    return (
        <div className={style.row}>
            <span className={style.colAction}>
                <Icon name={'trash'} className={style.deleteBtn} />
            </span>
            <span className={style.colSKU}>
                <input type={'text'} value={item.get('sku')} disabled onChange={EditItem(idx, 'sku')} />
            </span>
            <span className={style.colName}>
                <input type={'text'} value={item.get('name')} onChange={EditItem(idx, 'name')} />
            </span>
            <span className={style.colPrice1}>
                <input type={'text'} value={item.get('price')} onChange={EditItem(idx, 'price')} />
            </span>
            <span className={style.colPrice2}>
                <input type={'text'} value={item.get('category')} onChange={EditItem(idx, 'category')} />
            </span>
        </div>
    )
}

function EditForm({isLoading, isSaving, list, sku, EditItem, EditSKU, FindSKU, SaveSKU}) {
    function OnKeyDown(e) {
        if (e.keyCode === 13) {
            FindSKU()
        }
    }

    console.log('sku', list.toJS())
    const itemsRendered = list.map((item, idx) => {
        return <Item key={idx} idx={idx} item={item} EditItem={EditItem} />
    })

    return (
        <div className={style.wrapper}>
            <span className={style.title}>SKU Manager</span>
            <Button className={style.saveBtn} onClick={SaveSKU} text={'Save'} isLoading={isSaving} />
            <div className={style.header}>
                <span className={style.colAction}></span>
                <span className={style.colSKU}>SKU</span>
                <span className={style.colName}>Nama Item</span>
                <span className={style.colPrice1}>Harga</span>
                <span className={style.colPrice2}>Kategori</span>
            </div>
            <div className={style.body}>
                {itemsRendered}
            </div>
            <div className={style.addWrapper + ' ' + style.row}>
                <span className={style.colAction}></span>
                <span className={style.colSKU}>
                    <input type={'text'} placeholder={'SKU'} className={style.inputAdd} value={sku} onChange={EditSKU} onKeyDown={OnKeyDown} />
                </span>
                <span className={style.colRest}>
                    <Button className={style.addBtn} onClick={FindSKU} text={'Find SKU'} isLoading={isLoading} />
                </span>
            </div>
        </div>
    )
}

const states = {
    sku: "/sku/view/form/sku",
    isLoading: "/sku/view/form/isLoading",
    isSaving: "/sku/view/form/isSaving",
    list: "/sku/form",
}

const actions = {
    EditSKU: (e) => ["sku/editFormSKU", e.target.value],
    FindSKU: () => ["sku/findSKU"],
    SaveSKU: () => ["sku/saveSKU"],
    EditItem: (idx, attr) => (e) => ["/sku/formItem/edit", {idx, attr, val: e.target.value}],
}

export default Om(states, actions)(EditForm)
