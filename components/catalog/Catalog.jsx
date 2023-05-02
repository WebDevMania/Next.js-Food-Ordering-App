import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import classes from './catalog.module.css'
import Link from 'next/link'

const Catalog = ({ meals = [] }) => {
    const [activeCategory, setActiveCategory] = useState('all')
    const [filteredMeals, setFilteredMeals] = useState([])

    useEffect(() => {
        const filterMeals = () => {
            setFilteredMeals(() => {
                if (activeCategory) {
                    if (activeCategory === 'all') {
                        return setFilteredMeals(meals)
                    }
                    return [...meals].filter((meal) => meal.category === activeCategory)
                }
            })
        }
        activeCategory && filterMeals()
    }, [activeCategory])

    console.log(filteredMeals)

    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <div className={classes.titles}>
                    <h5>Pick something delicious</h5>
                    <h2>Food and Categories</h2>
                </div>
                <div className={classes.categories}>
                    <span className={`${classes.category} ${activeCategory === 'all' ? classes.active : ''}`} onClick={() => setActiveCategory('all')}>
                        All
                    </span>
                    <span className={`${classes.category} ${activeCategory === 'pizza' ? classes.active : ''}`} onClick={() => setActiveCategory('pizza')}>
                        Pizza
                    </span>
                    <span className={`${classes.category} ${activeCategory === 'burger' ? classes.active : ''}`} onClick={() => setActiveCategory('burger')}>
                        Burger
                    </span>
                    <span className={`${classes.category} ${activeCategory === 'gyros' ? classes.active : ''}`} onClick={() => setActiveCategory('gyros')}>
                        Gyros
                    </span>
                    <span className={`${classes.category} ${activeCategory === 'spaghetti' ? classes.active : ''}`} onClick={() => setActiveCategory('spaghetti')}>
                        Spaghetti
                    </span>
                    <span className={`${classes.category} ${activeCategory === 'bread' ? classes.active : ''}`} onClick={() => setActiveCategory('bread')}>
                        Bread
                    </span>
                    <span className={`${classes.category} ${activeCategory === 'vegetarian' ? classes.active : ''}`} onClick={() => setActiveCategory('vegetarian')}>
                        Vegetarian
                    </span>
                </div>
                {
                    filteredMeals?.length > 0
                        ? <div className={classes.meals}>
                            {filteredMeals?.map((meal) => (
                                <Link href={`/meal/${meal?._id}`} className={classes.meal} key={meal._id}>
                                    <div className={classes.imgContainer}>
                                        <Image src={meal.image} width="250" height="250" />
                                    </div>
                                    <div className={classes.mealData}>
                                        <h4>{meal.title}</h4>
                                        <span>${meal.price}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        : <h2 className={classes.noMeal}>There are no {activeCategory ? activeCategory : 'meals'} in stock</h2>
                }
            </div>

        </div>
    )
}

export default Catalog