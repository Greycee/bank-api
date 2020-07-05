const router = require('express').Router()
let Account = require('../models/account.model')

router.get('/', async (_, res) => {
  try {
    const account = await Account.find()
    res.send(account)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

router.put('/deposit/:branch/:account', async (req, res) => {
  try {
    const { branch, account } = req.params
    const { amount } = req.body
    const getBalance = await Account.findOneAndUpdate(
      {
        branch,
        account,
      },
      { $inc: { balance: amount } },
      { new: true },
    )
    console.log(getBalance)
    if (!getBalance) {
      res
        .status(400)
        .json({ message: 'Please, check informed branch and/or account' })
    }
    res.send(getBalance)
  } catch (err) {
    return res.status(400).json({ err: error.message })
  }
})

router.put('/withdraw/:branch/:account', async (req, res) => {
  try {
    const { amount } = req.body
    const withdrawTax = amount + 1
    const { branch, account } = req.params

    const getAccount = await Account.find({
      branch,
      account,
    })

    if (!getAccount) {
      return res
        .status(400)
        .json({ message: 'Please, check informed branch and/or account' })
    }

    if (amount < 0 || withdrawTax > getAccount[0].balance) {
      return res.status(400).json({
        message: 'Transaction not allowed due to insufficient balance',
      })
    }

    const updateBalance = await Account.findOneAndUpdate(
      {
        branch,
        account,
      },
      { $inc: { balance: -withdrawTax } },
      { new: true },
    )
    return res.send(updateBalance)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

router.get('/balance/:branch/:account', async (req, res) => {
  try {
    const { branch, account } = req.params
    const getBalance = await Account.find({
      branch,
      account,
    }).map((data) => {
      return data[0].balance
    })
    console.log(getBalance)
    res.json({ Balance: getBalance })
  } catch (err) {
    res
      .status(400)
      .json({ message: 'Please, check informed branch and/or account' })
  }
})

router.delete('/delete/:branch/:account', async (req, res) => {
  try {
    const { branch, account } = req.params
    const deleteAccount = await Account.findOneAndDelete({
      branch,
      account,
    })
    if (!deleteAccount) {
      res
        .status(400)
        .json({ message: 'Please, check informed branch and/or account' })
    }
    const activeAccounts = await Account.find({
      branch,
    })
    if (!activeAccounts) {
      return res.json(0)
    }
    return res.json({ active_branches: activeAccounts.length })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.put('/transfer/:originAccount/:destinationAccount', async (req, res) => {
  try {
    const { originAccount, destinationAccount } = req.params
    const { amount } = req.body
    const findOriginAccount = await Account.findOne({ account: originAccount })
    const findDestinationAccount = await Account.findOne({
      account: destinationAccount,
    })
    if (!findOriginAccount || !findDestinationAccount) {
      return res.status(400).json({ message: 'Please check informed accounts' })
    }
    if (findOriginAccount.branch === findDestinationAccount.branch) {
      if (findOriginAccount.balance - amount < 0) {
        return res.status(400).json({
          message: 'Transaction not allowed due to insufficient balance',
        })
      }
      const updateOriginAccount = await Account.findOneAndUpdate(
        { account: originAccount },
        { balance: findOriginAccount.balance - amount },
        { new: true },
      )
      const updateDestinationAccount = await Account.findOneAndUpdate(
        { account: destinationAccount },
        { balance: findDestinationAccount.balance + amount },
        { new: true },
      )
    } else {
      if (findOriginAccount.balance - amount - 8 < 0) {
        return res.status(400).json({
          message: 'Transaction not allowed due to insufficient balance',
        })
      }
      const updateOriginAccount = await Account.findOneAndUpdate(
        { account: originAccount },
        { balance: findOriginAccount.balance - amount - 8 },
        { new: true },
      )
      const updateDestinationAccount = await Account.findOneAndUpdate(
        { account: destinationAccount },
        { balance: findDestinationAccount.balance + amount },
        { new: true },
      )
    }
    const originAccountNewBalance = await Account.findOne({
      account: originAccount,
    })
    return res.json(originAccountNewBalance)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.get('/average/:branch', async (req, res) => {
  try {
    const { branch } = req.params

    const getAllAccountsByBranch = await Account.find({ branch })

    const mapBalances = getAllAccountsByBranch.map((data) => {
      return data.balance
    })
    console.log(mapBalances)
    const sumBalances = mapBalances.reduce((acc, current) => {
      return acc + current
    }, 0)
    console.log(sumBalances)
    const average = (sumBalances / getAllAccountsByBranch.length).toFixed(2)

    if (average === 'NaN') {
      return res.status(400).json({
        message: 'The informed branch is invalid',
      })
    }

    return res.json({ average })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.get('/lowest/:numberOfClients', async (req, res) => {
  try {
    let numberOfClients = req.params.numberOfClients
    const getClients = await Account.find()
    const sortClients = getClients.sort((a, b) => a.balance - b.balance)

    if (numberOfClients > getClients.length) {
      numberOfClients = getClients.length
    }

    const result = []

    for (let i = 0; i < numberOfClients; i++) {
      result.push(sortClients[i])
    }
    res.json(result)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.get('/highest/:numberOfClients', async (req, res) => {
  try {
    const numberOfClients = req.params.numberOfClients
    const getClients = await Account.find()
    const sortClients = getClients
      .sort((a, b) => a.name.localeCompare(b.name))
      .sort((a, b) => b.balance - a.balance)

    const result = []

    for (let i = 0; i < numberOfClients; i++) {
      result.push(sortClients[i])
    }
    res.json(result)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.get('/private99', async (_, res) => {
  const getAccounts = await Account.find()

  if (!getAccounts) {
    return res.json(0)
  }

  var higherBalance = new Map()

  for (var i = 0; i < getAccounts.length; i++) {
    if (!higherBalance.get(getAccounts[i].branch)) {
      higherBalance.set(getAccounts[i].branch, getAccounts[i])
    } else {
      if (
        higherBalance.get(getAccounts[i].branch).balance <
        getAccounts[i].balance
      ) {
        higherBalance.set(getAccounts[i].branch, getAccounts[i])
      }
    }
  }

  for (const acc of higherBalance) {
    await Account.findOneAndUpdate(
      { account: acc[1].account, branch: acc[1].branch },
      { branch: 99 },
      { new: true },
    )
  }

  const accounts99 = await Account.find({ branch: 99 })

  return res.json({ accounts99 })
})

module.exports = router
