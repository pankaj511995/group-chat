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
         const data= await axios.post('http://localhost:3000/user/removemember',{groupId:active_uer.groupId,userId:value},{headers:{'token':token}})
            showallmember.removeChild(li)
            alert(data.data.message)
        }
        }
        
        showallmember.appendChild(li) 
    }catch(err){
        console.log('error while deleing item ')
    }
}

document.getElementById('all_member').addEventListener('click',async(e)=>{
    try{
            e.preventDefault()
            const active_uer=JSON.parse(localStorage.getItem('active_group_id'))
            const token=localStorage.getItem('username_group_chat')
            const username=await parseJwt(token)
            const result= await axios.post('http://localhost:3000/user/allmember',{groupId:active_uer.groupId},{headers:{'token':token}})
        let admin=(result.data.admin===username.id)
        console.log(admin, 'admin is')
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
            const result= await axios.post('http://localhost:3000/user/addmember',{groupId:active_uer.groupId,groupname:active_uer.groupName,newmember:member},{headers:{'token':token}})
            console.log(active_uer)
    }catch(err){
        alert(err.response.data.message)
    }
})