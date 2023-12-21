// // src/components/UserProfile.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Clock from './Clock';
import './userProfile.css'

const UserProfile = () => {
    const { id } = useParams();
    // const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        let isMounted = true;

        // Fetch user details from API
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then((response) => response.json())
            .then((data) => {
                if (isMounted) {
                    setUser(data);
                }
            })
            .catch((error) => {
                console.error('Error fetching user:', error.message);
                // Handle error, e.g., navigate to an error page
            });

        // Fetch user posts from API
        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
            .then((response) => response.json())
            .then((data) => {
                if (isMounted) {
                    setPosts(data);
                }
            })
            .catch((error) => {
                console.error('Error fetching user posts:', error.message);
                // Handle error, e.g., navigate to an error page
            });

        // Cleanup function to cancel asynchronous operations on component unmount
        return () => {
            isMounted = false;
        };
    }, [id]);

    if (!user) {
        return <div>Loading...</div>;
    }

    // const handleBack = () => {
    //     console.log("\n\n\n Hi \n Bye")
    //     navigate('/'); // Navigate to the root directory
    // };

    return (
        <div className="user-profile-container">

            <Clock />

            <h1>{user.name}'s Profile</h1>
            <div className="user-details">
                <div>
                    <p>
                        {user.name}
                    </p>
                    <p>
                        {user.username} | {user.company.catchPhrase}
                    </p>
                </div>
                <div>
                    <p>
                        <strong> {user.address.city}, {user.address.street}, {user.address.suite}</strong>
                    </p>


                    <p>
                        {user.email} | {user.phone}
                    </p>
                </div>


            </div>
            <div className="user-posts">
                <h2>User Posts</h2>
                {posts.map((post) => (
                    <div key={post.id} className="post-card">
                        <p className="post-title">{post.title}</p>
                        <p className="post-content">{post.body}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserProfile;


// src/components/UserProfile.js
// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import Clock from './Clock';
// import './userProfile.css'

// const UserProfile = () => {
//     const { id } = useParams();
//     const [user, setUser] = useState(null);
//     const [posts, setPosts] = useState([]);

//     useEffect(() => {
//         const fetchUserData = async () => {
//             try {
//                 const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
//                 const userData = await userResponse.json();
//                 setUser(userData);

//                 const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
//                 const postsData = await postsResponse.json();
//                 setPosts(postsData);
//             } catch (error) {
//                 console.error('Error fetching user data:', error);
//             }
//         };

//         fetchUserData();
//     }, [id]);

//     if (!user) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div>
//             <Link to="/">
//                 <button onClick={<link></link>}>Back to User Directory</button>
//             </Link>
//             <h1>{user.name}'s Profile</h1>
//             <Clock />
//             <div>
//                 <p>Name: {user.name}</p>
//                 <p>Username: {user.username}</p>
//                 <p>Catch Phrase: {user.company.catchPhrase}</p>
//             </div>
//             <div>
//                 <p>Address: {user.address.city}, {user.address.street}, {user.address.suite}</p>
//                 <p>Email: {user.email}</p>
//                 <p>Phone: {user.phone}</p>
//             </div>
//             <div>
//                 <h2>Posts</h2>
//                 {posts.map((post) => (
//                     <div key={post.id}>
//                         <h3>{post.title}</h3>
//                         <p>{post.body}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default UserProfile;
