import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { FaGithubAlt } from 'react-icons/fa';

const UserSearch = () => {
  const [userName, setUserName] = useState('');
  const [submittedUserName, setSubmittedUserName] = useState('');

  // We dont need to initialize this value as we do in useEffect 'cuz useQuery takes care of it
  const { data, isLoading, isError, error } = useQuery({
    // This is like the bracket we use in useEffect, everytime this changes it will call this funcion again, like listening to this key
    queryKey: ['users', submittedUserName],
    // & this is where you write the function
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_GITHUB_API_URL}/users/${submittedUserName}`,
      );
      if (!res.ok) throw new Error('Error while fetching the data');

      const data = await res.json();
      console.log(data);
      return data;
    },
    enabled: !!submittedUserName, // What !! does is that it will turn the submittedUserName in the boolean value.
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmittedUserName(userName.trim());
  };

  return (
    <>
      <form onSubmit={handleSubmit} className='form'>
        <input
          type='text'
          placeholder='Enter GitHub UserName...'
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <button type='submit'>Search</button>
        {isLoading && <p className='status'>Loading...</p>}
        {isError && <p className='status error'>{error.message}</p>}

        {data && (
          <div className='user-card'>
            <img src={data.avatar_url} alt={data.name} className='avatar' />
            <h2>{data.name || data.login}</h2>
            <p className="bio">{data.bio}</p>
            <a href={data.html_url} className='profile-btn' target='_blank' rel='noopener noreferrer'>
                <FaGithubAlt />View GitHub Profile</a>
          </div>
        )}
      </form>
    </>
  );
};

export default UserSearch;
