import React from 'react'
import Icon from 'react-fontawesome'
import Om from '../om'
import Info from './info'
import ProfilePic from './profilepic'
import style from './content.css'
import Password from './password'

function Body({profile}) {
    return (
        <div className={style.body}>
            <div className={style.flx1}>
                <ProfilePic image={profile.get('profilePicture')} id={profile.get('userID')} />
            </div>
            <div className={style.flx2}>
                <Info details={profile} />
            </div>
            <div className={style.flx3}>
                <Password isEdit={true} username={profile.get('username')} id={profile.get('userID')} />
            </div>
        </div>
    )
}

function Content({isFetching, profileFound, profile}) {
    return(
        <div className={style.wrapper}>
            <span className={style.title}>
                Profil Retail
                {
                    !isFetching && !profileFound &&
                    ' Tidak Ditemukan'
                }
                {
                    isFetching &&
                    <Icon name={'spinner'} className={'fa-spin'} style={{margin: 10, position: 'absolute', top: -10, left: -40}} />
                }
            </span>
            <div>
            {!isFetching && profileFound && <Body profile={profile} />}
            </div>
        </div>
    )
}


const states = {
    isFetching: '/retail/isFetching',
    profileFound: '/retail/profileFound',
    profile: '/retail/profile'
}

export default Om(states)(Content)
