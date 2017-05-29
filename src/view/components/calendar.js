import React from 'react'
import DatePicker from 'react-datepicker'
import Moment from 'moment'

import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css'; 

function Calendar({selected, className, onChange}) {
    return (
        <DatePicker className={className} selected={Moment(selected)} onChange={(date) => (onChange(date.toDate()))} />
    )
}

export default Calendar
