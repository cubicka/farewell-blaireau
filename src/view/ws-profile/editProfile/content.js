import React from 'react'
import {connect} from 'react-redux'
import style from './content.css'
import style2 from '../../global/globalstyle.css'
import DropDown from '../../global/dropdown'
import Action from '../../../action'
import {GetAttrs, TimeFormatter} from '../../helper'
import {push} from 'react-router-redux'
import Calendar from '../../global/calendar'


function Content({profile, listBank, listProvince, listCity, Edit, Close, Dropdown, EditDrop, Save, EditDate}) {
    function NewDate(x) {
        EditDate(x.toISOString())
    }   
    if ( profile.size > 0 ){
        const [name, ktp, birth, telp, shop, address, bankAccountNumber, bankID, bankBranch, bankAccountName, stateID, cityID] = GetAttrs(profile ,["name", "ktp", "birth", "phone", "shop", "address", "bankAccountNumber", "bankID", "bankBranch", "bankAccountName", "stateID", "cityID"] )
        
        const bankName = profile.get('bankName', listBank.filter((list)=>{
            return list.get('code') === bankID }).getIn([0, 'name'],""))

        const listBankName = listBank.map((list)=>{
            return(list.get('name'))
        }) 
        const isBank = listBank.filter((list)=>{
            return(list.get('name', "").toLowerCase()===bankName.toLowerCase().trim())
        }) 
        const bankSelected = isBank.size > 0 ? isBank.getIn([0,'code']) : undefined

            
        const stateName = profile.get('stateName', listProvince.filter((list)=>{
            return list.get('StateID',"").toString() === stateID }).getIn([0, 'Name'], ""))

        const listStateName = listProvince.map((list)=>{
            return(list.get('Name'))
        }) 
        const isState = listProvince.filter((list)=>{
            return(list.get('Name',"").toLowerCase()===stateName.toLowerCase().trim())
        }) 
        const stateSelected = isState.size > 0 ? isState.getIn([0,'StateID'],"").toString() : undefined


        const cityState = listCity ? listCity.get(stateSelected, []): []
        
        const cityName = profile.get('cityName', cityState.size > 0 ? cityState.filter((x)=>{
                return (x.get('CityID',"").toString() === cityID)}).getIn([0,'Name'], "") : "")

        const listCityName = cityState.map((list)=>{
            return(list.get('Name'))
        }) 
        const isCity = cityState.filter((list)=>{
            return(list.get('Name', "").toLowerCase()===cityName.toLowerCase().trim())
        }) 
        const citySelected = isCity.size > 0 ? isCity.getIn([0,'CityID'],"").toString() : undefined
        
        const date = new Date(birth)

        return( 
            <div className={style.wrapper}>
                <div className={style.header}>
                    <span className={style2.headertitle}>Edit Profil</span>
                </div>
                <div className={style2.headerline}/>
                <div className={style.body} >
                    <div className={style.form}>
                        <div className={style.title}>Informasi Pengguna</div>   
                        <div className={style.left}>
                            <div className={style.info}>
                                <div className={style.label}> Nama </div>
                                <input type="text" value={name} onChange={Edit('name')} />  
                            </div>
                            <div className={style.info}>
                                <div className={style.label}> Nomor Ktp </div>
                                <input type="number" value={ktp} onChange={Edit('ktp')} />  
                            </div>
                        </div>
                        <div className={style.right}>
                            <div className={style.info}>
                                <div className={style.label}> Nomor Telp </div>
                                <input type="number" value={telp} onChange={Edit('phone')} />   
                            </div>
                            <div className={style.info}>
                                <div className={style.label}> Tanggal Lahir </div>
                                <Calendar className={style.date} setDate={date} getDate={NewDate}/> 
                            </div>  
                        </div>
                        <div className={style.title}>Informasi Toko</div>
                        <div className={style.info}>
                            <div className={style.label}> Nama Toko</div>
                            <input type="text" value={shop} onChange={Edit('shop')} />  
                        </div>
                        <div className={style.info}>
                            <div className={style.label}> Alamat Toko </div>
                            <textarea form="adress" value={address} onChange={Edit('address')}/>    
                        </div>
                        <div className={style.info}>
                            <div className={style.label}> Provinsi</div>
                            { listProvince.size> 0 ?    
                                <div className={style.dropdownWrapper}> 
                                    <input  type="text" 
                                            value={stateName} 
                                            onClick={Dropdown('stateID')} 
                                            onChange={EditDrop('stateID', 'stateName', stateSelected)} />
                                    <DropDown id="stateID" 
                                            list={listStateName} 
                                            name={stateName} 
                                            action={'profile/editForm'} 
                                            view={"newProfile"}
                                            attr={'stateName'}/>
                                </div> :
                                <input type="text" value={stateName} disabled/>
                            }
                        </div>
                        <div className={style.info}>
                            <div className={style.label}> Kota</div>
                            { listCity.size > 0 ?
                                <div className={style.dropdownWrapper}>
                                    <input  type="text" 
                                            value={cityName} 
                                            onClick={Dropdown('cityID')} 
                                            onChange={EditDrop('cityID', 'cityName', citySelected)} />
                                    <DropDown id="cityID" 
                                            list={listCityName} 
                                            name={cityName} 
                                            action={'profile/editForm'} 
                                            view={"newProfile"}
                                            attr={'cityName'}/>
                                </div> :
                                <input type="text" value={cityName} disabled/>
                            }
                        </div>
                        <div style={{height: "30px"}} />
                        <div className={style.title}>Informasi Rekening</div>   
                        <div className={style.left}>
                            <div className={style.info}>
                                <div className={style.label}> Nomor Rekening </div>
                                <input type="number" value={bankAccountNumber} onChange={Edit('bankAccountNumber')} />  
                            </div>
                            <div className={style.info}>
                                <div className={style.label}> Nama Pemilik </div>
                                <input type="text" value={bankAccountName} onChange={Edit('bankAccountName')}/>
                            </div>
                        </div>
                        <div className={style.right}>
                            <div className={style.info}>
                                <div className={style.label}> JenisBank </div>
                                { listBank.size > 0 ?
                                    <div className={style.dropdownWrapper}>
                                        <input  type="text" 
                                                value={bankName} 
                                                onClick={Dropdown('bankID')} 
                                                onChange={EditDrop('bankID', 'bankName', bankSelected)} />
                                        <DropDown id="bankID" 
                                                list={listBankName} 
                                                name={bankName} 
                                                action={'profile/editForm'} 
                                                view={"newProfile"}
                                                attr={'bankName'}/>
                                    </div> :
                                    <input type="text" value={bankName} disabled/>
                                }   
                            </div>
                            <div className={style.info}>
                                <div className={style.label}> Kantor Cabang </div>
                                <input type="text" value={bankBranch} onChange={Edit('bankBranch')} />  
                            </div>  
                        </div>
                    </div>
                    <div className={style.bottom}>
                        <div className={style.batal} onClick={Close()}> Batal </div>
                        <div className={style.simpan} onClick={Save(citySelected, stateSelected, bankSelected)}> Simpan </div>
                    </div>
                </div>
            </div>
        )
    }
    return <div/> 
}


function StateToProps(state) {
    const profile = state.profile.get('newProfile', {})
    const listBank = state.pub.get('bank', [])
    const listProvince = state.pub.get('province', [])
    const listCity = state.pub.get('city',[])
    return{
        profile: profile,
        listBank : listBank,
        listProvince : listProvince,
        listCity : listCity 
    }
}   

function PropsToDispatch(dispatch) {
    return{
        EditDrop(type, str, id){
            return (e) =>{
                dispatch(Action("profile/editForm", "newProfile", str, e.target.value))
                dispatch(Action("profile/editForm", "newProfile", type, id)) 
            }
        },
        Dropdown(x){
            if(x === "stateID"){
                return () =>{
                    dispatch(Action("profile/editForm", "newProfile", "cityID", ""))
                    dispatch(Action("profile/editForm", "newProfile", "cityName", ""))
                    dispatch(Action("page/setDropdown", x))
                }   
            }
            return () =>{
                dispatch(Action("page/setDropdown", x))
            }
        },
        Edit(attribute){
            return (e) =>{
                dispatch(Action("profile/editForm", "newProfile", attribute, e.target.value))  
            }
        },
        Close(){
            return()=>{
                dispatch(Action("profile/resetNewProfile"))
                dispatch(push('/profile'))
            }
        },

        Save(city, province, bank){
            const msg = "Apakah Semua Data yang Diperbaharui Telah Benar?"
            return()=>{
                dispatch(Action("profile/editForm", "newProfile", 'cityID', city))
                dispatch(Action("profile/editForm", "newProfile", 'stateID', province))
                dispatch(Action("profile/editForm", "newProfile", 'bankID', bank))  
                dispatch(Action("page/setModal", "question", "profile/postNewProfile",msg , "update"))
                dispatch(Action("page/showModal", true))
            }
        },
        EditDate(x){
            dispatch(Action("profile/editForm", "newProfile", 'birth', x))
        }
        
    }
}

export default connect(StateToProps, PropsToDispatch)(Content)
