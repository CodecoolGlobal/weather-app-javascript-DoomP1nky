const thisDojo = {
  facilitator: {
    name:'Artúr',
    height: 180,
  },
  attendees:[
    {
      name: 'Laci',
      height: 180,
    },
    {
      neme: 'Timi',
      height: 165,
    },
  ],
};

//legmagasabb
function getTallestAttendee(dojo) {
  if (dojo.attendees.length) {
    return undefined;
  }
  let tallestAttendee = dojo.attendees[0];
  for (const attendee of attendees) {
    if (tallestAttendee.height < attendee.height) {
      tallestAttendee = attendee;
    }
  }
  return tallestAttendee.name;
}


console.log(getTallestAttendee(thisDojo));
