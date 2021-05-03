const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');



//function to normalize a value in a range
function normalize(value,min,max){
    if(min === undefined || max === undefined){
        return value;
    }
    return value (value -min)/(max-min)
}

//load data in from local file path
const model = tf.sequential({
    layer: [
        tf.layers.dense({inputShape:})
    ]
})


/*  NOTES::::


//THIS EXAMPLE TRAINS A MODEL TO DETECT A LINEAR RELATIONSHIP
The goal of ML is train a model from input data alone
This model is then used to infer/predict output data for future input values

For a prediction, we train the model on input data
    learning is async because it takes time

    Making a model:
        //sequential means, the output of one layer is the input to the next layer.
        //it is a simple stack of layers with no branching or skipping
            const model = tf.sequential()   
    
        //then add dense layer to this
        //this means all the nodes in each of layers are connected to eachother
        //redudant here because we only have 1 layer and 1 node but this is easiest way to define a simple NN
            model.add(tf.layers.dense({units}))

        //compile model
            // in compiling, we define some params such as loss function and optimizer
            //loss function is meansquarederror which is standard for linear equations
            //optimizer is sgd which is stochastic gradient descent
            //these define the methodology for the learning
                model.compile({
                    loss:'meanSquaredError',
                    optimizer: 'sgd'
                })
        
        //Define x and y values for line plot
        //x vals are inputs and y vals are desired outputs
        //if we feed new x val we get a new y value back
        //to train model, we need 2 tensors, 1 for x and 1 for y
                const xs = tf.tensor2d([-1,0,1,2,3,4],[6,1])   //first param is array of x values, second is shape of array 6 rows and 1 col
                const ys = tf.tensor2d([-3-1,1,3,5,7],[6,1])

        
        //train model
                //because training model takes indeterminate amount of time, we AWAIT execution (making function async)
                // epochs = fixed # of iterations that allow for training of model to take place
                // more number of epochs gives the network more time to generate a more accurate result
                // epoch is a unit of time, more epochs = more accurate result
                //once model is trained, we can try do an prediction from it
                    await model.fit(xs,ys,{epochs:250})

       //the relationship here between x and y is y=2x-1 
       //we use model.predict() to get a prediction
       //passed in input tensor with single value in a 1d array value is 20 and array shape is 1,1
       //this returns 38.5xxx because it plugged in 20 into the linear function y=2x-1 -> 39 but we got close at 38.5, for more accuracy, increase epoch number
                model.predict(tf.tensor2d[20],[1,1]));


    //vid 2 
    Important Skill for developing with tensor flow is how to shape your data and how to get it ready for training
    

*/

/*  GENERAL NOTES  

    need to change words into numbers  




*/