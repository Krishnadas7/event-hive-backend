import {app} from './infrastructureLayer/config/app'
import dbConnection from './infrastructureLayer/config/db'

const PORT = 3003

const start = () =>{
    app.get('/',(req,res)=>{
        res.send('project started')
    })
    app.listen(PORT,async ()=>{
        console.log(`service connected on http://localhost/${PORT}`);
        dbConnection()
    })
}

start()