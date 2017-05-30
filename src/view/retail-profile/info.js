import React from 'react'
import {fromJS} from 'immutable'
import style from './info.css'
import {WithLoading} from '../components/button'
import Calendar from '../components/calendar'
import WithActions from '../components/withActions'
import Dropdown from '../components/dropdown'
import {GetAttrs, TimeFormatter} from 'kulakan/util'
import Om from '../om'
// import {connect} from 'react-redux'
// import {push} from 'react-router-redux'

function Info({cities, details, info, isEdit, isFetchingCities, isFetchingStates, isSaving, provinces, EditAttr, EditDate, PickCity, PickState, Save, StartEdit, StopEdit}) {
    const {name, shop, address, state, city, zipcode, phone} = GetAttrs(details,["name", "phone", "shop", "address", "state", "city", "zipcode"] )

    const provinceName = isEdit && info.has('provinceName') ? info.get('provinceName') : state.get('Name')
    const stateNames = provinces.map((state) => (state.get('Name')))

    const cityName = isEdit && info.has('cityName') ? info.get('cityName') : (city && city.get('Name'))
    const stateID = info.get('stateID', state.get('StateID'))
    const cityNames = cities.get(stateID.toString(), fromJS([])).map((city) => (city.get('Name')))

    return(
        <div className={style.wrapper + ' ' + style.wrapperLeft}>
            <div className={style.head}> Informasi Pengguna</div>
            <div className={style.btnWrapper}>
            {
                isEdit ?
                <div>
                    <WithLoading isLoading={isSaving} text={'Simpan'} className={style.btn + ' ' + style.btnSave} onClick={Save(details.get('userID'))} />
                    <div className={style.btn + ' ' + style.btnBatal} onClick={StopEdit}>Batal</div>
                </div>
                : <div className={style.btn} onClick={StartEdit}>Edit</div>
            }
            </div>
            <div className={style.body}>
                <div className={style.left}>
                    <div className={style.title}>
                        Nama
                    </div>
                    <div className={style.info}>
                        {
                            isEdit ? 
                            <input type="text" value={info.get('name')} onChange={EditAttr('name')} /> :
                            <span>{name}</span>
                        }
                    </div>
                </div>
                <div className={style.right}>
                    <div className={style.title}>
                        No. Telp
                    </div>
                    <div className={style.info}>
                        <span>{'0' + phone}</span>
                    </div>
                </div>
            </div>
            <div className={style.space} />
            <div className={style.head}>Informasi Toko</div>
            <div className={style.body}>
                <div>
                    <div className={style.title}>
                        Nama Toko
                    </div>
                    <div className={style.info}>
                        {
                            isEdit ? 
                            <input type="text" value={info.get('shop')} onChange={EditAttr('shop')} /> :
                            <span>{shop}</span>
                        }
                    </div>
                    <div className={style.title}>
                        Alamat Toko
                    </div>
                    <div className={style.info}>
                        {
                            isEdit ? 
                            <input type="text" value={info.get('address')} onChange={EditAttr('address')} /> :
                            <span>{address}</span>
                        }
                    </div>
                    <div className={style.title}>
                        Kode Pos
                    </div>
                    <div className={style.info}>
                        {
                            isEdit ? 
                            <input type="text" value={info.get('zipcode')} onChange={EditAttr('zipcode')} /> :
                            <span>{zipcode}</span>
                        }
                    </div>
                    <div className={style.title}>
                        Kota
                    </div>
                    <div className={style.info}>
                        <WithActions actions={[['misc/cities', state.get('StateID')]]}>
                        {
                            isEdit ?
                            <div className={style.dropdownWrapper}>
                                <Dropdown isFetching={isFetchingCities} options={cityNames} selected={cityName} Pick={PickCity} />
                            </div> :
                            cityName
                        }
                        </WithActions>
                    </div>
                    <div className={style.title}>
                        Provinsi
                    </div>
                    <div className={style.info}>
                        {
                            isEdit ?
                            <div className={style.dropdownWrapper}>
                                <Dropdown isFetching={isFetchingStates} options={stateNames} selected={provinceName} Pick={PickState} />
                            </div> :
                            provinceName
                        }
                    </div>
                </div>
            </div>
            <div className={style.space} />
        </div>
    )
}

const states = {
    cities: '/misc/cities',
    provinces: '/misc/states',
    isEdit: '/retail/isEditInfo',
    isFetchingCities: '/misc/isFetchingCities',
    isFetchingStates: '/misc/isFetchingStates',
    isSaving: '/retail/isSaving',
    info: '/retail/info',
}

const actions = {
    EditAttr: (attr) => (e) => (['/retail/update', {payload: {info: {[attr]: e.target.value}}}]),
    EditDate: (attr) => (d) => (['/retail/update', {payload: {info: {[attr]: d}}}]),
    PickCity: (name) => (['retail/pickCity', name]),
    PickState: (name) => (['retail/pickState', name]),
    Save: (id) => () => (['retail/save', id]),
    StartEdit: () => ([['/retail/clearInfo'], ['/retail/update', {payload: {isEditInfo: true}}]]),
    StopEdit: () => (['/retail/update', {payload: {isEditInfo: false}}]),
}

export default Om(states, actions)(Info)
