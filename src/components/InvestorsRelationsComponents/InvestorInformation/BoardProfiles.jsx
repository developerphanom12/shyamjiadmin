import React from 'react'
// import Images from '../../../assets/Images'
// import { div } from 'motion/react-client'

const boardProfiles = [
    {
        name: "Mr. Arvind Mehta",
        image: "https://upload.wikimedia.org/wikipedia/en/f/f8/Dummy_Title_Card.jpeg",
        details: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, qui illum? Praesentium cupiditate consectetur soluta voluptatum est tenetur ullam earum vero totam aut culpa nam veritatis incidunt veniam, quas animi."
    },
    {
        name: "Mr. Sanjay Chaurey",
        image: "https://upload.wikimedia.org/wikipedia/en/f/f8/Dummy_Title_Card.jpeg",
        details: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, qui illum? Praesentium cupiditate consectetur soluta voluptatum est tenetur ullam earum vero totam aut culpa nam veritatis incidunt veniam, quas animi."
    },
    {
        name: "Mr. Sanjay Chaurey",
        image: "https://upload.wikimedia.org/wikipedia/en/f/f8/Dummy_Title_Card.jpeg",
        details: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, qui illum? Praesentium cupiditate consectetur soluta voluptatum est tenetur ullam earum vero totam aut culpa nam veritatis incidunt veniam, quas animi."
    }
]

const BoardProfiles = () => {
    return (

        <div className='flex flex-col w-full gap-20'>

            {boardProfiles.map((profile) => (
                <div key={profile.name} className='flex flex-col sm:flex-row w-full gap-3 p-4 '>
                    <div className='sm:w-[20%] w-full'>
                        <img src={"https://upload.wikimedia.org/wikipedia/en/f/f8/Dummy_Title_Card.jpeg"} alt="" />
                    </div>
                    <div className='flex-1'>
                        <p>
                           <strong>{profile.name}</strong> {profile.details}
                        </p>
                    </div>
                </div>))}
        </div>
    )
}

export default BoardProfiles
