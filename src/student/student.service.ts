import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { AddStudentInput } from './create-student.input';
import { Student } from './student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}

  async getStudentById(id: string): Promise<Student> {
    return this.studentRepository.findOneOrFail({ id });
  }

  async getAllStudents(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  async createStudent(addStudent: AddStudentInput): Promise<Student> {
    const { firstName, lastName } = addStudent;
    const student = this.studentRepository.create({
      id: uuid(),
      firstName,
      lastName,
    });

    return this.studentRepository.save(student);
  }

  async getManyStudents(studentIds: string[]): Promise<Student[]> {
    return this.studentRepository.find({
      where: {
        id: {
          $in: studentIds || [], // TODO: Fix this DB migration should fix this.
        },
      },
    });
  }
}
