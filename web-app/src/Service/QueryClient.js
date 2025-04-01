import { QueryClient } from "react-query";
import { QueryKeys } from "./QueryKeys";
import { AdminService } from "./AdminService";
// import { StudentService } from "./StudentService";
import { CourseService } from "./CourseService";
import { LectureService } from "./LectureService";
import { MaterialService } from "./MaterialService";
import { AssignmentService } from "./AssignmentService";
import { SubmissionService } from "./SubmissionService";

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
  // const studentsService = new StudentService();
  const courseService = new CourseService();
  const lectureService = new LectureService();
  const materialService = new MaterialService();
  const assignmentService = new AssignmentService();
  const submissionService = new SubmissionService();

  queryClient.setQueryDefaults(QueryKeys.ADMINS, {
    queryFn: () => adminsService.findAll(),
  });
  // queryClient.setQueryDefaults(QueryKeys.STUDENTS, {
  //   queryFn: () => studentsService.findAll(),
  // });
  queryClient.setQueryDefaults(QueryKeys.COURSE, {
    queryFn: () => courseService.findAll(),
  });
  queryClient.setQueryDefaults(QueryKeys.LECTURE, {
    queryFn: () => lectureService.findAll(),
  });
  queryClient.setQueryDefaults(QueryKeys.MATERIAL, {
    queryFn: () => materialService.findAll(),
  });
  queryClient.setQueryDefaults(QueryKeys.ASSIGNMENT, {
    queryFn: () => assignmentService.findAll(),
  });
  queryClient.setQueryDefaults(QueryKeys.SUBMISSION, {
    queryFn: () => submissionService.findAll(),
  });
};
