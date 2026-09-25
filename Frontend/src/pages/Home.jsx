import React, { useContext, useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Header from './Header'
import { useForm } from 'react-hook-form'
import { UserContext } from '../context/UserContext'
import ListTransaction from '../components/ListTransaction'

function Home() {
  const { register, handleSubmit, reset } = useForm()
  const { register: registerEdit, handleSubmit: handleSubmitEdit, setValue } = useForm()
  const { token, usuario } = useContext(UserContext)
  const [alldata, setAllData] = useState([])
  const [modalAberto, setModalAberto] = useState(false)
  const [transacaoEdit, setTransacaoEdit] = useState(null)

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
        throw new Error(result.error || "Erro ao criar transação")
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
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
      })

      const resultGet = await searchData.json()
      setAllData(resultGet)
    } catch (error) {
      console.log(error)
    }
  }

  async function editTransaction(dados, id) {
    try {
      const editData = await fetch(`http://localhost:5000/api/transaction/edit/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(dados)
      })

      const result = await editData.json()

      if (!editData.ok) {
        throw new Error(result.error || "Erro ao editar transação")
      }

      getData()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData()
  }, [])


  //mostrar o total das despesas
  const totalDespesas = alldata.reduce((acumulador, valorExpense) => {
    const { type, amount } = valorExpense

    if (!acumulador[type]) {
      acumulador[type] = 0;
    }

    acumulador[type] += amount

    return acumulador
  }, {})

  useEffect(() => {
    if (transacaoEdit) {
      setValue('type', transacaoEdit.type)
      setValue('amount', transacaoEdit.amount)
      setValue('category', transacaoEdit.category)
      setValue('description', transacaoEdit.description)
    }
  }, [transacaoEdit])

  const onEditSubmit = async (dados) => {
    const dadosFormatados={
      ...dados,
      amount:Number(dados.amount)
    }

    await editTransaction(dadosFormatados, transacaoEdit.id)
    
    setModalAberto(false)
    setTransacaoEdit(null)
  }

  async function deleteTransaction(id) {
    try{
      const delData=await fetch(`http://localhost:5000/api/transaction/delete/${id}`,{
        method:"DELETE",
        headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`}
      })

      const resultDel= await delData.json()

      if(!delData.ok){
        throw new Error(resultDel.error || "Erro ao Excluir transação")
      }
      getData()
    }catch(error){
      console.log(error)
    }
  }

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

      <ListTransaction
        transaction={alldata}
        onClick={(transacaoClicada) => {
          setTransacaoEdit(transacaoClicada)
          setModalAberto(true)
        }}        onClickDel={((transacaoClicada)=> deleteTransaction(transacaoClicada.id))}

      />

      <h3>Total de Despesas</h3>
      {totalDespesas.EXPENSE}

      <h3>Total de Entrada</h3>
      {totalDespesas.INCOME}

      {modalAberto && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div style={{ backgroundColor: 'white', padding: '20px', margin: '100px auto', width: '300px' }}>
            <h3>Editar transação</h3>
            <form onSubmit={handleSubmitEdit(onEditSubmit)}>
              <select {...registerEdit('type')}>
                <option value="INCOME">INCOME</option>
                <option value="EXPENSE">EXPENSE</option>
              </select>
              <input type='number' {...registerEdit('amount')} />
              <input type='text' {...registerEdit('category')} />
              <input type='text' {...registerEdit('description')} />
              <button type='submit'>Salvar</button>
              <button type='button' onClick={() => setModalAberto(false)}>Cancelar</button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default Home