function CommerceHandler(common) {
    this.common = common || {};
}

CommerceHandler.prototype.logCommerceEvent = function(event) {
    console.log("side loaded kit logCommerceEvent called");
    console.log(event);
};

module.exports = CommerceHandler;
