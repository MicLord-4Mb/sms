import {UniversityManager} from "./core/services/univer_man.ts";
import type {ICourseDTO, IStudentDTO} from "./core/dto/dto.ts";
import {LocalStorage} from "./core/repositories/local-storage.ts";

export class App {
  private universityManager!: UniversityManager;
  private appContainer!: HTMLElement;

  async init(containerId: string): Promise<void> {
    if (!containerId) {
      throw new Error("App container Id is missing.");
    }

    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error(`DOM Element with id "${containerId}" not found.`);
    }

    this.appContainer = container;

    try {
      console.log('Initializing University Management System...');

      const studentRepo = new LocalStorage<IStudentDTO>('sms_students');
      const courseRepo = new LocalStorage<ICourseDTO>('sms_courses');

      this.universityManager = new UniversityManager(studentRepo, courseRepo);

      console.log('System initialized successfully. Data loaded.');

      this.renderUI();

    } catch (error) {
      console.error('Failed to initialize the application:', error);
      this.appContainer.innerHTML = `<div class="alert alert-danger">Critical Application Error: ${error}</div>`;
    }
  }

  private renderUI(): void {
    // TODO: use import MyUI from './ui/core/my_ui.js';
    this.appContainer.innerHTML = '<h1>Student DB run successfully!</h1>';


  }
}
