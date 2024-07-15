//IMPORT PACKAGE

// const express=require('express');
// let app=express();  // express is called and it returns obj


// ROUTE = HTTP METHOD + URL

// Route for get request
// app.get('/',(req,res)=>{

//     // for send method content type is text so we cannot send json 
//     // res.status(200).send('<h4>Hello from express server</h4>');
    
    
//     res.status(200).json({message:'Hello, Universe',status:200});
// }) 

// app.post('/',()=>{
    
// })


// // CREATE A SERVER
// const port=3000;
// app.listen(port,()=>{
//     console.log('Server has started!');
// })


// ***********************************************************LECTURE 34 & 35 ***************************************

// The main purpose of this code is to set up a web server that responds to HTTP GET requests at the endpoint /api/v1/movies. 
// When this endpoint is accessed, the server sends back a JSON response containing a list of movies.

const express=require('express');  //The express module is imported to create and manage the web server.

const fs=require('fs'); //The fs (file system) module is imported to read the movie data from a file.



let app=express();

app.use(express.json());

let movies = JSON.parse(fs.readFileSync('./data/movies.json')); // converts json data to js obj

// GET - api/movies
//The app.get method defines a route handler for the GET /api/v1/movies endpoint.
// When a request is made to this endpoint, 
// the server responds with a status code of 200 (OK) 
// and sends a JSON response containing the movie data.

/*
app.get('/api/v1/movies', (req, res) => { ... }) defines a route that listens for HTTP GET requests at the path /api/v1/movies.
When a request matches this path, the callback function (req, res) => { ... } is executed.
*/

// app.get('/api/v1/movies',(req,res)=>{
//     res.status(200).json({ // content type of json is application/json
//         status:"success",
//         count:movies.length,
//         data: {
//             movies:movies
//         }
//     });
// });

// //app.use(express.json()) is middleware that parses incoming requests with JSON payloads.
// // It allows the server to handle JSON request bodies, 
// // which is essential for many API operations like creating or updating resources.

// // app.use(express.json()) is a piece of code that helps your server understand and work with data sent in the JSON format. 
// //When your server receives data (like when someone fills out a form or submits information), 
// // this code makes sure the server can read and use that data correctly.
// app.use(express.json()) 


// app.post('/api/v1/movies',(req,res)=>{
//     console.log(req.body);
//     const newId=movies[movies.length-1].id+1;

//     const newMovie=Object.assign({id:newId},req.body)
    
//     movies.push(newMovie);

//     fs.writeFile('./data/movies.json',JSON.stringify(movies),(err)=>{
//         res.status(201).json({ // writes into movies.json by client 
//             status:"success",
//             data:{
//                 movie:newMovie
//             }
//             }
//         )
//     })
//     // res.send('Created');
// })

// // GET - api/v1/movies/id

// app.get('/api/v1/movies/:id',(req,res)=>{
//     console.log(req.params); // param stores an obj which has all route paramter info

//     const id= req.params.id * 1; // converting string to int

//     let movie= movies.find(ele => ele.id===id);
//     if(!movie) // movie not found
//     {
//       return  res.status(404).json({
//             status:"fail",
//             message:'Movie with ID ' +id+ ' is not found'
//         })
//     }

//     res.status(200).json({
//         status:"success",
//         data:{
//             movie:movie
//         }
//     });
//     // res.send('Test Case Movie');
// })


// app.patch('/api/v1/movies/:id',(req,res)=>{
//     let id = req.params.id * 1;
//     let movieToUpdate= movies.find(el=>el.id===id);

//     if(!movieToUpdate)
//     {
//         return  res.status(404).json({
//             status:"fail",
//             message:'Movie with ID ' +id+ ' is not found'
//         })
//     }

//     let index=movies.indexOf(movieToUpdate);

//     // body property of req contains updated obj

//     Object.assign(movieToUpdate,req.body);

//     // updation in array object not movies.json file
//     movies[index]=movieToUpdate;

//     fs.writeFile('./data/movies.json',JSON.stringify(movies),(err)=>{
//         res.status(200).json({
//             status:"success",
//             data:{
//                 movie:movieToUpdate
//             }
//         });
//     })
// })
// //(/api/v1/movies/:id/:name/:x?)  --> makes route parameter x as optional


// app.delete('/api/v1/movies/:id',(req,res)=>{
//     const id=req.params.id*1; // also  const id= + req.params.id;
//     const movieToDelete=movies.find(ele=>ele.id===id);

//     if(!movieToDelete){
//         return  res.status(404).json({
//             status:"fail",
//             message:'No Movie Object with ID ' +id+ ' is found to delete' 
//         })
//     }

//     const index=movies.indexOf(movieToDelete);

//     movies.splice(index,1);  // deletes an elements in movies array

//     fs.writeFile('./data/movies.json',JSON.stringify(movies),(err)=>{
//         res.status(204).json({ // for deletion status code is 204
//             status:"success",
//             data:{
//                 movie:null
//             }
//         });
//     })

    
// })
// const port=3000;
// app.listen(port,()=>{
//     console.log('Server has started!');
// })








// ROUTE HANDLER FUCNTIONS ****************************************************************************************************






const getOneMovie=(req,res)=>{
    console.log(req.params); // param stores an obj which has all route paramter info

    const id= req.params.id * 1; // converting string to int

    let movie= movies.find(ele => ele.id===id);
    if(!movie) // movie not found
    {
      return  res.status(404).json({
            status:"fail",
            message:'Movie with ID ' +id+ ' is not found'
        })
    }

    res.status(200).json({
        status:"success",
        data:{
            movie:movie
        }
    });
    // res.send('Test Case Movie');
}



let val=0;

const getAllMovies=(req,res)=>{
    res.status(200).json({ // content type of json is application/json
        status:"success",
        count:movies.length,
        data: {
            movies:movies
        }
    });
}

const createMovie=(req,res)=>{
    // console.log(req.body);

    const newId=movies[movies.length-1].id + 1;

    const newMovie=Object.assign({id:newId},req.body)
    
    movies.push(newMovie);

    fs.writeFile('./data/movies.json',JSON.stringify(movies),(err)=>{
        res.status(201).json({ // writes into movies.json by client 
            status:"success",
            data:{
                movie:newMovie
            }
            }
        )
    })
    // res.send('Created');
}

const deleteMovie=(req,res)=>{
    const id=req.params.id*1; // also  const id= + req.params.id;
    const movieToDelete=movies.find(ele=>ele.id===id);

    if(!movieToDelete){
        return  res.status(404).json({
            status:"fail",
            message:'No Movie Object with ID ' +id+ ' is found to delete' 
        })
    }

    const index=movies.indexOf(movieToDelete);

    movies.splice(index,1);  // deletes an elements in movies array

    fs.writeFile('./data/movies.json',JSON.stringify(movies),(err)=>{
        res.status(204).json({ // for deletion status code is 204
            status:"success",
            data:{
                movie:null
            }
        });
    })
}

const updateMovie=(req,res)=>{
    let id = req.params.id * 1;
    let movieToUpdate= movies.find(el=>el.id===id);

    if(!movieToUpdate)
    {
        return  res.status(404).json({
            status:"fail",
            message:'Movie with ID ' +id+ ' is not found'
        })
    }

    let index=movies.indexOf(movieToUpdate);

    // body property of req contains updated obj

    Object.assign(movieToUpdate,req.body);

    // updation in array object not movies.json file
    movies[index]=movieToUpdate;

    fs.writeFile('./data/movies.json',JSON.stringify(movies),(err)=>{
        res.status(200).json({
            status:"success",
            data:{
                movie:movieToUpdate
            }
        });
})
}

// app.get('/api/v1/movies',getAllMovies);
// app.get('/api/v1/movies/:id',getOneMovie);
// app.get('/api/v1/movies',createMovie);
// app.get('/api/v1/movies/:id',updateMovie);
// app.get('/api/v1/movies/:id',deleteMovie);

// diff http methods using same end point
app.route('/api/v1/movies')
    .get(getAllMovies)  
    .post(createMovie)  

app.route('/api/v1/movies/:id')
    .get(getOneMovie)
    .patch(updateMovie)
    .delete(deleteMovie)

const port=3000;
app.listen(port,()=>{
    console.log('Server has started!');
})