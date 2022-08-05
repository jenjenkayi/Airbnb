const express = require('express');
const router = express.Router();

const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Spot, Review, Image, User, Booking, sequelize } = require('../../db/models');


// Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req, res) => {
    const spots = await Spot.findAll();
    const currentUserBookings = await Booking.findAll({
        where: {
            userId: req.user.id
        },
        include: {
            model: Spot,
            attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
        },
        // group: ['Spot.id'],
    })

    for (let i = 0; i < spots.length; i++) {
        let  spot = spots[i]

        let previewImage = await Image.findOne({
            attributes: ['url'],
            where: { previewImage: true, spotId: spot.id },
            raw: true
        })

        if (previewImage) {
            spot.dataValues.previewImage = previewImage.url
        }
    }

    return res.json({ Bookings: currentUserBookings });
})


// Edit a Booking
router.put('/:bookingId', requireAuth, async (req, res) => {
})


// Delete a Booking
router.delete('/:bookingId', requireAuth, async (req, res) => {
    const booking = await Booking.findByPk(req.params.bookingId)

    if (!booking) {
        res.status(404)
        return res.json(
            {
                "message": "Booking couldn't be found",
                "statusCode": 404
            }
        )
    }

    await booking.destroy()
    return res.json(
        {
            "message": "Successfully deleted",
            "statusCode": 200
        })
})





module.exports = router;