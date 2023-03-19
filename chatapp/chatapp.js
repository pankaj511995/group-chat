const token=localStorage.getItem('username_group_chat')
const username=parseJwt(token)
const arr=['i joined','yes you ?','i will join soon pleasewait','how long should i wait','sorry for delay','yes we can start your discussion','ok let us start','thanks','i joined','yes you ?','i will join soon pleasewait','how long should i wait','sorry for delay','yes we can start your discussion','ok let us start','thanks','i joined','yes you ?','i will join soon pleasewait','how long should i wait','sorry for delay','yes we can start your discussion','ok let us start','thanks','i joined','yes you ?','i will join soon pleasewait','how long should i wait','sorry for delay','yes we can start your discussion','ok let us start','thanks']

const allchat=document.getElementById('listOfAllChat')

function addInChatBox(message,myself){
        let li=document.createElement('li')
        li.appendChild(document.createTextNode(message))
        if(myself){
            li.className='chatList_item_user'
        }else{
            li.className='chatList_item_otheruser'
        }
        allchat.appendChild(li)    
}



document.getElementById('sendessage').addEventListener('click',async(e)=>{
    try{
    e.preventDefault()
    const message=document.getElementById('inputfield').value
    const result= await axios.post('http://localhost:3000/message/send',{message:message},{headers:{'token':token}})
    addInChatBox(message,true)
    document.getElementById('inputfield').value=''
}catch(err){
    
    console.log(err,'error while sending message')
}
})
document.addEventListener('DOMContentLoaded',async()=>{
    const result= await axios.get('http://localhost:3000/message/allmessage',{headers:{'token':token}})
    console.log(result.data)
    result.data.forEach(e=>{
        if(username.id===e.UserId){
            addInChatBox(e.message,true)
        }else{
            addInChatBox(e.message,false)
        }
    })
})

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}