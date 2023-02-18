const express = require('express')
const app = express()
const PORT = 8080

app.use(express.json())

const sampleSubscriberData = {
  "phoneNumber": "18675181010",
  "username": "16045906403",
  "password": "p@ssw0rd!",
  "domain": "ims.mnc660.mcc302.3gppnetwork.org",
  "status": "ACTIVE",
  "features": {
    "callForwardNoReply": {
      "provisioned": true,
      "destination": "tel:+18675182800"
    }
  }
}

let sampleMultipleSubscriber = [sampleSubscriberData]
const findExistingData = (array, phoneNumber) => {
  return array.find(elem => elem.phoneNumber === phoneNumber)
}

app.get('/', (req, res) => {
  res.status(200).send('Welcome!')
})

// GET
app.get('/ims/subscriber/:phoneNumber', (req, res) => {
  const { phoneNumber } = req.params

  if (!findExistingData(sampleMultipleSubscriber, phoneNumber)) 
    return res.status(400).send('Phone Number doesn\'t exist!')
  
  res.status(200).send(sampleMultipleSubscriber)
})

// PUT
app.put('/ims/subscriber/:phoneNumber', (req, res) => {
  const { phoneNumber } = req.params
  const {
    username,
    password,
    domain,
    status,
    provisioned,
    destination
  } = req.body

  // ADD
  if (!findExistingData(sampleMultipleSubscriber, phoneNumber)) {
    sampleMultipleSubscriber.push({
      phoneNumber: req.params?.phoneNumber,
      username: username,
      password: password,
      domain: domain,
      status: status,
      features: {
        callForwardNoReply: {
          provisioned: provisioned,
          destination: destination,
        }
      }
    })
  // UPDATE
  } else {
    if (username) existingData.username = username
    if (password) existingData.password = password
    if (domain) existingData.domain = domain
    if (status) existingData.status = status
    if (provisioned) existingData.features.callForwardNoReply.provisioned = provisioned
    if (destination) existingData.features.callForwardNoReply.destination = destination
  }
  
  res.status(200).send(sampleMultipleSubscriber)
})

// DELETE
app.delete('/ims/subscriber/:phoneNumber', (req, res) => {
  const { phoneNumber } = req.params
  
  const index = sampleMultipleSubscriber.indexOf(!findExistingData(sampleMultipleSubscriber, phoneNumber))

  if (!findExistingData(sampleMultipleSubscriber, phoneNumber)) 
    return res.status(400).send('Phone Number doesn\'t exist!')

  sampleMultipleSubscriber.splice(index, 1)
  res.status(200).send(sampleMultipleSubscriber)
})

app.listen(PORT, () => console.log(`Listening to port ${PORT}`))