function IdentityHandler(common) {
  this.common = common || {};
}
IdentityHandler.prototype.onUserIdentified = function (mParticleUser) {
    console.log("side loaded kit onUserIdentified called");
};
IdentityHandler.prototype.onIdentifyComplete = function (
  mParticleUser,
  identityApiRequest
) {
  console.log("side loaded kit onIdentifyComplete called");
};
IdentityHandler.prototype.onLoginComplete = function (
  mParticleUser,
  identityApiRequest
) {
  console.log("side loaded kit onLoginComplete called");
};
IdentityHandler.prototype.onLogoutComplete = function (
  mParticleUser,
  identityApiRequest
) {
  console.log("side loaded kit onLogoutComplete called");
};
IdentityHandler.prototype.onModifyComplete = function (
  mParticleUser,
  identityApiRequest
) {
  console.log("side loaded kit onModifyComplete called");
};

module.exports = IdentityHandler;
