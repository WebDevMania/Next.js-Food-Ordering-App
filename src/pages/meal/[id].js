import axios from 'axios'
import emailjs from '@emailjs/browser'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import Footer from '../../../components/footer/Footer'
import Navbar from '../../../components/navbar/Navbar'
import classes from '../../styles/meal.module.css'
import { useSession } from 'next-auth/react';
import { AiOutlineClose } from 'react-icons/ai';

const MealDetails = ({ meal = {} }) => {
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [showForm, setShowForm] = useState(false)
    const formRef = useRef()
    const { data } = useSession()
    const user = data?.user


    const handleCloseForm = () => {
        setShowForm(false)
    }

    const handleEmail = async (e) => {

        e.preventDefault()

        emailjs.sendForm("service_o1ki47j", "template_w5mthmm", formRef.current, '5T3Wb_hkHjKTOJDYQ')
            .then(() => {
                toast.success("Email has been sent successfully to " + email)
                handleCloseForm()
            }, (error) => {
                toast.error(error.text);
            });
    }

    return (
        <>
            <Navbar />
            <div className={classes.container}>
                <div className={classes.wrapper}>
                    <div className={classes.left}>
                        <Image src={meal?.image} width='250' height='250' />
                    </div>
                    <div className={classes.right}>
                        <h2 className={classes.title}>{meal?.title}</h2>
                        <span className={classes.category}>Category: <span>{meal?.category}</span></span>
                        <p className={classes.desc}>Meal description: {meal?.desc?.length > 70 ? `${meal?.desc?.slice(0, 70)}...` : meal?.desc}</p>
                        <span className={classes.price}>Price: $<span>{meal?.price}</span></span>
                        {/* to implement emailjs */}
                        <button className={classes.orderButton} onClick={() => setShowForm(true)}>Order now</button>
                        <span className={classes.readyIn}>Meals are prepared for 30 to 45 minutes</span>
                    </div>
                </div>
                {
                    showForm &&
                    <div className={classes.contactForm} onClick={handleCloseForm}>
                        <div className={classes.contactFormWrapper} onClick={(e) => e.stopPropagation()}>
                            <h2>Order meal</h2>
                            <form onSubmit={handleEmail} ref={formRef}>
                                <input value={user?.username} type="text" placeholder='My username' name="from_username" />
                                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Your email' name="to_email" />
                                <textarea value={message} type="text" placeholder='Address' name="message" onChange={(e) => setMessage(e.target.value)} />
                                <button type="submit">Send</button>
                            </form>
                            <AiOutlineClose onClick={handleCloseForm} className={classes.removeIcon} />
                        </div>
                    </div>
                }
                <ToastContainer />
            </div>
            <Footer />
        </>
    )
}

export async function getServerSideProps(ctx) {
    const id = ctx.params.id

    const { data } = await axios.get(`http://localhost:3000/api/meal/${id}`)

    return {
        props: {
            meal: data
        }
    }
}

export default MealDetails