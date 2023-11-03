const { connection } = require('./src/database/data-base.js')
const { app, port } = require('./src/app.js')

connection()
.then(
    app.listen(port, () => {
            console.log(`Server lives in port: ${ port }`)
        })
    )
