import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import axios from "axios";

const API_URL = "http://localhost:3000"

// ================= API =================
const fetchTasks = async () => {
  const res = await axios.get(`${API_URL}/tasks`);
  return res.data;
};

const createTask = async (task) => {
  const res = await axios.post(`${API_URL}/tasks`, task);
  return res.data;
};

const updateTaskStatus = async ({ id, status }) => {
  const res = await axios.patch(`${API_URL}/tasks/${id}`, { status });
  return res.data;
};

// ================= COMPONENT =================
const Dashboard = () => {
  const queryClient = useQueryClient();
  const [view, setView] = useState("list");

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Fetch tasks
  const {
    data: tasks = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  // Create task (optimistic)
  const createMutation = useMutation({
    mutationFn: createTask,
    onMutate: async (newTask) => {
      await queryClient.cancelQueries(["tasks"]);
      const previousTasks = queryClient.getQueryData(["tasks"]);

      queryClient.setQueryData(["tasks"], (old = []) => [
        ...old,
        { ...newTask, _id: Date.now() },
      ]);

      return { previousTasks };
    },
    onError: (_err, _newTask, ctx) => {
      queryClient.setQueryData(["tasks"], ctx.previousTasks);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["tasks"]);
    },
  });

  // Status update (optimistic)
  const statusMutation = useMutation({
    mutationFn: updateTaskStatus,
    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries(["tasks"]);
      const previousTasks = queryClient.getQueryData(["tasks"]);

      queryClient.setQueryData(["tasks"], (old = []) =>
        old.map((task) =>
          task._id === id ? { ...task, status } : task
        )
      );

      return { previousTasks };
    },
    onError: (_err, _data, ctx) => {
      queryClient.setQueryData(["tasks"], ctx.previousTasks);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["tasks"]);
    },
  });

  const onSubmit = (data) => {
    createMutation.mutate({
      ...data,
      status: "TODO",
      priority: "MEDIUM",
    });
    reset();
  };

  // ================= UI STATES =================
  if (isLoading)
    return <p className="text-center mt-10">⏳ Loading tasks...</p>;

  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">
        ❌ {error.message}
      </p>
    );

  // ================= RENDER =================
  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Task Dashboard</h2>
        <div className="flex gap-2">
          {["list", "kanban"].map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-3 py-1 rounded ${
                view === v ? "bg-black text-white" : "bg-gray-200"
              }`}
            >
              {v.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Task Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-8 flex flex-col md:flex-row gap-3"
      >
        <input
          {...register("title", { required: "Title is required" })}
          placeholder="Task title"
          className="border rounded px-3 py-2 flex-1"
        />
        {errors.title && (
          <span className="text-red-500 text-sm">
            {errors.title.message}
          </span>
        )}

        <input
          {...register("description")}
          placeholder="Description"
          className="border rounded px-3 py-2 flex-1"
        />

        <select
          {...register("priority")}
          className="border rounded px-3 py-2"
        >
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
        </select>

        <button className="bg-black text-white px-4 py-2 rounded">
          Add
        </button>
      </form>

      {/* LIST VIEW */}
      {view === "list" && (
        <div className="grid gap-4">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="p-4 border rounded hover:shadow transition"
            >
              <h3 className="font-semibold">{task.title}</h3>
              <p className="text-gray-600">{task.description}</p>

              <div className="flex justify-between mt-2">
                <span className="text-sm">{task.priority}</span>

                <select
                  value={task.status}
                  onChange={(e) =>
                    statusMutation.mutate({
                      id: task._id,
                      status: e.target.value,
                    })
                  }
                  className="border rounded text-sm"
                >
                  <option value="TODO">TODO</option>
                  <option value="IN_PROGRESS">IN_PROGRESS</option>
                  <option value="DONE">DONE</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* KANBAN VIEW */}
      {view === "kanban" && (
        <div className="grid md:grid-cols-3 gap-4">
          {["TODO", "IN_PROGRESS", "DONE"].map((status) => (
            <div key={status} className="bg-gray-100 p-4 rounded">
              <h4 className="font-semibold mb-3">{status}</h4>
              {tasks
                .filter((task) => task.status === status)
                .map((task) => (
                  <div
                    key={task._id}
                    className="bg-white p-3 mb-2 rounded shadow-sm"
                  >
                    <p className="font-medium">{task.title}</p>
                    <p className="text-sm text-gray-500">
                      {task.priority}
                    </p>
                  </div>
                ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
