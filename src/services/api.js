import axios from "axios";

export const nasaAPI = {
  getSST: async (lat, lng, date) => {
    try {
      const response = await axios.get(`${LMAO}/api/file_search`, {
        params: {
          sensor: "modisa",
          dtype: "L3m",
          addurl: 1,
          results_as_file: 1,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching SST:", error);
      return null;
    }
  },

  // Get chlorophyll-a concentration
  getChlorophyll: async (lat, lng, date) => {
    // TODO: Implement chlorophyll data fetch
    // Example: Ocean Color data
    return null;
  },

  // Get ocean current data
  getOceanCurrents: async (lat, lng) => {
    // TODO: Implement ocean currents data
    // Example: OSCAR (Ocean Surface Current Analysis Real-time)
    return null;
  },
};

export const backendAPI = {
  // Get all shark tracking data
  getSharks: async () => {
    try {
      const response = await axios.get(`${BACKEND_API}/sharks`);
      return response.data;
    } catch (error) {
      console.error("Error fetching sharks:", error);
      return [];
    }
  },

  // Get shark by ID
  getSharkById: async (id) => {
    try {
      const response = await axios.get(`${BACKEND_API}/sharks/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching shark:", error);
      return null;
    }
  },

  // Get foraging predictions
  getForagingPrediction: async (sharkId) => {
    try {
      const response = await axios.get(`${BACKEND_API}/predictions/${sharkId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching prediction:", error);
      return null;
    }
  },

  // Submit new tag data
  submitTagData: async (tagData) => {
    try {
      const response = await axios.post(`${BACKEND_API}/tags`, tagData);
      return response.data;
    } catch (error) {
      console.error("Error submitting tag data:", error);
      return null;
    }
  },
};
