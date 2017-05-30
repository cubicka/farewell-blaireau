import React from 'react'
import Om from '../om'
import style from './profilepic.css'

function ProfilePic({id, image, Upload}) {
    const profilePic = image ? image : "/img/pp.png"

    return(
        <form name={'profileForm'} id={'profileForm'} className={style.wrapper}>
            <img src={profilePic} className={style.img} alt="Profile" />
            <label className={style.chngeBtn} htmlFor={'profilePicture'}>Ganti Foto</label>
            <input type={'file'} name={'profilePicture'} id={'profilePicture'} style={{display:'none'}} onChange={Upload(id)} />
        </form>
    )
}

const actions = {
    Upload: (id) => () => (['ws/uploadImage', id])
}

export default Om(undefined, actions)(ProfilePic)
