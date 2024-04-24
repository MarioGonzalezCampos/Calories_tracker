import { useState, ChangeEvent } from "react"
import { Activity } from "../types"
import { categories } from "../data/categories"

const Form = () => {

    const [activity, setActivity] = useState<Activity>({
        category: 1,
        name: '',
        calories: 0
    })

    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => { // en el onChange de los inputs se pasa el evento { e => }
        const isNumberField = ['category', 'calories'].includes(e.target.id) // si el id del input es category o calories
        
        setActivity({
            ...activity,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value // si es un campo de número se convierte a número
        })
    }

    const isValidActivity  = () => {
        const { name, calories } = activity
        return name.trim() !== '' && calories > 0 // si el nombre no está vacío y las calorías son mayores a 0
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log(activity)
    }

    return (
        <form
            onSubmit={handleSubmit}
            className='space-y-4 bg-white shadow p-10 rounded-lg'
        >
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="category" className="font-bold">Categoría: </label>
                <select
                    name="category"
                    id="category"
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                    value={activity.category}
                    onChange={handleChange}
                >
                    {
                        categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))
                    }
                </select>
            </div>
            
            <div>
                <label htmlFor="name" className="font-bold">Actividad: </label>
                <input 
                    type="text"
                    id="name"
                    className="border border-slate-300 p-2 rounded-lg w-full"
                    placeholder="Ej. Comida, Jugo de Naranja, Ensalada, Ejercicio, Pesas, Bicicleta, etc." 
                    value={activity.name}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="calories" className="font-bold">Calorías: </label>
                <input 
                    type="number"
                    id="calories"
                    className="border border-slate-300 p-2 rounded-lg w-full"
                    placeholder="Calorías. Ej. 100, 200, 300, etc."
                    value={activity.calories}
                    onChange={handleChange}
                />
            </div>

            <input 
                type="submit" 
                className="bg-gray-800 text-white w-full p-2 font-bold uppercase rounded-lg cursor-pointer hover:bg-gray-900 disabled:opacity-10"
                value={activity.category === 1 ? 'Agregar Comida' : 'Agregar Ejercicio'}
                disabled={!isValidActivity()}
            />

        </form>
    )
}

export default Form