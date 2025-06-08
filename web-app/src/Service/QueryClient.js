import { QueryClient } from "react-query";
import { AdminService } from "./AdminService";
import { AssignmentService } from "./AssignmentService";
import { CityService } from "./CityService";
import { CourseService } from "./CourseService";
import { EnrollmentService } from "./EnrollmentService";
import { ExamService } from "./ExamService";
import { FeedbackService } from "./FeedbackService";
import { GenerationService } from "./GenerationService";
import { GradeService } from "./GradeService";
import { LectureService } from "./LectureService";
import { LogService } from "./LogService";
import { MaterialService } from "./MaterialService";
import { OrientationService } from "./OrientationService";
import { PaymentService } from "./PaymentService";
import { ProfessorService } from "./ProfessorService";
import { QueryKeys } from "./QueryKeys";
import { ReportService } from "./ReportService";
import { ScheduleService } from "./ScheduleService";
import { SemesterService } from "./SemesterService";
import { StudentGroupService } from "./StudentGroupService";
import { StudentService } from "./StudentService";
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
  const studentsService = new StudentService();
  const professorService = new ProfessorService();
  const courseService = new CourseService();
  const lectureService = new LectureService();
  const materialService = new MaterialService();
  const assignmentService = new AssignmentService();
  const submissionService = new SubmissionService();
  const gradeService = new GradeService();
  const reportService = new ReportService();
  const logService = new LogService();
  const paymentService = new PaymentService();
  const orientationService = new OrientationService();
  const scheduleService = new ScheduleService();
  const feedbackService = new FeedbackService();
  const enrollmentService = new EnrollmentService();
  const cityService = new CityService();
  const studentGroupsService = new StudentGroupService();
  const generationService = new GenerationService();
  const semesterService = new SemesterService();
  const examService = new ExamService();

  queryClient.setQueryDefaults(QueryKeys.ADMIN, {
    queryFn: () => adminsService.findAll(),
  });
  queryClient.setQueryDefaults(QueryKeys.STUDENTS, {
    queryFn: () => studentsService.findAll(),
  });
  queryClient.setQueryDefaults(QueryKeys.PROFESSOR, {
    queryFn: () => professorService.findAll(),
  });
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
  queryClient.setQueryDefaults(QueryKeys.GRADE, {
    queryFn: () => gradeService.findAll(),
  });
  queryClient.setQueryDefaults(QueryKeys.REPORT, {
    queryFn: () => reportService.findAll(),
  });
  queryClient.setQueryDefaults(QueryKeys.LOG, {
    queryFn: () => logService.findAll(),
  });
  queryClient.setQueryDefaults(QueryKeys.PAYMENT, {
    queryFn: () => paymentService.findAll(),
  });
  queryClient.setQueryDefaults(QueryKeys.ORIENTATION, {
    queryFn: () => orientationService.findAll(),
  });
  queryClient.setQueryDefaults(QueryKeys.SCHEDULE, {
    queryFn: () => scheduleService.findAll(),
  });
  queryClient.setQueryDefaults(QueryKeys.FEEDBACK, {
    queryFn: () => feedbackService.findAll(),
  });
  queryClient.setQueryDefaults(QueryKeys.ENROLLMENT, {
    queryFn: () => enrollmentService.findAll(),
  });
  queryClient.setQueryDefaults(QueryKeys.CITY, {
    queryFn: () => cityService.findAll(),
  });
  queryClient.setQueryDefaults(QueryKeys.STUDENT_GROUPS, {
    queryFn: () => studentGroupsService.findAll(),
  });
  queryClient.setQueryDefaults(QueryKeys.GENERATIONS, {
    queryFn: () => generationService.findAll(),
  });
  queryClient.setQueryDefaults(QueryKeys.SEMESTER, {
    queryFn: () => semesterService.findAll(),
  });
  queryClient.setQueryDefaults(QueryKeys.EXAM, {
    queryFn: () => examService.findAll(),
  });
};
