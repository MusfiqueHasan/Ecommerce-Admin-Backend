const express = require("express");
const routes = express.Router();
const Utils = require("../../Utils/Utils");
const CalendarQuery = require("../../Querry/Calender/Calender");
const { CalenderEvent } = require("../../Modles/Calendars");
const HTTPStatus = require("../../HTTPStatus");

// /calendar/events
routes.get("/calendar/events/:id", async (req, res) => {
  const { id } = req.params;
  const { calendar } = req.query;
  console.log(calendar);
  const calenderList = calendar ? JSON.parse(calendar) : null;
  try {
    let response = [];
    let calenderEventList = [];
    if (calenderList.length != 0) {
      response = await CalendarQuery.getEvent(id, calenderList);

      calenderEventList = response.map(item => CalenderEvent({ ...item }));
    }
    const jsonObject = {
      massage: "Success",
      results: [...calenderEventList],
    };
    res.status(HTTPStatus.OK).json(jsonObject);
  } catch (error) {
    console.log(error);
    res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ massage: "Internal Server Error!" });
  }
});

routes.post("/calender/add-event/:id", async (req, res) => {
  console.log(req.body.event);
  const { id } = req.params;

  const { event } = req.body;
  const { extendedProps } = event;
  const title = event.title;
  const start = event.start
    ? Utils.stringToTimeStamp(event.start)
    : Utils.getTimeStamp();
  const end = event.end
    ? Utils.stringToTimeStamp(event.end)
    : Utils.getTimeStamp();
  const allDay = event.allDay || false;
  const calender = extendedProps.calendar;
  const url = extendedProps.url || "";
  const location = extendedProps.location || "";
  const description = extendedProps.desc || "";

  if (!title || title.length === 0)
    return res.status(400).json({ massage: "Title is empty" });

  const calenderEvent = [
    [title, start, end, allDay, url, calender, location, description],
  ];

  try {
    const response = await CalendarQuery.insertEvent([calenderEvent]);
    const eventId = response.insertId;

    const userAndEventData = [[id, eventId]];
    await CalendarQuery.insertUserEvent([userAndEventData]);
    const jsonObject = {
      massage: "Successfully Inserted!",
    };

    res.status(HTTPStatus.OK).json(jsonObject);
  } catch (error) {
    console.log(error);
    res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ massage: "Internal Server Error" });
  }
});

routes.patch("/calendar/update-event", async (req, res) => {
  const { event } = req.body;
  const { extendedProps } = event;
  const id = parseInt(event.id);
  const title = event.title;
  const start = event.start
    ? Utils.stringToTimeStamp(event.start)
    : Utils.getTimeStamp();
  const end = event.end
    ? Utils.stringToTimeStamp(event.end)
    : Utils.getTimeStamp();
  const allDay = event.allDay || false;
  const calender = extendedProps.calendar;
  const url = extendedProps.url || "";
  const location = extendedProps.location || "";
  const description = extendedProps.desc || "";

  if (!title || title.length === 0)
    return res.status(400).json({ massage: "Title is empty" });

  const calenderEvent = [
    title,
    start,
    end,
    allDay,
    url,
    calender,
    location,
    description,
  ];   
  console.log(calenderEvent)
  try {
    await CalendarQuery.updateEvent(id, calenderEvent);

    const jsonObject = {
      massage: "Success",
    };
    res.status(HTTPStatus.OK).json(jsonObject);
  } catch (error) {
    console.log(error);
    res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ massage: "Internal Server Error!" });
  }
});

// /calendar/events
routes.delete("/calendar/events/:userId/:eventId", async (req, res) => {
  const { userId, eventId } = req.params;
  console.log(userId);
  try {
    const response = await CalendarQuery.deleteEvent([eventId]);
    await CalendarQuery.deleteUserEvent([userId, eventId]);

    const jsonObject = {
      massage: "Success",
    };
    res.status(HTTPStatus.OK).json(jsonObject);
  } catch (error) {
    console.log(error);
    res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ massage: "Internal Server Error!" });
  }
});

module.exports = routes;
