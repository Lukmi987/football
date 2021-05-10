export const loadEvents = (result, event) => {
  const composedEvent = {
    id: event[0],
    eventData: event[1],
  };
  result.push(composedEvent);
  return result;
};

export const createOccurrences = (eventCount, eventId, defaultStartTime, eventType) => {
  const occurrences = {};
  const attendance = [{userId: '', attendance: ''}];
  for (let i = 0; i <= eventCount; i++) {
    let increaseWeeks = i * 7;
    let time = defaultStartTime.getTime();
    if (increaseWeeks) {
      time = defaultStartTime.setDate(defaultStartTime.getDate() + increaseWeeks);
    }
    occurrences[time] = {
      eventId: eventId,
      creationTime: time,
      eventType,
      attendance
    };
  }
  return occurrences;
};

export function groupBy(list, keyGetter) {
  const map = new Map();
  list.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}
