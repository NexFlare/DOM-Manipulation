
export const debounce = function(fn, time){
    let timer;
    return (args)=>{
        return new Promise((resolve)=>{
            if(timer)
                clearTimeout(timer);
            timer = setTimeout(()=>{
                 resolve(fn.call(this, args))
            },time)
        })
        
    }
    
}