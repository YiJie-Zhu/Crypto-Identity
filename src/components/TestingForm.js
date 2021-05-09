import React, {useState} from 'react'
import {db} from "../firebase"

const TestingForm = ()  => {
    const [country, setCountry] = useState("")
    const [gender, setGender] = useState("")
    const [age, setAge] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        db.collection('data').add({
            country: country,
            gender: gender,
            age: age,
        })
        .then(() => {
            alert("Form has been submitted")
        })
        .catch(error => {
            alert(error.message)
        })
        setCountry('')
        setGender('')
        setAge('')
    }



    return (
        <form onSubmit={handleSubmit}>
            <h1>
                Contact Form
            </h1>
            <label> Country of Birth </label>
            <input 
                placeholder = "Country" 
                value = {country}
                onChange={(e) => setCountry(e.target.value)}
            />
            <label> Gender </label>
            <input 
                placeholder = "Gender" 
                value = {gender}
                onChange={(e) => setGender(e.target.value)}

            />
            <label> Age </label>
            <input 
                placeholder = "Age" 
                value = {age}
                onChange={(e) => setAge(e.target.value)}
            />   
        <button
            type="submit"
        >
            Submit
        </button> 
        </form>
    )
}

export default TestingForm