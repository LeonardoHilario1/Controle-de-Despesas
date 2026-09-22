import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'

function SignUp() {
    const{register,handleSubmit,reset}=useForm()
    const navigate=useNavigate()
    
    const onSubmit = async (dados) => {
        try {
            const searchCreate = await fetch("http://localhost:5000/api/user/create", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados)
            })

            const result = await searchCreate.json(); // lê o corpo, dê certo ou erro

            if (!searchCreate.ok) {
                throw new Error(result.error || "Erro ao criar usuário");
            }

            
            console.log("Criado com sucesso", result)
            reset()
            navigate('/Login')

        } catch (error) {
            console.error(error)
        }
    }
    return (
        <>
        <h1>Cadastro</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type='text' {...register('name')} placeholder="name" />
            <input type='email' {...register("email")} placeholder="email"/>
            <input type='password'{...register("password")} placeholder='password'/>
            <button type="submit">Enviar</button>
        </form>
        <p>Ja tem login?</p>
        <Link to={'/Login'}>ir para o login</Link>
        </>
  )
}

export default SignUp