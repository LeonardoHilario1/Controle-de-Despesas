import React, { useContext } from 'react'
import { Form, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { Link } from 'react-router'
import { UserContext } from '../context/UserContext'

function Login() {
    const navigate=useNavigate()
    const{register,handleSubmit,reset}=useForm()
    const { usuario, setUsuario, token, setToken } = useContext(UserContext)

    const onSubmit=async(dados)=>{
        try{
            const loginData= await fetch("http://localhost:5000/api/user/login",{
                method:"POST",
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(dados)
            })

            const result= await loginData.json()

            if(!loginData.ok){
                throw new Error(result.error || "Erro ao validar o login")
            }
            
            //falta guardar os valores no contexto geral
            
            setToken(result.token)
            setUsuario(result.usuarioSemSenha)
            
            console.log("Bem vindo ao site")
            reset()
            navigate('/Home')
        }catch(error){
            console.log(error)
        }
    }
  
    return (
    
    <>
        <h1>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type='email' {...register('email')} placeholder="Email"></input>
            <input type='password' {...register('password')} placeholder='Password'></input>
            <button type='submit'>Sign in</button>
        </form>
        <p>Create a account</p>
        <Link to={'/SignUp'}>SignUp</Link>
    </>
  )
}

export default Login