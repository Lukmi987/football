export const loadEvents = (result, event) => {
  const composedEvent = {
    id: event[0],
    eventData: event[1],
  };
  result.push(composedEvent);
  return result;
};
