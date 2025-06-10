import React from 'react';
import { useLoaderData, useNavigation } from 'react-router';

const PostDetailsPages = () => {
    const post = useLoaderData();
    const navigation = useNavigation();

    if(navigation.state === 'loading'){
        return(
            <div className="flex justify-center items-center h-64">
                <span className="loading loading-ring loading-xl"></span>
            </div>
        )
    }
    if(!post){
        return <div className='text-red-500 text-center font-bold text-4xl'>Post details not found</div>
    }

    const {_id, title,name, email, location,category, description, date,types,imageurl } = post;

    return (
        <div className='p-16 '>
            <div className='bg-green-300 max-w-3xl mx-auto p-12 shadow-2xl  rounded-xl'>

                <img src={imageurl} alt="postImg" className='rounded w-full h-100'/>
                <div className='mt-5'>
                <h1 className='text-3xl font-bold mb-3'> {title}</h1>
                <p>
                    <storng className="font-semibold">Type: </storng> {types}
                </p>
                <p>
                    <storng className="font-semibold">Name: </storng>{name}
                </p>
                <p>
                    <storng className="font-semibold">Email: </storng>{email}
                </p>
                <p>
                    <storng className="font-semibold">Location: </storng>{location}
                </p>
                <p>
                    <storng className="font-semibold">Category: </storng>{category}
                </p>
                <p>
                    <storng className="font-semibold">Date: </storng>{date}
                </p>
                 <p>
                    <storng className="font-semibold">Description: </storng>{description}
                </p>
                </div>

            </div>
        </div>
    );
};

export default PostDetailsPages;