import React, { useState, useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { getOneSpotThunk } from '../../store/spots';
import  GetSpotReviews from "../../components/GetSpotReviews/GetSpotReviews";
import CreateReviewForm from "../CreateReviewForm/CreateReviewForm";
import './GetOneSpot.css';

const GetOneSpot = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spot = useSelector(state => state.spots.singleSpot);
  // const reviews = useSelector(state => state.reviews.spotReviews);
  console.log("spot", spot)
  
  useEffect(() => {
    dispatch(getOneSpotThunk(spotId))
  }, [dispatch, spotId]);
  
  if (Object.keys(spot).length === 0) {
    return null;
  }

  return (
     <section>
        <div className="spot_header">
            <h1 className="spot_name">{spot.name}</h1>
            <div className="spot_details">
              <div className="spot_rating">
                <i className="fa-solid fa-star"></i>
                {spot.avgStarRating} · {spot.numReviews} reviews · {spot.city}, {spot.state}, {spot.country} ${spot.price} night
              </div>
            </div>
        </div>
        <div className='spot_image'>
              {spot.SpotImages.map((image) => {
              return <img src={image.url} alt=""></img>
              })} 
        </div>
        <div className="spot_details2">
              <h2 className="spot_host">Entire house hosted by {spot.Owner.firstName}</h2>
              <div className="spot_description">{spot.description}</div>
        
        <div className="border_box">
              <span className="border_box_left">${spot.price} night</span>
              <span className="border_box_right">
              <i className="fa-solid fa-star"></i>{spot.avgStarRating} {spot.numReviews} reviews</span>
        </div>
        <GetSpotReviews />
            <NavLink to={`/createReview/${spotId}`}>
              <button className="create-review-button">Create a Review</button>
            </NavLink>
        </div>
   </section>
  );
};

export default GetOneSpot;