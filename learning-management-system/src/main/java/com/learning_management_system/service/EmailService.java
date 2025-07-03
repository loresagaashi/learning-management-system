package com.learning_management_system.service;

import com.learning_management_system.data.email.ReplacedWildCardsDTO;
import com.learning_management_system.data.email.SendEmailDTO;
import com.learning_management_system.model.Course;
import com.learning_management_system.model.Exam;
import com.learning_management_system.model.Professor;
import com.learning_management_system.model.Student;
import com.learning_management_system.repository.ProfessorRepository;
import com.learning_management_system.repository.StudentRepository;
import com.learning_management_system.util.TemplateUtil;
import com.learning_management_system.util.TemplateWildcards;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;
import com.amazonaws.services.kms.model.NotFoundException;




@Service
@RequiredArgsConstructor
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;

    private final TemplateUtil templateUtil;

    private final StudentRepository studentRepository;

    private final ProfessorRepository professorRepository;

    public void sendSimpleEmail(SendEmailDTO sendEmailDTO) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(sendEmailDTO.getTo());
        message.setSubject(sendEmailDTO.getSubject());
        message.setText(sendEmailDTO.getBody());

        mailSender.send(message);
    }

    public void sendWelcomeEmailToStudent(Long studentId) throws MessagingException, IOException {

        Student student =studentRepository.findById(studentId).orElseThrow(()->new NotFoundException("student Not Found with this id : "+studentId));
        Map<String, String> variables = replaceStudentFields(student);

        String subjectTemplate = "Create student ";
        String bodyTemplatePath = "src/main/resources/templates/studentWelcomeEmailTemplate.html";
        String bodyTemplate = new String(Files.readAllBytes(Paths.get(bodyTemplatePath)), StandardCharsets.UTF_8);

        ReplacedWildCardsDTO replacedWildCardsDTO = templateUtil.getReplacedWildCards(variables, subjectTemplate, bodyTemplate);

        // Create and send the email
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo(student.getEmail());
        helper.setSubject(replacedWildCardsDTO.getSubject());
        helper.setText(replacedWildCardsDTO.getBody(), true);


        mailSender.send(message);
    }

    private static Map<String, String> replaceStudentFields(Student student) {
        Map<String, String> variables = new HashMap<>();

        variables.put(TemplateWildcards.STUDENT_FIRST_NAME, student.getFirstName());
        variables.put(TemplateWildcards.STUDENT_LAST_NAME, student.getFirstName());
        variables.put(TemplateWildcards.STUDENT_EMAIL, student.getEmail());
        variables.put(TemplateWildcards.STUDENT_ID, student.getStudentId().toString());
        if(student.getGroup()!=null) {
            variables.put(TemplateWildcards.GROUP_NAME, student.getGroup().getName());
        }
        if(student.getBirthDate()!=null){
            variables.put(TemplateWildcards.STUDENT_BIRTH_DATE, student.getBirthDate().toString());

        }
        variables.put(TemplateWildcards.STUDENT_PHONE_NUMBER, student.getPhoneNumber());

        return variables;
    }




    public void sendWelcomeEmailToProfessor(Long professorId) throws MessagingException, IOException {

        Professor professor =professorRepository.findById(professorId).orElseThrow(()->new NotFoundException("professor Not Found with this id : "+professorId));
        Map<String, String> variables = replaceprofessorFields(professor);

        String subjectTemplate = "Create professor ";
        String bodyTemplatePath = "src/main/resources/templates/professorWelcomeEmailTemplate.html";
        String bodyTemplate = new String(Files.readAllBytes(Paths.get(bodyTemplatePath)), StandardCharsets.UTF_8);

        ReplacedWildCardsDTO replacedWildCardsDTO = templateUtil.getReplacedWildCards(variables, subjectTemplate, bodyTemplate);

        // Create and send the email
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo(professor.getEmail());
        helper.setSubject(replacedWildCardsDTO.getSubject());
        helper.setText(replacedWildCardsDTO.getBody(), true);


        mailSender.send(message);
    }

    public void sendAssignToGroupEmailToStudent(Long studentId) throws MessagingException, IOException {

        Student student =studentRepository.findById(studentId).orElseThrow(()->new NotFoundException("student Not Found with this id : "+studentId));
        Map<String, String> variables = replaceStudentFields(student);

        String subjectTemplate = "Konfirmimi i Zgjedhjes së Grupit";
        String bodyTemplatePath = "src/main/resources/templates/studentAssignToGroup.html";
        String bodyTemplate = new String(Files.readAllBytes(Paths.get(bodyTemplatePath)), StandardCharsets.UTF_8);

        ReplacedWildCardsDTO replacedWildCardsDTO = templateUtil.getReplacedWildCards(variables, subjectTemplate, bodyTemplate);

        // Create and send the email
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo(student.getEmail());
        helper.setSubject(replacedWildCardsDTO.getSubject());
        helper.setText(replacedWildCardsDTO.getBody(), true);


        mailSender.send(message);
    }

    private static Map<String, String> replaceprofessorFields(Professor professor) {
        Map<String, String> variables = new HashMap<>();

        variables.put(TemplateWildcards.PROFESSOR_FIRST_NAME, professor.getFirstName());
        variables.put(TemplateWildcards.PROFESSOR_LAST_NAME, professor.getLastName());
        variables.put(TemplateWildcards.PROFESSOR_EMAIL, professor.getEmail());
        variables.put(TemplateWildcards.PROFESSOR_ID, professor.getId().toString());
        if(professor.getBirthDate()!=null){
            variables.put(TemplateWildcards.PROFESSOR_BIRTH_DATE, professor.getBirthDate().toString());

        }
        variables.put(TemplateWildcards.PROFESSOR_PHONE_NUMBER, professor.getPhoneNumber());

        return variables;
    }
    public Map<String, String> replaceUserFields(Object user) {
        Map<String, String> variables = new HashMap<>();

        if (user instanceof Student) {
            Student student = (Student) user;
            variables.put(TemplateWildcards.USER_FIRST_NAME, student.getFirstName());
            variables.put(TemplateWildcards.USER_LAST_NAME, student.getLastName());
            variables.put(TemplateWildcards.USER_EMAIL, student.getEmail());
            variables.put(TemplateWildcards.USER_ID, student.getId().toString());
            // Add any student-specific fields if needed

        } else if (user instanceof Professor) {
            Professor professor = (Professor) user;
            variables.put(TemplateWildcards.USER_FIRST_NAME, professor.getFirstName());
            variables.put(TemplateWildcards.USER_LAST_NAME, professor.getLastName());
            variables.put(TemplateWildcards.USER_EMAIL, professor.getEmail());
            variables.put(TemplateWildcards.USER_ID, professor.getId().toString());
            // Add any professor-specific fields if needed
        }

        // Add common fields for password reset
        variables.put(TemplateWildcards.REQUEST_TIME, LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));

        return variables;
    }



    public void sendGradeExamEmailToStudent(Long studentId, Exam exam, Double grade) throws MessagingException, IOException {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new NotFoundException("Student not found with this id: " + studentId));

        Map<String, String> variables = replaceGradeExamFields(student, exam, grade);

        String subjectTemplate = "Vendosja e notës";
        String bodyTemplatePath = "src/main/resources/templates/gradeStudentTemplate.html";
        String bodyTemplate = new String(Files.readAllBytes(Paths.get(bodyTemplatePath)), StandardCharsets.UTF_8);

        ReplacedWildCardsDTO replacedWildCardsDTO = templateUtil.getReplacedWildCards(variables, subjectTemplate, bodyTemplate);

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo(student.getEmail());
        helper.setSubject(replacedWildCardsDTO.getSubject());
        helper.setText(replacedWildCardsDTO.getBody(), true);

        mailSender.send(message);
    }

    private static Map<String, String> replaceGradeExamFields(Student student, Exam exam, Double grade) {
        Map<String, String> variables = new HashMap<>();

        // Student
        variables.put(TemplateWildcards.STUDENT_FIRST_NAME, student.getFirstName());
        variables.put(TemplateWildcards.STUDENT_LAST_NAME, student.getLastName());
        variables.put(TemplateWildcards.STUDENT_EMAIL, student.getEmail());
        variables.put(TemplateWildcards.STUDENT_ID, student.getStudentId().toString());
        variables.put(TemplateWildcards.STUDENT_PHONE_NUMBER, student.getPhoneNumber());
        if (student.getGroup() != null) {
            variables.put(TemplateWildcards.GROUP_NAME, student.getGroup().getName());
        }

        // Professor
        Professor professor = exam.getProfessor(); // ose exam.getCourse().getProfessor() varësisht strukturës
        if (professor != null) {
            variables.put(TemplateWildcards.PROFESSOR_FIRST_NAME, professor.getFirstName());
            variables.put(TemplateWildcards.PROFESSOR_LAST_NAME, professor.getLastName());
            variables.put(TemplateWildcards.PROFESSOR_EMAIL, professor.getEmail());
        }

        // Course
        Course course = exam.getCourse();
        if (course != null) {
            variables.put(TemplateWildcards.COURSE_NAME, course.getName());
            //variables.put(TemplateWildcards.COURSE_CODE, course.getCode());
        }

        // Grade
        variables.put(TemplateWildcards.GRADE, String.valueOf(grade));

        return variables;
    }


}
