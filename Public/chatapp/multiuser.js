function showallgroupmember(name,value){
    let li=document.createElement('button')
        li.appendChild(document.createTextNode(name))
        li.value=value
        li.className='group'
        li.name=name
        let del=document.createElement('button')
        del.appendChild(document.createTextNode('X'))
        // li.appendChild(del)
        showallmember.appendChild(li) 
}

document.getElementById('all_member').addEventListener('click',async(e)=>{

    e.preventDefault()
    const active_uer=JSON.parse(localStorage.getItem('active_group_id'))
    const token=localStorage.getItem('username_group_chat')
    const result= await axios.post('http://localhost:3000/user/allmember',{groupId:active_uer.groupId},{headers:{'token':token}})
   
    result.data.forEach(e=>showallgroupmember(e.name,e.id))
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