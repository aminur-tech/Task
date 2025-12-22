import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./firebase.config";
import DashboardLayout from "./Components/DashboardLayout";
import TaskDashboard from "./Components/TaskDashboard";
import Login from "./Components/Login";


function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!user) return <Login />;

  return (
    <DashboardLayout user={user}>
      <TaskDashboard userId={user.uid} />
    </DashboardLayout>
  );
}

export default App;
