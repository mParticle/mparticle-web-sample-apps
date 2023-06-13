const logEventButton = document.getElementById('js-log-event');
logEventButton.addEventListener('click', () => {
    console.log('logging event');
    mParticle.logEvent('Test Event');
});
