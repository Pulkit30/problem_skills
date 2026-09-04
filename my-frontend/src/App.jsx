import { useEffect, useState } from "react";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const getUsers = async () => {
      try {
        setLoading(true);
        setError("");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
        );
        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }
        const userData = await response.json();
        setUsers(userData);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);
  return { users, loading, error };
};
const App = () => {
  const { users, loading, error } = useUsers();
  const [searchTerm, setSearchTerm] = useState("");
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const noUser = filteredUsers.length === 0;

  if (loading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <>
      <input
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by User Name"
      />
      {noUser ? (
        <p>No users found.</p>
      ) : (
        <ul>
          {filteredUsers.map((user) => {
            return (
              <li key={user.id}>
                {user.name} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {user.email}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};
export default App;
