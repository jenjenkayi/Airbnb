import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams} from 'react-router-dom';
import { updateSpotThunk } from '../../store/spots';

const UpdateSpotForm = ({ spot }) => {
  const { spotId } = useParams();
    const currentSpots = useSelector(state => state.spots.allSpots);
    const currentSpotsArr = Object.values(currentSpots);
    const currentSpot = currentSpotsArr.find(spot => spot.id == spotId)
    console.log("currentSpot", currentSpot);
    
    const history = useHistory();
    const dispatch = useDispatch();

    const [address, setAddress] = useState(currentSpot.address);
    const [city, setCity] = useState(currentSpot.city);
    const [state, setState] = useState(currentSpot.state);
    const [country, setCountry] = useState(currentSpot.country);
    const [lat, setLat] = useState(currentSpot.lat);
    const [lng, setLng] = useState(currentSpot.lng);
    const [name, setName] = useState(currentSpot.name);
    const [description, setDescription] = useState(currentSpot.description);
    const [price, setPrice] = useState(currentSpot.price);
    const [errors, setErrors] = useState([]);

    const updateAddress = (e) => setAddress(e.target.value);
    const updateCity = (e) => setCity(e.target.value);
    const updateState = (e) => setState(e.target.value);
    const updateCountry = (e) => setCountry(e.target.value);
    const updateLat = (e) => setLat(e.target.value);
    const updateLng = (e) => setLng(e.target.value);
    const updateName = (e) => setName(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updatePrice = (e) => setPrice(e.target.value);

   useEffect(() => {
      dispatch(updateSpotThunk());
    }, [dispatch])

  const submitHandler = async (e) => {
    e.preventDefault();
    setErrors([]);

    let spot = {address, city, state, country, lat, lng, name, description, price}
      
    if (!spot.address.length) return setErrors(['Please provide an address']);
    if (!spot.city.length) return setErrors(['Please provide a city']);
    if (!spot.state.length) return setErrors(['Please provide a state']);
    if (!spot.country.length) return setErrors(['Please provide a country']);
    if (!spot.lat) return setErrors(['Please provide a lat']);
    if (!spot.lng) return setErrors(['Please provide a lng']);
    if (!spot.name.length < 0) return setErrors(['Name must be 1 or more characters']);
    if (!spot.description) return setErrors(['Please provide a description']);
    if (!spot.price < 0 ) return setErrors(['Price must be 1 or higher']);
    
    const payload = {
      id: spotId,
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    };
  
  let updatedSpot; 
  updatedSpot = await dispatch(updateSpotThunk(payload));

  if (updatedSpot) {
    history.push(`/spots/${updatedSpot.id}`);
  }
}

  const cancelHandler = (e) => {
    e.preventDefault();
    setErrors();
    history.push(`/spots/${spotId}`);
  };


  return (
    <section className="update-spot-form">
      <form  onSubmit={submitHandler}>
        <h2>Edit A Spot</h2>
        <ul className="errors">
        {errors.length > 0 &&
        errors.map((error) => <li key={error}>{error}</li>)}
        </ul>
        <input
            type="text"
            placeholder='Address'
            value={address}
            required
            onChange={updateAddress} />
        <input
            type="text"
            placeholder="City"
            value={city}
            required
            onChange={updateCity} />
        <input
            type="text"
            placeholder="State"
            value={state}
            required
            onChange={updateState} />
        <input
            type="text"
            placeholder="Country"
            value={country}
            required
            onChange={updateCountry} />
        <input
            type="number"
            placeholder="Lat"
            value={lat}
            required
            onChange={updateLat} />
          <input
            type="number"
            placeholder="Lng"
            value={lng}
            required
            onChange={updateLng} />
          <input
            type="text"
            placeholder="Name"
            value={name}
            required
            onChange={updateName} />
          <input
            type="text"
            placeholder="Description"
            value={description}
            required
            onChange={updateDescription} />
          <input
            type="number"
            placeholder="Price"
            value={price}
            required
            min='1'
            onChange={updatePrice} />
        <button type="submit">Submit</button>
        <button type="button" onClick={cancelHandler}>Cancel</button>
      </form>
    </section>
  );
}

export default UpdateSpotForm;
