import mongoose from "mongoose";

export async function connect() {
    try {

        mongoose.connect(process.env.MONGO_URL!);
        
        const connection = mongoose.connection;

        connection.on('connected', () =>{
            console.log("DB Connected Successfully");
        })

        connection.on('error', (err) =>{
            console.log("Mongo DB Connection Error " +err)
            process.exit();
        })
        
    } catch (error) {

        console.log("Something went wrong!");
        console.log(error)
        
    }
}