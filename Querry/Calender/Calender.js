const PromiseModule = require("../../helpers/Promise/PromiseModule");

const Calender = {
  insertEvent,
  getEvent,
  insertUserEvent,
  deleteUserEvent,
  deleteEvent,
  updateEvent
};
async function getEvent(userId, calendar) {
  console.log(calendar);
  const sqlSearch = `Select * from calender,calendar_user WHERE calender.calendar_id = calendar_user.calendar_id AND calendar_user.user_id = ${userId}`;
  const sqlSearchFilter = `Select * from calender,calendar_user WHERE calender.calendar_id = calendar_user.calendar_id AND calendar_user.user_id = ${userId} And calender.calendar In (?)`;
  if (!calendar) return PromiseModule.readData(sqlSearch);
  return PromiseModule.createUpdateDelete(sqlSearchFilter, [calendar]);
}

async function insertEvent(insertedData) {
  console.log(insertedData);
  const sqlInsert =
    "Insert Into calender (title,start,end,allDay,url,calendar,location,description) Values?";
  return PromiseModule.createUpdateDelete(sqlInsert, insertedData);
}

async function insertUserEvent(insertedData) {
  const sqlInsert = "Insert Into calendar_user (user_id,calendar_id) Values?";
  return PromiseModule.createUpdateDelete(sqlInsert, insertedData);
}
async function deleteUserEvent(userId) {
  const sqlDelete =
    "Delete From calendar_user where user_id = ? And  calendar_id = ? ";
  return PromiseModule.createUpdateDelete(sqlDelete, userId);
}
async function deleteEvent(eventId) {
  const sqlDelete = "Delete From calender where calendar_id = ? ";
  return PromiseModule.createUpdateDelete(sqlDelete, eventId);
}

async function updateEvent(eventId,eventData){
    const sqlUpdate = `UPDATE calender SET title =  ?, start= ?,end = ?,allDay = ?,url = ?,calendar = ?,location = ?,description = ? WHERE calendar_id = ${eventId}`
    return PromiseModule.createUpdateDelete(sqlUpdate,eventData)
}
module.exports = Calender;
