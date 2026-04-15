
function numero() {
    return new Promise(callback => {
        setTimeout(() => {
            callback(Math.floor(Math.random() * 10) + 1)
        }, Math.random() * 2000)
    })
}

(async () => {
    let total = await numero()
    let n = await numero()
    
    total += n
    
    n = await numero()
    
    total += n
    
    console.log(total);


})()    
