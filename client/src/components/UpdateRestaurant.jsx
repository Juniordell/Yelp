import React, { useState, useContext, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import { RestaurantsContext } from '../context/RestaurantsContext'
import RestaurantFinder from '../apis/RestaurantFinder'


function UpdateRestaurant(params) {
    const { id } = useParams()
    let history = useHistory()
    const { restaurants } = useContext(RestaurantsContext)
    const [ name, setName ] = useState('')
    const [ location, setLocation ] = useState('')
    const [ priceRange, setPriceRange ] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const response = await RestaurantFinder.get(`/${id}`)
            console.log(response);
            setName(response.data.data.restaurant.name)
            setLocation(response.data.data.restaurant.location)
            setPriceRange(response.data.data.restaurant.price_range)
        }

        fetchData()
    }, [])

    const handleSubmit = async e => {
        e.preventDefault()

        const updatedRestaurant = await RestaurantFinder.put(`/${id}`, {
            name,
            location,
            price_range: priceRange
        })

        history.push('/')
    }

    return (
        <div>
            {/* <h1>{restaurants[0].name}</h1> */}
            <form action="">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input value={name} onChange={e => setName(e.target.value)} id='name' type="text" className="form-control"/>
                </div>

                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input value={location} onChange={e => setLocation(e.target.value)} id='location' type="text" className="form-control"/>
                </div>

                <div className="form-group">
                    <label htmlFor="price_range">Price Range</label>
                    <input value={priceRange} onChange={e => setPriceRange(e.target.value)} id='price_range' type="number" className="form-control"/>
                </div>
                <button onClick={handleSubmit} className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default UpdateRestaurant;