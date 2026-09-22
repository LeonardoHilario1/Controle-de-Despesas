import React from 'react'


function ListTransaction({transaction}) {
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
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default ListTransaction