function showallgroupmember(name,value,admin){
    try{
    let li=document.createElement('button')
        li.appendChild(document.createTextNode(name))
        li.value=value
        li.className='group_member'
        if(admin){
            let del=document.createElement('button')
        del.appendChild(document.createTextNode('X'))
        li.appendChild(del)
        del.className='delet_member'
        del.onclick=async()=>{
            const active_uer=JSON.parse(localStorage.getItem('active_group_id'))
            const token=localStorage.getItem('username_group_chat')
         const data= await axios.post('http://localhost:3000/group/removemember',{groupId:active_uer.groupId,userId:value},{headers:{'token':token}})
            showallmember.removeChild(li)
            alert(data.data.message)
        }
        }
        
        showallmember.appendChild(li) 
    }catch(err){
        console.log('error while deleing item ')
    }
}
function removefromgroup(groupId){
    const localgroup=localStorage.getItem('all_group_list')
    if(localgroup){
        const arr=JSON.parse(localgroup)
        let store=arr.filter(e=>e.groupId!=groupId)
        localStorage.setItem('all_group_list',JSON.stringify(store))
        alert('you does not exit so removing from group')
    }
}
document.getElementById('all_member').addEventListener('click',async(e)=>{
    try{
            e.preventDefault()
            const active_uer=JSON.parse(localStorage.getItem('active_group_id'))
            const token=localStorage.getItem('username_group_chat')
            const username=await parseJwt(token)
        const lasstvalue=0
            const result= await axios.post('http://localhost:3000/group/allmember',{groupId:active_uer.groupId,lastcheck:lasstvalue},{headers:{'token':token}})
            if(result.data.data.length===0){
                console.log('remove me')
                removefromgroup(active_uer.groupId)
            }
        let admin=(result.data.admin===username.id)
        showallmember.innerHTML=''
        console.log(result.data.data)
            result.data.data.forEach(e=>showallgroupmember(e.name,e.id,admin))
    }catch(err){
        console.log('error while displaying all member ')
    }
})

document.getElementById('add_member_in_group').addEventListener('click',async(e)=>{
    try{
            e.preventDefault()
            const member=document.getElementById('add_member').value
            const token=localStorage.getItem('username_group_chat')
            const active_uer=JSON.parse(localStorage.getItem('active_group_id'))
            const result= await axios.post('http://localhost:3000/group/addmember',{groupId:active_uer.groupId,groupname:active_uer.groupName,newmember:member},{headers:{'token':token}})
            alert(result.data.message)
    }catch(err){
        alert(err.response.data.message)
    }
})

document.getElementById('sendfile').addEventListener('click',async(e)=>{
    e.preventDefault()
    const token=localStorage.getItem('username_group_chat')
    const imagefile=document.getElementById('imagesend')
    // const fileimage=[]
    const formData=new FormData()
    formData.append('files',imagefile.files[0])
     fetch(`http://localhost:3000/message/image`,{
        method:'POST',
        body:formData,
        headers: {
            "token":token,
            "groupId":JSON.parse(localStorage.getItem('active_group_id')).groupId
            
          },
    },{headers:{'token':token}}).then(data=>{
        console.log(data)
    })
    
   
})

document.getElementById('getimage').addEventListener('click',async(e)=>{
    e.preventDefault()
    const token=localStorage.getItem('username_group_chat')
    console.log('click')
    const imagekey='1679675617325'
    const result= await axios.get(`http://localhost:3000/message/getimage/${imagekey}`,{headers:{'token':token}})
    document.getElementById('imageshow').innerHTML=`<image src= ></image>`
    console.log(result,'display image')
})

