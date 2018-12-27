# VK Apps SDK

Nodejs SDK for VK Apps service's backend

# Install 
```sh
npm i vk-apps-sdk -s
```

# Examples 


```js
const PORT = process.env.PORT || 3000
const express = require('express')
const app = express()

const VKAppsSDK = require('vk-apps-sdk')
const VKApp = new VKAppsSDK({
    CLIENT_SECRET: 'okM7c8C1V7wbe3eCFqK7'
})


app.use( (req, res, next) => {
    req.auth = VKApp.checkVKQueryParamsSign(req.body)
    next()
})

app.all( (req, res) => {
    req.json({
        auth: req.auth
    })
})

app.listen(PORT)
```

# Methods

### .checkVKQueryParamsSign(params)

Checks VK Apps query params signature



### .checkVKPaySignature(data_str, signature)

Checks VK Pay signature for base64 encoded data string

