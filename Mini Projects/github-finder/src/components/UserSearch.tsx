import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchGithubUser, searchGithubUser } from '../api/github';
import { useDebounce } from 'use-debounce';
import UserCard from './UserCard';
import RecentSearches from './RecentSearch';
import type { GitHubUser } from '../type';

const UserSearch = () => {
  const [userName, setUserName] = useState('');
  const [submittedUserName, setSubmittedUserName] = useState('');
  const [recentUsers, setRecentUsers] = useState<string[]>(() => {
    const stored = localStorage.getItem('recentUsers');
    // Json parse converts object into string
    return stored ? JSON.parse(stored) : [];
  });

  // So in this it is taking 2 parmeters, one is userName and secound is ms after which the fuction is fired off
  const [debouncedUsername] = useDebounce(userName, 300);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // We dont need to initialize this value as we do in useEffect 'cuz useQuery takes care of it
  // Query to fetch specific user
  const { data, isLoading, isError, error, refetch } = useQuery({
    // This is like the bracket we use in useEffect, everytime this changes it will call this funcion again, like listening to this key

    // The whole array is like a composite key, it works like this
    //                     ['users', 'zaid']
    // ['users', 'octocat']
    // ['posts', 'zaid']
    // It will check in cache memory if it is present it wont fetch again, but if it is not present it will fetch the new user.

    //     Query starts
    //       │
    //       ▼
    // Does this queryKey exist in cache?
    //       │
    //    ┌──┴──┐
    //    │     │
    //   No    Yes
    //    │     │
    //    ▼     ▼
    // Call    Is cached data still fresh?
    // queryFn      │
    //              ├───────────┐
    //              │           │
    //            Yes          No
    //              │           │
    //              ▼           ▼
    //       Return cached   Return cached
    //       data only       data immediately
    //                       + fetch in background

    queryKey: ['users', submittedUserName],
    // & this is where you write the function
    queryFn: () => fetchGithubUser(submittedUserName),
    // This is will prevent submitting for the first time
    enabled: !!submittedUserName, // What !! does is that it will turn the submittedUserName in the boolean value.
  });

  // Query to fetch suggestions for search users
  // We are renaming the data to suggestions
  const { data: suggestions } = useQuery({
    queryKey: ['github-user-suggestions', debouncedUsername],
    // & this is where you write the function
    queryFn: () => searchGithubUser(debouncedUsername),
    // This is will prevent submitting for the first time
    enabled: debouncedUsername.length > 1, // What !! does is that it will turn the submittedUserName in the boolean value.
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = userName.trim();
    if (!trimmed) return;
    setSubmittedUserName(trimmed);
    setUserName('');

    // We are taking previous user list, then updating it, if user already exists, then we dont add it again by removing the first occurance
    setRecentUsers((prev) => {
      const updated = [trimmed, ...prev.filter((user) => user !== trimmed)];
      // returning the last 5 values
      return updated.slice(0, 5);
    });
  };

  useEffect(() => {
    // JSON.stringify converts the string into the Json Object
    localStorage.setItem('recentUsers', JSON.stringify(recentUsers));
  }, [recentUsers]);

  return (
    <>
      <form onSubmit={handleSubmit} className='form'>
        <div className='dropdown-wrapper'>
          <input
            type='text'
            placeholder='Enter GitHub UserName...'
            value={userName}
            onChange={(e) => {
              const val = e.target.value;
              setUserName(e.target.value);
              setShowSuggestions(val.trim().length > 1);
            }}
          />

          {showSuggestions && suggestions?.length > 0 && (
            <ul className='suggestions'>
              {suggestions.slice(0, 5).map((user: GitHubUser) => (
                <li
                  key={user.login}
                  onClick={() => {
                    setUserName(user.login);
                    setShowSuggestions(false);
                    if (submittedUserName !== user.login) {
                      setSubmittedUserName(user.login);
                    } else {
                      refetch();
                    }
                  }}
                >
                  <img
                    src={user.avatar_url}
                    alt={user.name}
                    className='avatar-xs'
                  />
                  {user.login}
                </li>
              ))}
            </ul>
          )}
        </div>
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
