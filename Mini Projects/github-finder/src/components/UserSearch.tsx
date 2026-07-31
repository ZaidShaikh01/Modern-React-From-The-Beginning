import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { fetchGithubUser } from '../api/github';
import UserCard from './UserCard';

const UserSearch = () => {
  const [userName, setUserName] = useState('');
  const [submittedUserName, setSubmittedUserName] = useState('');

  // We dont need to initialize this value as we do in useEffect 'cuz useQuery takes care of it
  const { data, isLoading, isError, error } = useQuery({
    // This is like the bracket we use in useEffect, everytime this changes it will call this funcion again, like listening to this key
    queryKey: ['users', submittedUserName],
    // & this is where you write the function
    queryFn: () => fetchGithubUser(submittedUserName),
    // This is will prevent submitting for the first time
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
          <UserCard data={data} />
        )}
      </form>
    </>
  );
};

export default UserSearch;
