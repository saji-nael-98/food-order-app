import React, { useEffect, useState } from 'react'

const useFetchMeals = () => {
    const [meals, setMeals] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState('')
    useEffect(() => {
        const fetchMeals = async () => {
            try {
                const response = await fetch('https://food-order-app-b4181-default-rtdb.firebaseio.com/meals.json')
                if (!response.ok) {
                    throw new Error('Could not fetch meals.')
                }
                const meals = await response.json()
                const loadedMeals = Object.keys(meals).map(m => ({
                    id: m,
                    name: meals[m].name,
                    description: meals[m].description,
                    price: meals[m].price,
                }))
                setMeals(loadedMeals)
            } catch (error) {
                setError(error.message)
            } finally{
                setLoading(false)
            }
        }
        fetchMeals()
    }, [])
    return [meals, isLoading, error]
}

export default useFetchMeals