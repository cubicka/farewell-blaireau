import React from 'react'
import {fromJS} from 'immutable'
import Om from '../om'
import Icon from 'react-fontawesome'
import style from './editImage.css'

function Item({edited, isEdit, isSaving, item, PartialUpdate, StartEdit, StopEdit, UpdateEdit, Upload}) {
    function HandleStopEdit(attr) {
        return (e) => {
            if (e.keyCode === 13) {
                // StopEdit(attr)
                PartialUpdate(attr)
            }
        }
    }

    const name = `imageForm${item.get('id')}`
    return (
        <div className={style.imageWrapper}>
            <form id={name}>
                <span className={style.photoWrapper}>
                    <input type={'file'} name={'image'} id={name + 'images'} style={{display:'none'}} onChange={Upload(item.get('id'), name)} />
                    {
                        item.get('image') && <img src={item.get('image')} className={style.photo} alt={'Photo of ' + item.get('name')} />
                    }
                    {
                        !item.get('image') &&
                        <Icon className={style.photo} name={'file-image-o'} style={{display: 'block', height: '150px', fontSize: '100px', lineHeight: '150px'}} />
                    }
                    <label htmlFor={name + 'images'} className={style.uploadBtn}>
                        <Icon name={'upload'} style={{opacity: 0.5}} />
                    </label>
                </span>
                {
                // <span className={style.imageName}>{item.get('name') + ' --- ' + item.get('description') + ' --- ' + item.get('sku')}</span>
                }
            </form>
            {
                isEdit.get('name') ?
                <input className={style.imageEdit} value={edited.get('name')} onKeyDown={HandleStopEdit('name')} onChange={(e) => {UpdateEdit('name', e.target.value)}} onBlur={() => {StopEdit('name')}} disabled={isSaving.get('name')} /> :
                <div onClick={() => {StartEdit('name')}}>{item.get('name')}</div>
            }
            {
                isEdit.get('description') ?
                <input className={style.imageEdit} value={edited.get('description')} onKeyDown={HandleStopEdit('description')} onChange={(e) => {UpdateEdit('description', e.target.value)}} onBlur={() => {StopEdit('description')}} disabled={isSaving.get('description')} /> :
                <div onClick={() => {StartEdit('description')}}>{item.get('description').trim() || "NO DESCRIPTION!"}</div>
            }
        </div>
    )
}

function EditImage({categories = [], edited = {}, filter, isEdit = {}, isSaving, list, currentPage, pageTotal, EditFilter, FetchImageByCategory, FetchNoImage, NextPage, PartialUpdate, PrevPage, StartEdit, StopEdit, UpdateEdit, UploadImage}) {
    const itemsRendered = list.map((item) => {
        const id = item.get('id')
        return <Item key={item.get('id')} item={item} Upload={UploadImage} isEdit={isEdit.get(id.toString(), fromJS({}))} StartEdit={(attr) => (StartEdit(id, attr))} StopEdit={(attr) => {StopEdit(id, attr)}} UpdateEdit={(attr, value) => {UpdateEdit(id, attr, value)}} edited={edited.get(id.toString(), fromJS({}))} PartialUpdate={(attr) => {PartialUpdate(id, attr)}} isSaving={isSaving.get(id.toString(), fromJS({}))} />
    })

    const categoriesRendered = categories.map((category) => {
        return <span key={category} className={style.categoryBtn} onClick={() => FetchImageByCategory(category)}>{category}</span>
    })

    return (
        <div className={style.wrapper}>
            <span className={style.title}>Image Manager</span>
            <span className={style.saveBtn} onClick={FetchNoImage}>
                Only No Image
            </span>
            {categoriesRendered}
            <span className={style.collectionWrapper}>
                {itemsRendered}
                {
                    (list.size < 1) && <span className={style.imageWrapper} />
                }
                {
                    (list.size < 2) && <span className={style.imageWrapper} />
                }
                {
                    (list.size < 3) && <span className={style.imageWrapper} />
                }
                {
                    (list.size < 4) && <span className={style.imageWrapper} />
                }
                {
                    (list.size < 5) && <span className={style.imageWrapper} />
                }
            </span>
            <span className={style.pagination}>
                <Icon name={'angle-double-left'} className={style.left} onClick={PrevPage} />
                <span className={style.note}>Page {currentPage} of {pageTotal}</span>
                <Icon name={'angle-double-right'} className={style.left} onClick={NextPage} />
                <input type={'text'} placeholder={'SKU / Nama Item'} className={style.inputFilter} value={filter} onChange={EditFilter} />
            </span>
        </div>
    )
}

const states = {
    filter: "/sku/view/images/filterKey",
    pageTotal: "/sku/view/images/pageNum",
    currentPage: "/sku/view/images/page",
    list: "sku/images",
    categories: "/sku/categories",
    isEdit: '/sku/isEdit',
    isSaving: '/sku/isSaving',
    edited: '/sku/edited',
}

const actions = {
    EditFilter: (e) => ['sku/editImageFilter', e.target.value],
    FetchNoImage: () => ['sku/noImageList'],
    NextPage: () => ['sku/nextImagePage'],
    PrevPage: () => ['sku/prevImagePage'],
    UploadImage: (id, name) => () => ['sku/uploadImage', id, name],
    FetchImageByCategory: (category) => ['sku/imageByCategory', category],
    StartEdit: (id, attr) => ['/sku/triage/startEdit', {id, attr}],
    StopEdit: (id, attr) => ['/sku/triage/stopEdit', {id, attr}],
    UpdateEdit: (id, attr, value) => ['/sku/triage/updateEdit', {id, attr, value}],
    PartialUpdate: (id, attr) => ['sku/partialUpdate', id, attr],
}

export default Om(states, actions)(EditImage)
