import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { fetchGithubUser } from '../api/github';
import UserCard from './UserCard';
import { FaClock, FaUser } from 'react-icons/fa';
import RecentSearches from './RecentSearch';

const UserSearch = () => {
  const [userName, setUserName] = useState('');
  const [submittedUserName, setSubmittedUserName] = useState('');
  const [recentUsers, setRecentUsers] = useState<string[]>([]);

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
    const trimmed = userName.trim();
    if (!trimmed) return;
    setSubmittedUserName(trimmed);

    // We are taking previous user list, then updating it, if user already exists, then we dont add it again by removing the first occurance
    setRecentUsers((prev) => {
      const updated = [trimmed, ...prev.filter((user) => user !== trimmed)];
      // returning the last 5 values
      return updated.slice(0, 5);
    });
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
      </form>
      {isLoading && <p className='status'>Loading...</p>}
      {isError && <p className='status error'>{error.message}</p>}
      {data && <UserCard data={data} />}
      {recentUsers.length > 0 && (
        <RecentSearches
          users={recentUsers}
          onSelect={(userName) => {
            (setUserName(userName), setSubmittedUserName(userName));
          }}
        />
      )}
    </>
  );
};

export default UserSearch;
