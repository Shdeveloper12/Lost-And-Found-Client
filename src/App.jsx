import { useState } from 'react'
import './App.css'
import { useLoaderData } from 'react-router'
import { Home } from 'lucide-react'


function App() {
  const initialPost = useLoaderData()
  const [posts, setPost] = useState(initialPost)

  return (
    <div>

      <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-2 2 bg-green-50 p-5'>

        {

          posts.map(post => <Home

            key={post.id}
            setPost={setPost}
            posts={posts}
            post={post}
            

          ></Home>)


        }



      </div>

    </div>
  )
}

export default App
