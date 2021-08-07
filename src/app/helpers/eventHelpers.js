export const loadEvents = (result, event) => {
  const composedEvent = {
    id: event[0],
    eventData: event[1],
  };
  result.push(composedEvent);
  return result;
};

// eventCount represents number of weeks, multiply number of weeks(to get total days) to calculate how much to add up to default start time
export const createOccurrences = (eventCount, eventId, defaultStartTime, eventType) => {
  const occurrences = {};

  for (let i = 0; i <= eventCount; i++) {
    let increaseByDays = i * 7;
    let time = defaultStartTime.getTime();
    if (increaseByDays) {
      time = defaultStartTime.getTime() + (increaseByDays * 86400000);
    }
    occurrences[time] = {
      eventId: eventId,
      creationTime: time,
      eventType,
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
