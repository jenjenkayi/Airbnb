import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllSpotsThunk } from '../../store/spots';
import './GetAllSpots.css';

const GetAllSpots = () => {
  const dispatch = useDispatch();
  const spots = useSelector(state => state.spots.allSpots);
  const spotsArr = Object.values(spots);
  // console.log('spots', spots)
  // console.log('arr', spotsArr)

  useEffect(() => {
    dispatch(getAllSpotsThunk())
  }, [dispatch]);

   if (Object.keys(spotsArr).length === 0) {
    return null;
  }

  return (
    <>
    <div className="spots_cards_container">
      <div className="spots_cards">
        {spotsArr && spotsArr.map((spot) => {
          return (
            <NavLink key={spot.id} to={`/spots/${spot.id}`}>
              <img className='spots_img'
              src={spot.previewImage}
              alt=""
              />
            <div className="spots_details">
              <div id='spots_details_container1'>
                <div className="spots_location">{spot.city},  {spot.state}</div> 
                <div className="spots_rating">
                  <i className="fa-solid fa-star"></i>
                  <span>
                  {spot.avgRating? spot.avgRating : "No Rating"}
                  </span>
                </div>
              </div>
              <div id='spots_details_container2'>
                <div className="spots_price">${spot.price}</div>
                <span>night</span>
              </div>
            </div>
            </NavLink>
                )
            })}
    </div>
    </div>
  </>
  );
};

export default GetAllSpots;
