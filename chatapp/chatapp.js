const token=localStorage.getItem('username_group_chat')
const username=parseJwt(token)
const perpage=5
const allchat=document.getElementById('listOfAllChat')

function addInChatBox(message,name,myself){
        let li=document.createElement('li')
        li.appendChild(document.createTextNode(message))
        let nameofuser=document.createElement('li')
        nameofuser.appendChild(document.createTextNode(name))
        nameofuser.className='user_name_print'
        if(myself){
            li.className='chatList_item_user'
            nameofuser.className='user_name_print'
        }else{
            li.className='chatList_item_otheruser'
            nameofuser.className='other_name_print'
        }
        allchat.appendChild(nameofuser)
        allchat.appendChild(li)    
     
}



document.getElementById('sendessage').addEventListener('click',async(e)=>{
    try{
    e.preventDefault()
    const message=document.getElementById('inputfield').value
    const result= await axios.post('http://localhost:3000/message/send',{message:message},{headers:{'token':token}})
    addInChatBox(message,username.name,true)
    const storageitem=localStorage.getItem('user_chat_all')
    let store=[]
    if(storageitem){
        store=JSON.parse(storageitem)
        if(store.length>perpage){
            const length=store.length
            store=store.slice(length-perpage)
        }
    }
    store.push(result.data)
    localStorage.setItem('user_chat_all',JSON.stringify(store))
    document.getElementById('inputfield').value=''
}catch(err){
    
    console.log(err,'error while sending message')
}
})
document.addEventListener('DOMContentLoaded',async()=>{
    const result=localStorage.getItem('user_chat_all')
    if(result){
        localstoragecall(JSON.parse(result))
    }
})
function localstoragecall(arr){
    allchat.innerHTML=''
    arr.forEach(e=>{
        if(username.id===e.UserId){
            addInChatBox(e.message,e.name,true)
        }else{
            addInChatBox(e.message,e.name,false)
        }
    })
}
setInterval(async()=>{
    try{
        const token=localStorage.getItem('username_group_chat')
    const result1=localStorage.getItem('user_chat_all')
    if(result1){
        const result=JSON.parse(result1)
    const lastmessage=result[result.length-1].id
     const newmessage= await axios.get(`http://localhost:3000/message/newmessage?lastmessage=${lastmessage}`,{headers:{'token':token}})
     if(newmessage.data.length>0){
        newmessage.data.forEach(e=>{
             addInChatBox(e.message,e.name,false)
        })
  
    let store=[]
    store=[...result,...newmessage.data]
        if(store.length>perpage){
            const length=store.length
            store=store.slice(length-perpage)
        }
    localStorage.setItem('user_chat_all',JSON.stringify(store))
    }
   
    }
}catch(err){
    console.log('sorry timer failed')
}
},5000)



function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}