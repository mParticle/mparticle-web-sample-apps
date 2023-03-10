/*
A non-ecommerce event has the following schema:

{
    DeviceId: "a80eea1c-57f5-4f84-815e-06fe971b6ef2",
    EventAttributes: {test: "Error", t: 'stack trace in string form'},
    EventName: "Error",
    MPID: "123123123123",
    UserAttributes: {userAttr1: 'value1', userAttr2: 'value2'},
    UserIdentities: [{Identity: 'email@gmail.com', Type: 7}]
    User Identity Types can be found here:
}

*/

function EventHandler(common) {
    this.common = common || {};
}
EventHandler.prototype.logEvent = function(event) {
    console.log("side loaded kit logEvent called");
    console.log(event);
};
EventHandler.prototype.logError = function(event) {
    console.log("side loaded kit logError called");
    console.log(event);
};
EventHandler.prototype.logPageView = function(event) {
    console.log("side loaded kit logPageView called");
    console.log(event);
    
};

module.exports = EventHandler;
