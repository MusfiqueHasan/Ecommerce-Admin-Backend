const CalenderEvent = (calenderEvent) =>{

    const calendarObject = {
        title : calenderEvent.title,
        start : calenderEvent.start,
        end   : calenderEvent.end,
        allDay: calenderEvent.allDay,
        id: calenderEvent.calendar_id,
        extendedProps:{
            url: calenderEvent.url,
            calendar: calenderEvent.calendar,
            location: calenderEvent.location,
            desc: calenderEvent.description
        }
    }
    return calendarObject
}
module.exports = {CalenderEvent}