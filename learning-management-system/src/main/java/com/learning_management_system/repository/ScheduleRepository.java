package com.learning_management_system.repository;


import com.learning_management_system.data.schedule.ScheduleDTO;
import org.springframework.data.jpa.repository.JpaRepository;

import com.learning_management_system.model.Schedule;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ScheduleRepository extends JpaRepository<Schedule,Long>{
    @Query("""
    SELECT new com.learning_management_system.data.schedule.ScheduleDTO(
        CAST(s.dayOfWeek AS string),
        s.startTime,
        s.endTime,
        c.name,
        CONCAT(p.firstName, ' ', p.lastName),
        s.room
    )
    FROM Schedule s
    JOIN s.groupSemester gs
    JOIN gs.group g
    JOIN gs.semester sem
    JOIN s.course c
    JOIN s.professor p
    WHERE g.id = :groupId AND sem.id = :semesterId
    ORDER BY 
        CASE 
            WHEN s.dayOfWeek = 'MONDAY' THEN 1
            WHEN s.dayOfWeek = 'TUESDAY' THEN 2
            WHEN s.dayOfWeek = 'WEDNESDAY' THEN 3
            WHEN s.dayOfWeek = 'THURSDAY' THEN 4
            WHEN s.dayOfWeek = 'FRIDAY' THEN 5
            WHEN s.dayOfWeek = 'SATURDAY' THEN 6
            WHEN s.dayOfWeek = 'SUNDAY' THEN 7
        END,
        s.startTime
""")
    List<ScheduleDTO> findScheduleForGroupAndSemester(@Param("groupId") Long groupId, @Param("semesterId") Long semesterId);


}
