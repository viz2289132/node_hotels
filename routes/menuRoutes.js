const express = require('express');
const router = express.Router();


const MenuItem = require('./../models/MenuItem');

//post req to add menu
router.post('/' , async (req , res) =>{
    try{

        const menuData = req.body;
        const newMenu = new MenuItem(menuData);
        const savedMenu = await newMenu.save();

        console.log('menu saved succesfully');
        res.json(savedMenu);



    }catch(err){
        console.log('Error saveing menu :' , err);
        res.json({err : 'internal server error'});
    }
});


//get method  to read menu 

router.get('/' , async(req , res)=>{
    try{

        const data = await MenuItem.find();
        console.log('Data fetched successfully');
        res.status(201).json(data);


    }catch(err){
        console.log('Error saveing menu :' , err);
        res.json({err : 'internal server error'});
    }
});
//paramterised get call
router.get('/:tasteType' , async(req , res)=>{
    try{

        const tasteType = req.params.tasteType ;

        if(tasteType == 'sweet' || tasteType == 'salty' ||tasteType == 'spicy' ||tasteType == 'sour'){
            const response = await MenuItem.find({taste:tasteType});
            console.log('response fecthed');
            res.status(200).json({response});
        }

    }catch(err){
        console.log('Error saveing menu :' , err);
        res.json({err : 'internal server error'});
    }
});
//home work put method for menu lec = 8
router.put('/:id' , async(req,res)=>{
    try{

        const menuId = req.params.id ;// extract id from url
        updateMenuData = req.body ; // updated data for menu

        const response = await MenuItem.findByIdAndUpdate(menuId , updateMenuData,{
            new:true ,// return updated document 
            runValidators : true , // run mongoose validators
        })
        if(!response){
            return res.status(404).json({error : 'person not found'});
        }

        console.log('response fecthed');
         res.status(200).json({response});

    }
    catch(err){
        console.log(err);
        res.json({err : 'Internal sevrer error'});
    }
})




//home work dlete method for menu

router.delete('/:id' , async(req, res)=>{
    try{

        const menuId = req.params.id;

        const response = await MenuItem.findByIdAndDelete(menuId);

        if(!response){
            return res.status(404).json({error : 'menu not found'});
        }

        console.log('data deleted');
        res.status(200).json({message : 'menu deleted successfully'});

    }catch(err){
        console.log( err);
        res.json({err : 'internal server error'});
    }
})




module.exports = router ;