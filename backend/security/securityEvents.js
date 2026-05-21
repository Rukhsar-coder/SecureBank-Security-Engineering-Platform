const securityEvents = [];

const addSecurityEvent = (event) => {
  securityEvents.unshift({
    id: Date.now(),

    timestamp: new Date().toISOString(),

    ...event,
  });
};

const getSecurityEvents = () => {
  return securityEvents.slice(0, 20);
};

module.exports = {
  addSecurityEvent,
  getSecurityEvents,
};
