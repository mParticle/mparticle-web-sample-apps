function UserAttributeHandler(common) {
    this.common = common || {};
}
UserAttributeHandler.prototype.onRemoveUserAttribute = function (
    key,
    mParticleUser,
) {
    console.log('side loaded kit onRemoveUserAttribute called');
};
UserAttributeHandler.prototype.onSetUserAttribute = function (
    key,
    value,
    mParticleUser,
) {
    console.log('side loaded kit onSetUserAttribute called');
};
UserAttributeHandler.prototype.onConsentStateUpdated = function (
    oldState,
    newState,
    mParticleUser,
) {
    console.log('side loaded kit onConsentStateUpdated called');
};

module.exports = UserAttributeHandler;
