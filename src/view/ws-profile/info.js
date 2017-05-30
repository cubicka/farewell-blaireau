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

function Info({banks, cities, details, info, isEdit, isFetchingBanks, isFetchingCities, isFetchingStates, isSaving, provinces, EditAttr, EditDate, PickBank, PickCity, PickState, Save, StartEdit, StopEdit}) {
    const {name, ktp, birth, phone, shop, address, bankAccountNumber, bank, bankBranch, bankAccountName, state, city} = GetAttrs(details,["name", "ktp", "birth", "phone", "shop", "address", "bankAccountNumber", "bank", "bankBranch", "bankAccountName", "state", "city"] )

    const birthDate = TimeFormatter(birth)

    const bankName = isEdit && info.has('bankName') ? info.get('bankName') : bank.get('name')
    const bankNames = banks.map((bank) => (bank.get('name')))

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
                    <div className={style.title}>
                        No. KTP
                    </div>
                    <div className={style.info}>
                        {
                            isEdit ? 
                            <input type="text" value={info.get('ktp')} onChange={EditAttr('ktp')} /> :
                            <span>{ktp}</span>
                        }
                    </div>
                </div>
                <div className={style.right}>
                    <div className={style.title}>
                        Tanggal Lahir
                    </div>
                    <div className={style.info}>
                        {
                            isEdit ?
                            <Calendar selected={info.get('birth')} onChange={EditDate('birth')} /> :
                            <span>{birthDate.date} {birthDate.monthName} {birthDate.year}</span>
                        }
                    </div>
                    <div className={style.title}>
                        No. Telp
                    </div>
                    <div className={style.info}>
                        {
                            isEdit ? 
                            <input type="text" value={info.get('phone')} onChange={EditAttr('phone')} /> :
                            <span>{'0' + phone}</span>
                        }
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
            <div className={style.head}>Informasi Rekening</div>
            <div className={style.body}>
                <div className={style.left}>
                    <div className={style.title}>
                        Nomor Rekening
                    </div>
                    <div className={style.info}>
                        {
                            isEdit ? 
                            <input type="text" value={info.get('bankAccountNumber')} onChange={EditAttr('bankAccountNumber')} /> :
                            <span>{bankAccountNumber}</span>
                        }
                    </div>
                    <div className={style.title}>
                        Jenis Bank
                    </div>
                    <div className={style.info}>
                        {
                            isEdit ?
                            <div className={style.dropdownWrapper}>
                                <Dropdown isFetching={isFetchingBanks} options={bankNames} selected={bankName} Pick={PickBank} />
                            </div> :
                            bankName
                        }
                    </div>
                </div>
                <div className={style.right}>
                    <div className={style.title}>
                        Nama Pemilik
                    </div>
                    <div className={style.info}>
                        {
                            isEdit ? 
                            <input type="text" value={info.get('bankAccountName')} onChange={EditAttr('bankAccountName')} /> :
                            <span>{bankAccountName}</span>
                        }
                    </div>
                    <div className={style.title}>
                        Kantor Cabang
                    </div>
                    <div className={style.info}>
                        {
                            isEdit ? 
                            <input type="text" value={info.get('bankBranch')} onChange={EditAttr('bankBranch')} /> :
                            <span>{bankBranch}</span>
                        }
                    </div>
                </div>
            </div>
        </div>
        )
}

const states = {
    banks: '/misc/banks',
    cities: '/misc/cities',
    provinces: '/misc/states',
    isEdit: '/ws/isEditInfo',
    isFetchingBanks: '/misc/isFetchingBanks',
    isFetchingCities: '/misc/isFetchingCities',
    isFetchingStates: '/misc/isFetchingStates',
    isSaving: '/ws/isSaving',
    info: '/ws/info',
}

const actions = {
    EditAttr: (attr) => (e) => (['/ws/update', {payload: {info: {[attr]: e.target.value}}}]),
    EditDate: (attr) => (d) => (['/ws/update', {payload: {info: {[attr]: d}}}]),
    PickBank: (name) => (['ws/pickBank', name]),
    PickCity: (name) => (['ws/pickCity', name]),
    PickState: (name) => (['ws/pickState', name]),
    Save: (id) => () => (['ws/save', id]),
    StartEdit: () => ([['/ws/clearInfo'], ['/ws/update', {payload: {isEditInfo: true}}]]),
    StopEdit: () => (['/ws/update', {payload: {isEditInfo: false}}]),
}

export default Om(states, actions)(Info)
