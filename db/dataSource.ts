import { DataSource } from "typeorm";
import { Employee } from "./entities/Employee.js";
import { Role } from "./entities/Role.js";
import { Permission } from "./entities/Permission.js";
import { Advance } from "./entities/Advance.js";
import { LeavePermission } from "./entities/LeavePermission.js";
import { Advertisement } from "./entities/Advertisement.js";
import { Section } from "./entities/Section.js";
import { Vacation } from "./entities/Vacation.js";
import { ManagerProfile } from "./entities/ManagerProfile.js";
import { SectionManagerProfile } from "./entities/SectionManagerProfile.js";
import { AdminProfile } from "./entities/AdminProfile.js";
import { Complaint } from "./entities/Complaint.js";

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER_NAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [
    Section,
    Employee,
    Role,
    Permission,
    Advance,
    LeavePermission,
    Advertisement,
    Vacation,
    ManagerProfile,
    SectionManagerProfile,
    AdminProfile,
    Complaint
  ],
  migrations: ['./**/migration/*.ts'],
  synchronize: true,
  
});

dataSource.initialize().then(() => {
  console.log("Connected to DB!");
}).catch(err => {
  console.error('Failed to connect to DB: ' + err);
});

export default dataSource;