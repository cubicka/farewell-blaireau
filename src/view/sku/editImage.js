import React from 'react'
import Icon from 'react-fontawesome'
import style from './editImage.css'

function EditImage() {
    return (
        <div className={style.wrapper}>
            <span className={style.title}>Image Manager</span>
            <span className={style.filterWrapper}>
                <input type={'text'} placeholder={'SKU / Nama Item'} className={style.inputFilter} />
            </span>
            <span className={style.collectionWrapper}>
                <span className={style.imageWrapper}>
                    <span className={style.photoWrapper}>
                        <img src="https://s3-ap-southeast-1.amazonaws.com/kulakan/rokok.jpg" className={style.photo} />
                        <Icon name={'upload'} className={style.uploadBtn} style={{opacity: 0.5}} />
                    </span>
                    <span className={style.imageName}>Sampoerna A Mild - 16s</span>
                </span>
                <span className={style.imageWrapper}>
                    <span className={style.photoWrapper}>
                        <img src="https://s3-ap-southeast-1.amazonaws.com/kulakan/rokok.jpg" className={style.photo} />
                        <Icon name={'upload'} className={style.uploadBtn} />
                    </span>
                    <span className={style.imageName}>Dji Sam Soe K - 12s</span>
                </span>
                <span className={style.imageWrapper}>
                    <span className={style.photoWrapper}>
                        <img src="https://s3-ap-southeast-1.amazonaws.com/kulakan/rokok.jpg" className={style.photo} />
                        <Icon name={'upload'} className={style.uploadBtn} />
                    </span>
                    <span className={style.imageName}>Dji Sam Soe K - 16s</span>
                </span>
                <span className={style.imageWrapper}>
                    <span className={style.photoWrapper}>
                        <img src="https://s3-ap-southeast-1.amazonaws.com/kulakan/rokok.jpg" className={style.photo} />
                        <Icon name={'upload'} className={style.uploadBtn} />
                    </span>
                    <span className={style.imageName}>A Mild Blue - 16s</span>
                </span>
                <span className={style.imageWrapper}>
                    <span className={style.photoWrapper}>
                        <img src="https://s3-ap-southeast-1.amazonaws.com/kulakan/rokok.jpg" className={style.photo} />
                        <Icon name={'upload'} className={style.uploadBtn} />
                    </span>
                    <span className={style.imageName}>A Volution Regular - 20s</span>
                </span>
            </span>
            <span className={style.pagination}>
                <Icon name={'angle-double-left'} className={style.left} />
                <span className={style.note}>Page 1 of 7</span>
                <Icon name={'angle-double-right'} className={style.left} />
            </span>
        </div>
    )
}

export default EditImage
