import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneSpotThunk } from '../../store/spots';
import './GetOneSpot.css';

const GetOneSpot = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spot = useSelector(state => state.spots.singleSpot);
  console.log('spot', spot);

  useEffect(() => {
    dispatch(getOneSpotThunk(spotId))
  }, [dispatch, spotId]);
  
  if (!spot) {
    return null;
  }

  return (
     <section>
      <div className="spot_cards_container">
            <><div className="spot_name">{spot.name}</div>
            <div className="spot_rating">
              <i className="fa-solid fa-star"></i>
              {spot.avgStarRating} · {spot.numReviews} reviews · {spot.city}, {spot.state}, {spot.country} ${spot.price} night
            </div>
            <div className='spot_image'>
              {spot.SpotImages.map((image) => {
              return <img src={image.url} alt=""></img>
              })} 
              {/* <img src={spot.previewImage} alt=""></img> */}
            </div>
            <div className="spot_description">{spot.description}</div>
            <div className="border_box">
              <span className="border_box_left">${spot.price} night</span>
              <span className="border_box_right">
              <i className="fa-solid fa-star"></i>{spot.avgStarRating} {spot.numReviews} reviews</span>
              </div>
              </>
      </div>
   </section>
  );
};

export default GetOneSpot;