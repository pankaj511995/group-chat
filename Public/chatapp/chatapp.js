const allchat=document.getElementById('listOfAllChat')
const showGroup=document.getElementById('sidebar')
const showallmember= document.getElementById('show_all_member')

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
async function localstoragecall(arr){
    const token=localStorage.getItem('username_group_chat')
    const username=await parseJwt(token)
    arr.forEach(e=>{
        if(username.id===e.UserId){
            addInChatBox(e.message,e.name,true)
        }else{
            addInChatBox(e.message,e.name,false)
        }
    })
}
function storeInLocalStorage(result,newmessage,groupId){
    let store=[]
        store=[...result,...newmessage]
            if(store.length>10){
                const length=store.length
                store=store.slice(length-10)
            }
        localStorage.setItem(`user_chat_all${groupId}`,JSON.stringify(store))
}
function allGroupdetails(name,value){
    let li=document.createElement('button')
        li.appendChild(document.createTextNode(name))
        li.value=value
        li.className='group'
        li.name=name
        showGroup.appendChild(li)    
       
}
function addlocalstorageGroup(newMember){
    return new Promise((res,rej)=>{
    const group=localStorage.getItem('all_group_list')
    let result=[]
    if(group){
        result=JSON.parse(group)
    }
     store=[...result,...newMember]
    localStorage.setItem('all_group_list',JSON.stringify(store))
    res('true')
})
}
showGroup.addEventListener('click',async(e)=>{
    let grouphit=e.target.classList.contains('group')
    e.preventDefault()
    if(grouphit){
        const messageId=e.target.value
        document.getElementById('active_group').innerHTML=e.target.name
        localStorage.setItem('active_group_id',JSON.stringify({groupId:messageId,groupName:e.target.name}))
        allchat.innerHTML=''
        const allmessage= JSON.parse(localStorage.getItem(`user_chat_all${messageId}`))
        if(allmessage){
            localstoragecall(allmessage)
        }
        document.getElementById('add_member_in_group').className= 'addmember';
        showallmember.innerHTML=''
        showallmember.value=''
    }
})
  document.getElementById('sendessage').addEventListener('click',async(e)=>{
    try{
            e.preventDefault()
            const token=localStorage.getItem('username_group_chat')
            const username=await parseJwt(token)
            const message=document.getElementById('inputfield').value
            const messageId=JSON.parse(localStorage.getItem('active_group_id')).groupId
            const result= await axios.post('http://localhost:3000/message/send',{message:message,groupId:messageId},{headers:{'token':token}})
            addInChatBox(message,username.name,true)
            const storageitem=localStorage.getItem(`user_chat_all${messageId}`)
            if(storageitem){
             storeInLocalStorage(JSON.parse(storageitem),[result.data],messageId)
            }else{
                storeInLocalStorage([],[result.data],messageId)
            }

            document.getElementById('inputfield').value=''
     }catch(err){
            console.log('error while sending messsage ')
    }
    
})
    




// setTimeout(async()=>{
//     try{
//         const token=localStorage.getItem('username_group_chat')
//     const result1=localStorage.getItem('user_chat_all')
//     if(result1){
//         const result=JSON.parse(result1)
//     const lastmessage=result[result.length-1].id
//      const newmessage= await axios.get(`http://localhost:3000/message/newmessage?lastmessage=${lastmessage}`,{headers:{'token':token}})
//      if(newmessage.data.length>0){
//         newmessage.data.forEach(e=>{
//              addInChatBox(e.message,e.name,false)
//         })
  
//  
   
//     }
// }catch(err){
//     console.log('sorry timer failed')
// }
// },5000)


document.addEventListener('DOMContentLoaded',async()=>{
    const token=localStorage.getItem('username_group_chat')
    const allgroup= await axios.post('http://localhost:3000/user/allnewadded',{lastcheck:0},{headers:{'token':token}})
    
    let  arr=[]
    allgroup.data.forEach(e=>arr.push({"groupId":Number(e.id),"groupName":e.groupname}))
    localStorage.setItem('all_group_list',JSON.stringify(arr))
    // await addlocalstorageGroup(arr)
    const result=localStorage.getItem('all_group_list')
    if(result){
        const group=JSON.parse(result)
        group.forEach(e=> allGroupdetails(e.groupName,e.groupId))
        }
        document.getElementById('add_member_in_group').className = 'addmember_hide';
})

document.getElementById('create_group_button').addEventListener('click',async(e)=>{
    try{
        e.preventDefault()
        const token=localStorage.getItem('username_group_chat')
       const groupname=document.getElementById('create_group').value
       const result= await axios.post('http://localhost:3000/user/creategroup',{groupname:groupname},{headers:{'token':token}})
      addlocalstorageGroup([{"groupId":Number(result.data),"groupName":groupname}])
       allGroupdetails(groupname,result.data)
    }catch(err){
        console.log('error while making group')
    }

})

document.getElementById('all_member_hide').addEventListener('click',(e)=>{
    e.preventDefault()
    showallmember.value=''
    showallmember.innerHTML=''
})



function parseJwt (token) {
    return new Promise((resolve,reject)=>{
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    resolve( JSON.parse(jsonPayload));
})
}