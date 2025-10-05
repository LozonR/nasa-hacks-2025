export const backendAPI = {
  // Get all shark tracking data
  getSharks: async () => {
    let response = await fetch("/api/sharks");
    let sharks = await response.json();
    return sharks;
  },

  getSharkDetails: async (shark_id) => {
    let response = await fetch(`/api/sharks/details/${shark_id}`);
    let shark = await response.json();
    return shark;
  },
};
