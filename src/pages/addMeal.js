import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { AiFillFileImage } from 'react-icons/ai'
import Footer from '../../components/footer/Footer'
import Navbar from '../../components/navbar/Navbar'
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import classes from '../styles/addMeal.module.css'
import { signIn, useSession } from 'next-auth/react'

const addMeal = () => {
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [category, setCategory] = useState("pizza")
    const [price, setPrice] = useState(50)
    const [photo, setPhoto] = useState('')
    const [photoPercentage, setPhotoPercentage] = useState(0)
    const router = useRouter()
    const session = useSession()

    useEffect(() => {
        if (session.status === 'loading') return

        if (session.status !== 'authenticated') {
            signIn()
        }
    }, [session.status])
    

    const postMeal = async (imageUrl) => {

        try {
            const { data: meal } = await axios.post('http://localhost:3000/api/meal', { title, desc, category, price, image: imageUrl })
            router.push(`/meal/${meal._id}`)

        } catch (error) {
            console.error(error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const storage = getStorage(app);
        const filename = crypto.randomUUID() + photo.name;
        const storageRef = ref(storage, filename);
        const uploadFile = uploadBytesResumable(storageRef, photo);

        uploadFile.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setPhotoPercentage((progress).toFixed(1))
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused right now");
                        break;
                    case "running":
                        console.log("Upload is running right now");
                        break;
                    default:
                        break;
                }
            },
            (error) => {
                console.log(error)
            },
            async () => {
                const fileUrl = await getDownloadURL(uploadFile.snapshot.ref)
                postMeal(fileUrl)
            }
        );
    };


    return (
        <>
            <Navbar />
            <div className={classes.container}>
                <div className={classes.wrapper}>
                    <h2>Add meal</h2>
                    <form onSubmit={handleSubmit}>
                        <input value={title} type="text" placeholder='Title...' onChange={(e) => setTitle(e.target.value)} />
                        <input value={desc} type="text" placeholder='Desc...' onChange={(e) => setDesc(e.target.value)} />
                        <select onChange={(e) => setCategory(e.target.value)}>
                            <option disabled>Select Category</option>
                            <option value='pizza'>Pizza</option>
                            <option value='burger'>Burger</option>
                            <option value='gyros'>Gyros</option>
                            <option value='spaghetti'>Spaghetti</option>
                            <option value='vegetarian'>Vegetarian</option>
                            <option value='bread'>Bread</option>
                        </select>
                        <input value={price} type="text" placeholder='Price...' onChange={(e) => setPrice(e.target.value)} />
                        <div className={classes.imageField}>
                            <label htmlFor='image'>
                                Photo <AiFillFileImage size={25} />
                            </label>
                            <input id='image' type="file" style={{ display: 'none' }} onChange={(e) => setPhoto(e.target.files[0])} />
                        </div>
                        <button>Post</button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default addMeal