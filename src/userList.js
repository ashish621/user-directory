// src/components/UserList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch users from API
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const userData = await response.json();

        console.log("user ", userData)
        // Fetch and update posts for each user
        const updatedUsers = await Promise.all(
          userData.map(async (user) => {
            const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`);
            const postsData = await postsResponse.json();
            return { ...user, posts: postsData };
          })
        );

        setUsers(updatedUsers);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <h1>User Directory</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/user/${user.id}`}>
              <div>
                <p>{user.name}</p>
                <p>Posts: {user.posts ? user.posts.length : 0}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
