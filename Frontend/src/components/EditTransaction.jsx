import React from 'react'

function EditTransaction({ data }) {
    return (
        <>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="type">Select the type:</label>
                    <select id="type" {...register('type')}>
                        <option value="INCOME">INCOME</option>
                        <option value="EXPENSE">EXPENSE</option>
                    </select>
                    <input type='number' {...register('amount')} placeholder='amount'></input>
                    <input type='text' {...register('category')} placeholder='category'></input>
                    <input type='text' {...register('description')} placeholder='Description'></input>
                    <button type='submit'>Save</button>
                </form>

            </div>
        </>
    )
}

export default EditTransaction