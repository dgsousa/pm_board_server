const todoActionListeners = require('./todoActionListeners');

const actionListenersMap = {
    ...todoActionListeners,
}


const mapToActionListener = (request) => {
    const { type } = request;
    return actionListenersMap[type](request);
}

module.exports = mapToActionListener;