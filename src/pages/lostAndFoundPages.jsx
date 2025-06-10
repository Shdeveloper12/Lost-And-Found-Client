import React, { useState } from 'react';
import { useLoaderData, useNavigation } from 'react-router';
import AllPostCard from './AllPostCard';


const LostAndFoundPages = () => {
    const initialPost = useLoaderData();
    const navigation = useNavigation();
    const [lostandfounditems, setLostandfounditems] = useState(initialPost);

     if (navigation.state === 'loading') {
        return (
            <div className="flex justify-center items-center h-64">
                <span className="loading loading-ring loading-xl"></span>
            </div>
        );
    }
    if(!initialPost || initialPost.length === 0){
        return <div className='text-4xl text-center font-bold '>No Post Found</div>
    }
    return (
        <div>
            <div className='text-center lato my-12  text-2xl font-bold text-orange-500'> All Lost And Found Items</div>
           <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-2  p-5'>
                {

                    lostandfounditems.map(item => <AllPostCard
                    key={item._id}
                    post={item}
                    setlostandfounditems={setLostandfounditems}

                    
                    >
                        
                    </AllPostCard>)
                }
                

           </div>
        </div>
    );
};

export default LostAndFoundPages;