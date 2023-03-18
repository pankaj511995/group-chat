

document.getElementById('signinuser').addEventListener('click',async(e)=>{
    try{
    e.preventDefault()
    const obj={
        email:document.getElementById('email').value,
        password:document.getElementById('password').value
    }
    if(obj.email===''||obj.password===''){
        return message('Oh! please fill all field')
    }
   const result= await axios.post('http://localhost:3000/user/signin',obj)
   localStorage.setItem('username_group_chat',result.data.token)
    message(result.data.message)
}catch(err){
    
    message(err.response.data.message)
}

})
function message(message){
    document.getElementById('error').innerHTML=message
}
