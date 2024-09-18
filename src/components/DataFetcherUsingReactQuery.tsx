import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { User } from '../types/data'; // Adjust the path as necessary

const fetchUsers = async (): Promise<User[]> => {
  const response = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
  return response.data;
};

const DataFetcherUsingReactQuery: React.FC = () => {
  const { data, error, isLoading } = useQuery<User[], Error>(['users'], fetchUsers);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{(error as Error).message}</p>;

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {data?.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataFetcherUsingReactQuery;
