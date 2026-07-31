import { FaGithubAlt } from 'react-icons/fa';
import type { GitHubUser } from '../type';

const UserCard = ({ data }: { data: GitHubUser }) => {
  return (
    <div className='user-card'>
      <img src={data.avatar_url} alt={data.name} className='avatar' />
      <h2>{data.name || data.login}</h2>
      <p className='bio'>{data.bio}</p>
      <a
        href={data.html_url}
        className='profile-btn'
        target='_blank'
        rel='noopener noreferrer'
      >
        <FaGithubAlt />
        View GitHub Profile
      </a>
    </div>
  );
};

export default UserCard;
