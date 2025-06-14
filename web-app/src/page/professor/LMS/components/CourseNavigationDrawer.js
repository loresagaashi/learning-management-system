import React from 'react';
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Box
} from '@mui/material';

export default function CourseNavigationDrawer({ 
  open, 
  onClose, 
  courses, 
  courseId,
  navigate
}) {
  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
    >
      <List>
        {courses.map((course) => (
          <ListItem
            button
            key={course.id}
            onClick={() => {
              navigate(`/professor/lms/course/${course.id}`);
              onClose();
            }}
            selected={courseId === course.id}
          >
            <ListItemIcon>
            </ListItemIcon>
            <ListItemText primary={course.name} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
