const token=localStorage.getItem('username_group_chat')
const username=parseJwt(token)

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
            addInChatBox(e.message,e.name,true)
        }else{
            addInChatBox(e.message,e.name,false)
        }
    })
})
setInterval(async()=>{
    allchat.innerHTML=''
    const result= await axios.get('http://localhost:3000/message/allmessage',{headers:{'token':token}})
    result.data.forEach(e=>{
        if(username.id===e.UserId){
            addInChatBox(e.message,e.name,true)
        }else{
            addInChatBox(e.message,e.name,false)
        }
    })
},2000)
function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}