import axios from "axios";

const BASE = "http://localhost:8080/placement";

const api = axios.create({
  baseURL: BASE,
  headers: {
    "Content-Type": "application/json"
  }
});

/*
 Endpoints:
 POST   /placement/add
 GET    /placement/getAll
 GET    /placement/{id}
 PUT    /placement/update/{id}
 DELETE /placement/delete/{id}
*/

export const createPlacement = (placement) => api.post("/add", placement);
export const getAllPlacements = () => api.get("/getAll");
export const getPlacementById = (id) => api.get(`/${id}`);
export const updatePlacement = (id, placement) => api.put(`/update/${id}`, placement);
export const deletePlacement = (id) => api.delete(`/delete/${id}`);

export default api;
