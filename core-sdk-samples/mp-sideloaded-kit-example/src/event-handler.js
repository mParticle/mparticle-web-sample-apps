function EventHandler(common) {
  this.common = common || {};
}
EventHandler.prototype.logEvent = function (event) {
  console.log("side loaded kit logEvent called");
  console.log(event);
};
EventHandler.prototype.logError = function (event) {
  console.log("side loaded kit logError called");
  console.log(event);
};
EventHandler.prototype.logPageView = function (event) {
  console.log("side loaded kit logPageView called");
  console.log(event);
};

module.exports = EventHandler;
