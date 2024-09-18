import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { User } from "../types/data"; // Adjust the path as necessary

const addItem = async (newUser: User) => {
  const response = await axios.post(
    "https://jsonplaceholder.typicode.com/users",
    newUser
  );
  return response.data;
};

const MutationExample: React.FC = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(addItem, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });

  // State for user input
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleAddItem = () => {
    mutation.mutate({ name, email }); // Pass the new user data
    setName(""); // Clear the input field
    setEmail(""); // Clear the input field
  };

  return (
    <div>
      <h2>Add New User</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        onClick={handleAddItem}
        disabled={mutation.isLoading || !name || !email}
      >
        {mutation.isLoading ? "Adding..." : "Add User"}
      </button>
      {mutation.isError && <p>Error adding user: {mutation.error.message}</p>}
      {mutation.isSuccess && <p>User added successfully!</p>}
    </div>
  );
};

export default MutationExample;
