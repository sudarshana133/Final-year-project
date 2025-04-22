import { useEffect, useState } from "react";
import axios from "axios";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");

  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude.toFixed(5);
          const lon = pos.coords.longitude.toFixed(5);
          setLocation(`${lat}, ${lon}`);
          setMessage(""); // clear any previous error
        },
        () => {
          setMessage(
            "Location access denied. Disaster management requires location access."
          );
        }
      );
    } else {
      setMessage("Geolocation is not supported by your browser.");
    }
  };

  useEffect(() => {
    detectLocation();
  }, []);

  const handleLogin = async () => {
    if (!location) {
      setMessage("Please enable location before logging in.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
        location,
      });
      const { token } = res.data;
      localStorage.setItem("token", token);
      window.location.href = "/dashboard/weather";
    } catch (err: unknown) {
      setMessage("Login failed. Please check your credentials.");
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Login
        </h2>

        <input
          className="w-full mb-4 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full mb-4 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex items-center gap-2 mb-4">
          <input
            className="flex-1 px-4 py-2 border rounded-xl"
            type="text"
            value={location}
            readOnly
            placeholder="Location"
          />
          <button
            onClick={detectLocation}
            className="bg-blue-500 text-white px-3 py-2 rounded-xl hover:bg-blue-600 text-sm"
          >
            Detect Location
          </button>
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Login
        </button>

        {message && (
          <p className="mt-4 text-center text-sm text-red-600">{message}</p>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
