require('../dbconfig/dbfile')


async function saveDPartner(dPartner, done) {
  const data = await dPartner.save()

  done(undefined, data)
}

async function getAllDPartners(dPartner, done) {
  const data = await dPartner.find()
  return done(undefined, data)
}

async function getDPartnerByEmail(dPartner, email, done) {
  const data = await dPartner.find({ email })
  return done(undefined, data)
}


async function getDPartnerByPhoneNumber(dPartner, phoneNumber, done) {
  const data = await dPartner.find({ phoneNumber })
  return done(undefined, data)
}

async function getDPartnerById(dPartner, dPartnerId, done) {
  const data = await dPartner.findById(dPartnerId)
  return done(undefined, data)
}

async function updateDPartner(dPartner, updatedData, email, done) {
  const data = await dPartner.updateOne(
    { email },
    { $set: { ...updatedData } }
  )

  console.log(data)
  if (data.modifiedCount === 1) {
    return done(undefined, 'successfully updated')
  } else return done('could not find the collection')
}


async function deleteDPartner(dPartner, email, done) {
  const data = await dPartner.remove({ email })

  if (data.nRemoved === 1)
    return done(undefined, 'Succesfully deleted dPartner')
  else return done('could not find the dPartner')
}

async function updateDPartner(dPartner, updatedData, email, done) {
  const data = await dPartner.updateOne({ email }, { $set: { ...updatedData } })

  console.log(data)
  if (data.modifiedCount === 1) {
    return done(undefined, 'successfully updated')
  } else return done('could not find the collection')
}

async function deleteDPartner(dPartner, email, done) {
  const data = await dPartner.remove({ email })

  if (data.nRemoved === 1)
    return done(undefined, 'Succesfully deleted dPartner')
  else return done('could not find the dPartner')
}

module.exports = {
  saveDPartner,
  getAllDPartners,
  getDPartnerByEmail,
  getDPartnerByPhoneNumber,
  getDPartnerById,
  updateDPartner,
  deleteDPartner,
}
