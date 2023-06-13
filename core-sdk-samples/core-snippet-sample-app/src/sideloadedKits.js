console.log('Loading Sideloaded Kits');

window.mParticle = window.mParticle || {};
window.mParticle.config = window.mParticle.config || {};
window.mParticle.config.sideloadedKits = [];

function sideLoadedKit(forwarderName, forwarderId) {
    const register = (config) => {
        if (!config.kits) {
            config.kits = {};
        }

        config.kits[this.name] = {
            constructor,
        };
    };

    const init = () => {};

    const constructor = function () {
        this.id = forwarderId || 0;
        this.name = forwarderName || 'SideloadedKit';
        this.init = init;

        window[this.name + this.id] = {
            instance: this,
        };
    };

    this.name = forwarderName || 'SideloadedKit';

    return {
        constructor,
        name: this.name,
        getId: () => this.id,
        register,
    };
}

const sidewinder = new sideLoadedKit('Sidewinder', 42);

window.mParticle.config.sideloadedKits.push(
    new window.mParticle.MPSideloadedKit(sidewinder)
);
