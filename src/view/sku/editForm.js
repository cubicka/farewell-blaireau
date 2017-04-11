import React from 'react'
import Icon from 'react-fontawesome'
import style from './editForm.css'

function EditForm() {
    return (
        <div className={style.wrapper}>
            <span className={style.title}>SKU Manager</span>
            <span className={style.saveBtn}>Save</span>
            <div className={style.header}>
                <span className={style.colAction}></span>
                <span className={style.colSKU}>SKU</span>
                <span className={style.colName}>Nama Item</span>
                <span className={style.colPrice1}>DIST</span>
                <span className={style.colPrice2}>SRO</span>
                <span className={style.colPrice3}>KANV</span>
            </div>
            <div className={style.body}>
                <div className={style.row}>
                    <span className={style.colAction}>
                        <Icon name={'trash'} className={style.deleteBtn} />
                    </span>
                    <span className={style.colSKU}>
                        <input type={'text'} value={'8999909096004'} disabled onChange={() => {}} />
                    </span>
                    <span className={style.colName}>
                        <input type={'text'} value={'Sampoerna A Mild 16'} onChange={() => {}} />
                    </span>
                    <span className={style.colPrice1}>
                        <input type={'text'} value={'13.608'} onChange={() => {}} />
                    </span>
                    <span className={style.colPrice2}>
                        <input type={'text'} value={'13.689'} onChange={() => {}} />
                    </span>
                    <span className={style.colPrice3}>
                        <input type={'text'} value={'13.800'} onChange={() => {}} />
                    </span>
                </div>
                <div className={style.row}>
                    <span className={style.colAction}>
                        <Icon name={'trash'} className={style.deleteBtn} />
                    </span>
                    <span className={style.colSKU}>
                        <input type={'text'} value={'8999909096004'} disabled onChange={() => {}} />
                    </span>
                    <span className={style.colName}>
                        <input type={'text'} value={'Sampoerna A Mild 16'} onChange={() => {}} />
                    </span>
                    <span className={style.colPrice1}>
                        <input type={'text'} value={'13.608'} onChange={() => {}} />
                    </span>
                    <span className={style.colPrice2}>
                        <input type={'text'} value={'13.689'} onChange={() => {}} />
                    </span>
                    <span className={style.colPrice3}>
                        <input type={'text'} value={'13.800'} onChange={() => {}} />
                    </span>
                </div>
                <div className={style.row}>
                    <span className={style.colAction}>
                        <Icon name={'trash'} className={style.deleteBtn} />
                    </span>
                    <span className={style.colSKU}>
                        <input type={'text'} value={'8999909096004'} disabled onChange={() => {}} />
                    </span>
                    <span className={style.colName}>
                        <input type={'text'} value={'Sampoerna A Mild 16'} onChange={() => {}} />
                    </span>
                    <span className={style.colPrice1}>
                        <input type={'text'} value={'13.608'} onChange={() => {}} />
                    </span>
                    <span className={style.colPrice2}>
                        <input type={'text'} value={'13.689'} onChange={() => {}} />
                    </span>
                    <span className={style.colPrice3}>
                        <input type={'text'} value={'13.800'} onChange={() => {}} />
                    </span>
                </div>
            </div>
            <div className={style.addWrapper + ' ' + style.row}>
                <span className={style.colAction}></span>
                <span className={style.colSKU}>
                    <input type={'text'} placeholder={'SKU'} className={style.inputAdd} />
                </span>
                <span className={style.colRest}>
                    <span className={style.addBtn}>Edit / Insert</span>
                </span>
            </div>
        </div>
    )
}

export default EditForm
