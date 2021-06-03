const express = require('express')
const index = express()
index.use(express.json());
const port = 3000

const Firestore = require('@google-cloud/firestore');
const db = new Firestore({
    projectId: 'cc-project-cf34c',
    keyFilename: './firestore-key.json',
});

const docRef = db.collection('orders').doc('O9NnaipghthSCPPQahnu');

const {body, query, validationResult} = require('express-validator');


index.post('/checkout',
    query('email').not().isEmpty().withMessage('Email needs to be set.')
        .isEmail().withMessage('Must be valid email.')
        .normalizeEmail(),
    query('userId').not().isEmpty()
        .withMessage('UserId needs to be set.')
        .trim().escape(),
    query('firstName').not().isEmpty()
        .withMessage('First Name needs to be set.')
        .trim().escape(),
    query('lastName').not().isEmpty()
        .withMessage('Last Name needs to be set.')
        .trim().escape(),
    query('itineraryId').not().isEmpty()
        .withMessage('Itinerary Id needs to be set.')
        .trim().escape(),
    query('totalPrice').not().isEmpty()
        .withMessage('Total Price needs to be set.')
        .trim().escape(),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const userId = req.query.userId;
        const firstName = req.query.firstName;
        const lastName = req.query.lastName;
        const email = req.query.email;

        const itineraryId = req.query.itineraryId;
        const totalPrice = req.query.totalPrice;

        const places = JSON.parse(req.query.places)

        db.collection("orders").add({
            user: {
                id: userId,
                firstName: firstName,
                lastName: lastName,
                email: email
            },
            itinerary: {
                id: itineraryId,
                totalPrice: totalPrice,
                places: places
            }
        })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });

        let response = {
            message: 'Data inserted successfully'
        }

        res.send(JSON.stringify(response));
    })

index.get('/itineraries', async (req, res) => {
    let data = [];

    await db.collection("orders")
        .where('user.id', '==', req.params.user_id)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                data.push(doc.data())
            });
        }).catch((error) => {
            console.log("Error getting documents: ", error);
        });

    res.send(JSON.stringify(data))
});

index.get('/api/itinerary/:id', async (req, res) => {
    let data = null
    await db.collection("orders")
        .where('user.id', '==', req.params.id)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                data = doc.data()
            });
        }).catch((error) => {
            console.log("Error getting documents: ", error);
        });

    res.send(JSON.stringify(data))
});

index.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})













