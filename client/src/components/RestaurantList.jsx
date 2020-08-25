import React, { useContext, useEffect } from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';


const RestaurantList = props => {

    const { restaurants, setRestaurants } = useContext(RestaurantsContext)

    useEffect(() => {
        (async () => {
            try {
                
                const response = await RestaurantFinder.get('/')
                setRestaurants(response.data.data.restaurants)

            } catch (err) {
                console.log(err.message)
            }
        })()
    }, [])

    const handleDelete = async id => {
        try {
            const response = await RestaurantFinder.delete(`/${id}`)
            setRestaurants(restaurants.filter(restaurant => {
                return restaurant.id !== id
            }))
        } catch(err) {
            console.log(err.message)
        }
    }

    return (
        <div className="list-group">
            <table className="table table-hover table-dark">
                <thead>
                    <tr className="bg-primary">
                        <th scope='col'>Restaurants</th>
                        <th scope='col'>Location</th>
                        <th scope='col'>Price Range</th>
                        <th scope='col'>Rating</th>
                        <th scope='col'>Edit</th>
                        <th scope='col'>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    { restaurants && restaurants.map(restaurant => (
                        <tr key={restaurant.id}>
                            <td>{restaurant.name}</td>
                            <td>{restaurant.location}</td>
                            <td>{'$'.repeat(restaurant.price_range)}</td>
                            <td>{}</td>
                            <td>
                                <button className="btn btn-warning">Update</button>
                            </td>
                            <td>
                                <button onClick={() => handleDelete(restaurant.id)} className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    )) }

                </tbody>
            </table>
        </div>
    );
}

export default RestaurantList;