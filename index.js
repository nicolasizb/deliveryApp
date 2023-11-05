const { connection } = require('./src/database/data-base.js')
const { app } = require('./src/app.js')
require('dotenv').config()  

const port = process.env.PORT

connection()
.then(
    // app.listen(port, () => {
    //         console.log(`Server lives in port: ${ port }`)
    //     })
    app.listen(port, "0.0.0.0", function () {
        // ...
      })
    )
