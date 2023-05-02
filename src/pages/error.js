import React from 'react'
import classes from '../styles/error.module.css'

const Error = () => {
  return (
    <div className={classes.container}>
        <div className={classes.wrapper}>
            <h2 style={{textAlign: 'center', marginTop: '3rem', fontSize: '46px'}}>
                Unauthenticated or error
            </h2>
        </div>
    </div>
  )
}

export default Error