var initialization = {
  name: "SampleSideLoadedKit",
  initForwarder: function (
    forwarderSettings,
    testMode,
    userAttributes,
    userIdentities,
    processEvent,
    eventQueue,
    isInitialized,
    common,
    appVersion,
    appName,
    customFlags,
    clientId
  ) {
    console.log("initForwarder called");
  },
};

module.exports = initialization;
