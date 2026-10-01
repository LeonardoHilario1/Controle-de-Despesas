import React, { useContext, useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Header from './Header'
import { UserContext } from '../context/UserContext'

function Resume() {
    const { token, usuario } = useContext(UserContext)
    const [summary,setSummary]=useState(null)


    async function getSummary() {
        try {
            const buscarData = await fetch("http://localhost:5000/api/IaGenerations/summary", {
                method: "GET",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
            })

            const resultSummary = await buscarData.json()

            if (!buscarData.ok) {
                console.log(resultSummary.error)
                return
            }

            setSummary(resultSummary)

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getSummary()
    },[])

    return (
        <>
            <Header />
            <h1>Resume</h1>

            <h2>Resumo do seu controle de Despesas</h2>
            <p>{summary?.text}</p>
            <Footer />
        </>
    )
}

export default Resume