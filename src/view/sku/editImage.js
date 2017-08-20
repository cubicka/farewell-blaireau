import React from 'react'
import Om from '../om'
import Icon from 'react-fontawesome'
import style from './editImage.css'

function Item({item, Upload}) {
    const name = `imageForm${item.get('id')}`
    return (
        <form id={name} className={style.imageWrapper}>
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
            <span className={style.imageName}>{item.get('name') + ' --- ' + item.get('description') + ' --- ' + item.get('sku')}</span>
        </form>
    )
}

function EditImage({filter, list, currentPage, pageTotal, EditFilter, FetchNoImage, NextPage, PrevPage, UploadImage}) {
    const itemsRendered = list.map((item) => {
        return <Item key={item.get('id')} item={item} Upload={UploadImage} />
    })

    return (
        <div className={style.wrapper}>
            <span className={style.title}>Image Manager</span>
            <span className={style.saveBtn} onClick={FetchNoImage}>
                Only No Image
            </span>
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
}

const actions = {
    EditFilter: (e) => ['sku/editImageFilter', e.target.value],
    FetchNoImage: () => ['sku/noImageList'],
    NextPage: () => ['sku/nextImagePage'],
    PrevPage: () => ['sku/prevImagePage'],
    UploadImage: (id, name) => () => ['sku/uploadImage', id, name]
}

export default Om(states, actions)(EditImage)
