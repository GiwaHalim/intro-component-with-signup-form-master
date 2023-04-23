// import React from "react";
import { Formik, Form, Field, ErrorMessage} from "formik";
import Joi from "joi";
// import errorIcon from '/images/icon-error.svg';


const Input = () => {


    const inputs = [
        {name: 'firstName', type:'text', placeHolder:'First Name'},
        {name: 'lastName', type:'text', placeHolder:'Last Name'},
        {name: 'emailAddress', type:'email', placeHolder:'Email Address'},
        {name: 'password', type:'password', placeHolder:'Password'}

    ]

    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        emailAddress: Joi.string().email({tlds: { allow: ['com', 'net'] } }).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    })

    let initialValueNames = {};
    for(let item of inputs){
        initialValueNames[item.name] = ''
    }

    return ( 
        <Formik
            initialValues={initialValueNames}
            validate={values => {
                    const err = schema.validate(values, {abortEarly: false})
            
                    if (!err.error) return null
            
                    const errors = {}
                    for(let item of err.error.details){
                        errors[item.path[0]] = item.message
            
                        return errors
                    }
            }}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                // call the server
                  setSubmitting(false);
                }, 400);
              }}>

            {({isSubmitting}) => 
            <Form className="form">
            {inputs.map( input => (
                <div key={input.name} className='input'> 
                <Field type={input.type} placeholder={input.placeHolder} name={input.name}/>
                <ErrorMessage className='err' component='p' name={input.name} />

                </div>

            ))}

            <div>
            <button className="button" type="submit" disabled={isSubmitting}>CLAIM YOUR FREE TRIAL</button>
            </div>
        </Form>}
            
        </Formik>
     );

}
 
export default Input;