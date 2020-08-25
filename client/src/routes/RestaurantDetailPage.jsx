import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { RestaurantsContext } from '../context/RestaurantsContext';
import RestaurantFinder from '../apis/RestaurantFinder';


function RestaurantDetailPage() {
  const { id } = useParams()
  const { selectedRestaurant, setSelectedRestaurant } = useContext(RestaurantsContext)

  useEffect(() => {

    (async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`)
        setSelectedRestaurant(response.data.data.restaurant)
      } catch(err) {
        console.log(err.message);
      }
    })()

  }, [])
  return (
    <div>
        <h1>{selectedRestaurant && selectedRestaurant.name}</h1>
    </div>
  );
}

export default RestaurantDetailPage;