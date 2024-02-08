const moment = require("moment-timezone");


function formatMessage( username, text, userTimeZone) {

    // const timeZone = 'Australia/Sydney'; // Set the timezone to Sydney
  return {
    username,
    text,
    time: moment().tz(userTimeZone).format("h:mm a"),
  };
}

module.exports = formatMessage;