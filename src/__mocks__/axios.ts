const axios = {
  create: () => ({
    get: () =>
      Promise.resolve({
        data: {
          daily: [],
          hourly: [{ dt: 100 }],
        },
      }),
  }),
};

export default axios;
