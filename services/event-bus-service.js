export const eventBusService = { on, showUserMsg,emit }
function on(eventName, listener) {
 
    
    
    const callListener = ({ detail }) => {
        listener(detail);
    }
    
    window.addEventListener(eventName, callListener)
    
    return () => {
        window.removeEventListener(eventName, callListener)
    }
}


function emit(eventName, data) {
    window.dispatchEvent(new CustomEvent(eventName, { detail: data }))
}

 function showUserMsg(txt, type = '') {
    eventBusService.emit('show-user-msg', { txt, type })
}
