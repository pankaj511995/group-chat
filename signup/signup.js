

document.getElementById('submitform').addEventListener('click',async(e)=>{
    try{
    e.preventDefault()
    const obj={
        name:document.getElementById('name').value,
        email:document.getElementById('email').value,
        phone:document.getElementById('phone').value,
        password:document.getElementById('password').value
    }
    if(obj.name===''||obj.email===''||obj.phone===''||obj.password===''){
        return message('Oh! please fill all field')
    }
   const result= await axios.post('http://localhost:3000/user/signup',obj)
    message(result.data.message)
}catch(err){
    
    message(err.response.data.message)
}

})
function message(message){
    document.getElementById('error').innerHTML=message
}
