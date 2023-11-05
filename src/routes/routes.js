const { Router } = require('express')
const router = Router()
const CustomerModel =  require('../models/Customer.model.js')
const DeliveryModel =  require('../models/Delivery.model.js')
const RestaurantModel =  require('../models/Restaurant.model.js')

router.get('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
      const entities = [
        { model: CustomerModel, name: 'customer' },
        { model: DeliveryModel, name: 'delivery' },
        { model: RestaurantModel, name: 'restaurant' },
      ];
      
      let validEntity = null;
      let validPassword = false;
      
      for (const entity of entities) {
        const foundEntity = await entity.model.findOne({ email: email });
        if (foundEntity) {
          const isPasswordValid = await entity.model.comparePassword(password, foundEntity.password);
          if (isPasswordValid) {
            validEntity = entity.name;
            validPassword = true;
            break;
          }
        }
      }
      
      if (validPassword) {
        res.status(200).json(`Welcome, ${validEntity}!`);
        // Código adicional...
      } else {
        res.status(400).json('Incorrect data');
      }      
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.post('/add-costumer', async (req, res) => {
    const { name, email, password, address, dni, phone_number, balance, loginStatus } = req.body

    const userFound = await CustomerModel.findOne({ email: email })

    if(!userFound) {
      try {
        const customer = new CustomerModel({ 
          name: name,
          email: email,
          password: password,
          address: address,
          dni: dni,
          phone_number: phone_number,
          balance: balance,
          loginStatus: loginStatus
        })
      
        customer.password = await CustomerModel.encryptPassword(password)
        const newCustomer = customer.save()
    
        res.status(200).json({
          _id: newCustomer._id,
          email: newCustomer.email,
          status: "Customer created"
        })
      } catch (error) {
        console.log(error)
        res.status(400).json("Invalid data!") 
      } 
    } else {
      res.status(400).json("User exists!")
    }
})

router.post('/add-delivery', async (req, res) => {  
  const { name, email, password, phone_number, dni, loginStatus } = req.body

  const userFound = await DeliveryModel.findOne({ email: email })

  if(!userFound) {
    try {
      const delivery = new DeliveryModel({
        name: name,
        email: email,
        password: password,
        phone_number: phone_number,
        dni: dni,
        loginStatus: loginStatus
      })
      
      delivery.password = await DeliveryModel.encryptPassword(password)
      const newDeliverer = delivery.save()

      res.status(200).json('Deliverer created')

    } catch (error) {
      console.log(error)
      res.status(400).json("Invalid data!") 
    }  
  } else {
    res.status(400).json("User exists")
  }
})

router.post('/add-restaurant', async (req, res) => {
  const { name, email, password, address, open_hour, close_hour, rut, loginStatus } = req.body

  const userFound = await RestaurantModel.findOne({ email: email })

  if(!userFound) {
    try {
      const restaurant = new RestaurantModel({
        name: name,
        email: email,
        password: password,
        address: address,
        open_hour: open_hour,
        close_hour: close_hour,
        rut: rut,
        loginStatus: loginStatus
      })

      restaurant.password = await RestaurantModel.encryptPassword(password)
      const newRestaurant = restaurant.save()
    
      res.status(200).json('Restaurant created')
    } catch (error) {
      console.log(error)
      res.status(400).json("Invalid data!") 
    }
  } else {
    res.status(400).json("Restaurant exists")
  }
})


module.exports = router
