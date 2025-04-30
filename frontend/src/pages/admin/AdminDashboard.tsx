import { useState } from "react";
import axios from "axios";
import { SendHorizonal } from "lucide-react";

const AdminDashboard = () => {
  const [location, setLocation] = useState("");
  const [radius, setRadius] = useState("20");
  const [users, setUsers] = useState<
    { id: number; name: string; distance_km: number; email: string }[]
  >([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [locOrLatLon, setLocOrLatLon] = useState(true);

  const handleSearch = async () => {
    if (locOrLatLon) {
      if (!location.trim()) {
        alert("Please enter a location and radius");
        return;
      }
    } else {
      if (lat.trim() === "" || lon.trim() === "" || radius.trim() === "") {
        alert("Please enter latitude, longitude and radius");
        return;
      }
    }

    setLoading(true);

    try {
      const payload = locOrLatLon
        ? { address: location, radius: parseFloat(radius), location_addr: true }
        : {
            lat: parseFloat(lat),
            lon: parseFloat(lon),
            radius: parseFloat(radius),
            location_addr: false,
          };

      const { data } = await axios.post(
        "http://localhost:5000/api/admin/location/haversine",
        payload
      );

      setUsers(data);
      setSelected([]); // Clear selected emails
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setLocOrLatLon(value !== "latlon");
  };

  const toggleSelect = (email: string) => {
    setSelected((prevSelected) =>
      prevSelected.includes(email)
        ? prevSelected.filter((e) => e !== email)
        : [...prevSelected, email]
    );
  };

  const handleSendMessage = async () => {
    console.log("Selected emails:", selected);
    // Send selected to API if needed
  };

  return (
    <div className="p-4 sm:p-8 space-y-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-stretch bg-white p-4 sm:p-8 rounded-xl shadow-lg">
        <select
          onChange={handleChange}
          className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-gray-50 w-full sm:w-auto"
        >
          <option value="location">Location</option>
          <option value="latlon">Latitude/Longitude</option>
        </select>

        {locOrLatLon ? (
          <input
            className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-gray-50 w-full sm:w-auto"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        ) : (
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <input
              className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-gray-50 w-full sm:w-40"
              placeholder="Latitude"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
            />
            <input
              className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-gray-50 w-full sm:w-40"
              placeholder="Longitude"
              value={lon}
              onChange={(e) => setLon(e.target.value)}
            />
          </div>
        )}

        <input
          className="w-full sm:w-32 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-gray-50"
          placeholder="Radius km"
          value={radius}
          onChange={(e) => setRadius(e.target.value.replace(/[^0-9.]/g, ""))}
        />

        <button
          onClick={handleSearch}
          className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 hover:cursor-pointer"
          disabled={loading}
        >
          {loading ? "Loading..." : "Search"}
        </button>
      </div>

      {/* Users Table */}
      {users.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow-lg">
            <thead>
              <tr className="bg-blue-100 text-left text-base font-semibold">
                <th className="p-3 sm:p-4"></th>
                <th className="p-3 sm:p-4">ID</th>
                <th className="p-3 sm:p-4">Name</th>
                <th className="p-3 sm:p-4">Email</th>
                <th className="p-3 sm:p-4">Distance&nbsp;(km)</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-t hover:bg-blue-50 transition">
                  <td className="p-3 sm:p-4">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 rounded"
                      checked={selected.includes(u.email)}
                      onChange={() => toggleSelect(u.email)}
                    />
                  </td>
                  <td className="p-3 sm:p-4">{u.id}</td>
                  <td className="p-3 sm:p-4">{u.name}</td>
                  <td className="p-3 sm:p-4">{u.email}</td>
                  <td className="p-3 sm:p-4">{u.distance_km}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h1>No users found</h1>
      )}

      {/* Send Button */}
      <button
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 hover:cursor-pointer flex gap-2 ml-auto"
        onClick={handleSendMessage}
        disabled={selected.length === 0}
      >
        <SendHorizonal />
        Send Message
      </button>
    </div>
  );
};

export default AdminDashboard;
