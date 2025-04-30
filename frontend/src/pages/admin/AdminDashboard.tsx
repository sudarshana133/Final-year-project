import { useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [location, setLocation] = useState("");
  const [radius, setRadius] = useState("20");
  const [users, setUsers] = useState<
    { id: number; name: string; distance_km: number }[]
  >([]);
  const [selected, setSelected] = useState<Record<number, boolean>>({});
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!location.trim() || !radius) return;
    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/admin/location/haversine",
        {
          address: location,
          radius: parseFloat(radius),
        }
      );
      setUsers(data);
      setSelected({});
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const toggleSelect = (id: number) =>
    setSelected((p) => ({ ...p, [id]: !p[id] }));

  return (
    <div className="p-6 space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          className="flex-1" 
          placeholder="Latitude"

        />
        <input
          className="w-28 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Radius km"
          value={radius}
          onChange={(e) => setRadius(e.target.value.replace(/[^0-9.]/g, ""))}
        />
        <button
          onClick={handleSearch}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? "Loading..." : "Search"}
        </button>
      </div>

      {users.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead>
              <tr className="bg-gray-100 text-left text-sm font-medium">
                <th className="p-3"></th>
                <th className="p-3">ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Distance&nbsp;(km)</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-t text-sm">
                  <td className="p-3">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 rounded"
                      checked={!!selected[u.id]}
                      onChange={() => toggleSelect(u.id)}
                    />
                  </td>
                  <td className="p-3">{u.id}</td>
                  <td className="p-3">{u.name}</td>
                  <td className="p-3">{u.distance_km}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
