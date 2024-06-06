import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";

import LibrariesSidebar from '../partials/LibrariesSidebar'
import PageHeader from '../../../../Components/Common/PageHeader'
import { Col, Row } from 'react-bootstrap'
import AddEventModal from './partials/AddEventModal'

const Calendar = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [date, setDate] = useState('');

    const events = [
        { title: 'Meeting', start: new Date() }
    ]
    const handleDateClick = (e) => {
        setDate(e.date)
        setIsOpenModal(true)
    }
    return (
        <>
            <PageHeader title="Calendar" />
            <Row>
                <Col xxl={1}>
                    <LibrariesSidebar />
                </Col>
                <Col xxl={11}>
                    <div className='collaboration-calendar'>
                        <FullCalendar
                            plugins={[dayGridPlugin, interactionPlugin]}
                            initialView='dayGridMonth'
                            events={events}
                            headerToolbar={{
                                left: "prev,next title",
                                center: "",
                                right: "",
                            }}
                            droppable={true}
                            editable={true}
                            dayMaxEventRows={true}
                            dateClick={(e) => { handleDateClick(e); setIsEdit(true) }}
                            eventClick={() => { setIsEdit(false); setIsOpenModal(true); }}
                            themeSystem="bootstrap"
                            selectable={true}
                            contentHeight="500px"
                        />
                    </div>
                </Col>
            </Row>
            <AddEventModal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} onSave={() => { setIsOpenModal(false) }} isEdit={isEdit} setIsEdit={setIsEdit} date={date} />
        </>
    )
}

export default Calendar
