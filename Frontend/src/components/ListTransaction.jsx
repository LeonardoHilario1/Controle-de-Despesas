import React from 'react'


function ListTransaction({transaction,onClick,onClickDel}) {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Categoria</th>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {transaction.map((t) => (
            <tr key={t.id}>
              <td>{t.type}</td>
              <td>{t.category}</td>
              <td>{t.description}</td>
              <td>{t.amount}</td>
              <td>{t.date}</td>
              <td><button onClick={()=> onClick(t)}>Editar</button></td>
              <td><button onClick={()=> onClickDel(t)}>Excluir</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default ListTransaction