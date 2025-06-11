import React, { useState, useMemo } from 'react';
import { useLoaderData, useNavigation } from 'react-router';
import AllPostCard from './AllPostCard';

const LostAndFoundPages = () => {
  const initialPosts = useLoaderData();
  const navigation = useNavigation();


  const sortedPosts = useMemo(() => {
    return [...initialPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [initialPosts]);

  const [lostAndFoundItems, setLostAndFoundItems] = useState(sortedPosts);

  if (navigation.state === 'loading') {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-ring loading-xl"></span>
      </div>
    );
  }

  if (!lostAndFoundItems || lostAndFoundItems.length === 0) {
    return (
      <div className="text-4xl text-center font-bold mt-10 text-gray-600">
        No Posts Found
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-center my-12 text-3xl font-bold text-orange-500">
        All Lost And Found Items (Recent First)
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-2 p-5">
        {lostAndFoundItems.map((item) => (
          <AllPostCard
            key={item._id}
            post={item}
            setLostAndFoundItems={setLostAndFoundItems}
          />
        ))}
      </div>
    </div>
  );
};

export default LostAndFoundPages;
