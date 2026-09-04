import { useEffect, useState } from "react";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
        );
        const userData = await response.json();
        setUsers(userData);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);
  return users;
};
const App = () => {
  const users = useUsers();
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <>
      <input
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by User Name"
      />
      <ul>
        {users
          .filter((user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()),
          )
          .map((user) => {
            return (
              <li key={user.id}>
                {user.name} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {user.email}
              </li>
            );
          })}
      </ul>
    </>
  );
};
export default App;
