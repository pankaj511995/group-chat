const arr=['i joined','yes you ?','i will join soon pleasewait','how long should i wait','sorry for delay','yes we can start your discussion','ok let us start','thanks']

const allchat=document.getElementById('listOfAllChat')

function show(){
    arr.forEach((e,i)=>{
        let li=document.createElement('li')
        li.appendChild(document.createTextNode(e))
        if(i===1||i===5){
            li.className='chatList_item'
        }
        
        allchat.appendChild(li)
    })
}
show()