import React, { useContext, useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Header from './Header'
import { Form, set, useForm } from 'react-hook-form'
import { UserContext } from '../context/UserContext'
import ListTransaction from '../components/ListTransaction'

function Home() {
  const { register, handleSubmit, reset } = useForm()
  const { token, setToken, usuario, setUsuario } = useContext(UserContext)
  const [alldata, setAllData] = useState([])

  const onSubmit = async (dados) => {
    const dadosFormatados = {
      ...dados,
      amount: Number(dados.amount)
    }
    try {
      const createTransaction = await fetch("http://localhost:5000/api/transaction/create", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(dadosFormatados)
      })

      const result = await createTransaction.json()

      if (!createTransaction.ok) {
        throw new Error(result.error || "Erro ao criar usuario")
      }
      reset()
      getData()

    } catch (error) {
      console.log(error)
    }
  }
    async function getData() {
      try {
        const searchData = await fetch("http://localhost:5000/api/transaction/all", {
          method: "GET",
          headers: { "Content-Type": "application/json", Authorization: `bearer ${token}` }
        })

        const resultGet = await searchData.json()
        setAllData(resultGet)
      } catch (error) {
        console.log(error)
      }

      
    }
    useEffect(()=>{
      getData()
    },[])

  return (
    <div>
      <Header />
      <h1>Home</h1>
      <h2>Welcome,{usuario?.name}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="type">Select the type:</label>
        <select id="type" {...register('type')}>
          <option value="INCOME">INCOME</option>
          <option value="EXPENSE">EXPENSE</option>
        </select>
        <input type='number' {...register('amount')} placeholder='amount'></input>
        <input type='text' {...register('category')} placeholder='category'></input>
        <input type='text' {...register('description')} placeholder='Description'></input>
        <button type='submit'>Enviar</button>
      </form>
      <span></span>

      <ListTransaction transaction={alldata}/>
      <Footer />

      //adicionar a lista do que criou no components
    </div>
  )
}

export default Home