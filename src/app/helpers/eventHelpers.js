export const loadEvents = (result, event) => {
  const composedEvent = {
    id: event[0],
    eventData: event[1],
  };
  result.push(composedEvent);
  return result;
};

export const createOccurrences = (eventCount, eventId, defaultStartTime) => {
  const occurrences = {};
  for (let i = 0; i < eventCount; i++) {
    let increaseWeeks = i * 7;
    let time = defaultStartTime.getTime();
    if (increaseWeeks) {
      time = defaultStartTime.setDate(increaseWeeks);
    }
     occurrences[time] = {
      creationTime: time,
       eventId: eventId,
      attendance: ["luk", "nervy", "trpelivost"],
    };
  }
  return occurrences;
};
