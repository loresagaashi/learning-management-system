import { QueryClient } from "react-query";
import { QueryKeys } from "./QueryKeys";
import { AdminService } from "./AdminService";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: (count, error) =>
        error.response?.status !== 401 &&
        error.response?.status !== 403 &&
        count < 3,
    },
  },
});

export const setQueryDefaults = () => {
  const adminsService = new AdminService();
  queryClient.setQueryDefaults(QueryKeys.ADMINS, {
    queryFn: () => adminsService.findAll(),
  });
};
