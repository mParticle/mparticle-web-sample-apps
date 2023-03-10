var sessionHandler = {
    onSessionStart: function(event) {
        console.log("side loaded kit onSessionStart called");
    },
    onSessionEnd: function(event) {
        console.log("side loaded kit onSessionEnd called");
    }
};

module.exports = sessionHandler;
