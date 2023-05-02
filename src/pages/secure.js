import { getSession } from 'next-auth/react'
import React from 'react'

const Secure = () => {
  return (
    <div>Secure</div>
  )
}

export async function getServerSideProps(context){
    const session = await getSession(context)

    if(!session){
        return {
            redirect: {
                destination: '/error',
                permanent: false,
            }
        }
    }

    return {
        props: {
            session
        }
    }
}

export default Secure