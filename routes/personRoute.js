const express = require('express');
const router = express.Router();

const Person = require('./../models/person');



// POST route to add a person
router.post('/', async (req, res) => {
    try {
      const data = req.body; // Assuming the req body contains person data
  
      // Create and save a new person document
      const newPerson = new Person(data);
      const savedPerson = await newPerson.save();
  
      console.log('Data saved successfully');
      res.status(201).json(savedPerson);
    } catch (error) {
      console.error('Error saving person:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  //get method to read person data
  router.get('/' , async(req , res)=>{

    try{
        const data = await Person.find();
        console.log('Data fetched successfully');
        res.status(201).json(data);

    }catch(error){
        console.error('Error saving person:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

})

//parametrised get call

router.get('/:workType' , async (req, res)=>{
    try{
        const workType = req.params.workType; //extract the work type from  url pramenter

        if(workType == ' waiter' || workType =='chef' || workType== 'manager'){
            const response = await  Person.find({work:workType});
            console.log('response fecthed');
            res.status(200).json({response});
        }else{
            res.status(404).json({error : 'Invalid work type '});
        }

    }catch(err){
        console.log( err);
        res.json({err : 'internal server error'});
    }
})

//update or put method
router.put('/:id' , async(req, res)=>{
    try{
        const personId = req.params.id;// extract id from url
        const updatedPersonData = req.body;//updated data for the person

        const response = await Person.findByIdAndUpdate(personId , updatedPersonData, {
            new:true ,// return updated document 
            runValidators : true , // run mongoose validators
        })
        if(!response){
            return res.status(404).json({error : 'person not found'});
        }

        console.log('response fecthed');
         res.status(200).json({response});


    }catch(err){
        console.log( err);
        res.json({err : 'internal server error'});
    }
})
//delete methoid
router.delete('/:id' , async(req, res)=>{
    try{

        const personId = req.params.id;

        const response = await Person.findByIdAndDelete(personId);

        if(!response){
            return res.status(404).json({error : 'person not found'});
        }

        console.log('data deleted');
        res.status(200).json({message : 'person deleted successfully'});

    }catch(err){
        console.log( err);
        res.json({err : 'internal server error'});
    }
})
module.exports = router ;
