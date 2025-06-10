import React from 'react';
import { Link, useLoaderData } from 'react-router';
import AllPostCard from '../pages/AllPostCard';

const LatestFindAndLost = () => {
     const post = useLoaderData();
    return (
        <div className='p-5'>
            <h1 className='text-center font-bold text-3xl mt-8'>Latest Lost and Found Posts</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-5 md:mx-5 lg:mx-0'>
                {
                    post.slice(0 , 6).map(posts =>(
                        <AllPostCard
                            key={posts._id} post={posts}
                        ></AllPostCard>
                    ))
                }

            </div>
            <div className='text-center mt-5'>
                <Link to="/lostandfound" className='btn btn-outline btn-info'>View All Post</Link>
            </div>
            
        </div>
    );
};

export default LatestFindAndLost;