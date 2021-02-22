import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AddStudentInput } from './create-student.input';
import { StudentService } from './student.service';
import { StudentType } from './student.type';

@Resolver((of) => StudentType)
export class StudentResolver {
  constructor(private studentService: StudentService) {}

  @Query((returns) => StudentType)
  student(@Args('id') id: string) {
    return this.studentService.getStudentById(id);
  }

  @Query((returns) => [StudentType])
  students() {
    return this.studentService.getAllStudents();
  }

  @Mutation((returns) => StudentType)
  addStudent(@Args('addStudent') addStudent: AddStudentInput) {
    return this.studentService.createStudent(addStudent);
  }
}
