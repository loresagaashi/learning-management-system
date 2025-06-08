package com.learning_management_system.service;

import com.learning_management_system.data.exam.ExamGradeDTO;
import com.learning_management_system.model.Grade;
import com.learning_management_system.repository.GradeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GradeService extends BasicServiceOperations<GradeRepository, Grade> {

   @Autowired
   protected GradeRepository gradeRepository;

   public GradeService(GradeRepository repository) {
      super(repository);
   }

   /**
    * Returns raw Grade entities where the student has taken an exam.
    */
   public List<Grade> getExamGradesForStudent(Long studentId) {
      return gradeRepository.findByStudentIdAndExamIsNotNull(studentId);
   }

   /**
    * Returns a DTO list of exam grades with exam and course info for a student.
    */
   public List<ExamGradeDTO> getExamGradesDtoForStudent(Long studentId) {
      List<Grade> grades = gradeRepository.findByStudentIdAndExamIsNotNull(studentId);

      return grades.stream()
              .map(grade -> {
                 var exam = grade.getExam();
                 var course = exam.getCourse();
                 return new ExamGradeDTO(
                         exam.getTitle(),
                         exam.getDateTime(),
                         course.getName(),
                         grade.getGrade()
                 );
              })
              .toList();
   }
}
