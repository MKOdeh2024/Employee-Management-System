# 🚀Employee Management System App

## Acknowledgements
- This project is a part of the [Gaza Sky Geeks ](https://gazaskygeeks.com/) Training program.
<p align="center">
<img src="https://gazaskygeeks.com/wp-content/uploads/2020/05/gsg-website-logo-colored-280-50.png" width="40%">
</p>

## Introduction
💻 This project is all about software for Employee management system. It helps to have a full-fledged control over a company's employees. It was build with Express js.


## Features 🎉
 - Set up : after the first run an admin - who is responsible for creating managers -  is created .
 - 📝Creating, displaying, updating and deleting managers, sections , section managers and employees' data.
 - 📝 Creating, displaying, updating ,deleting roles and permissions with the possibility of assigning roles and permissions to specific user.
 - 📝 Creating, displaying, updating and deleting advances, advertisements, leave permissions and  vacations.
 - 👥 User profiles: The managers, section managers and employees  will have their own personal profile that holds information about their data and they have the ability to modify them.
 - 🔒 User authentication: Users can log in and log out and also register as a new user.
 - 👀 User authorization: Based on roles and permissions given to the user can access data or do operations.
 - Desinging  middlewares to check the format of data sent by requests.

## Technical Analysis
💻 The application consists of the following components:
  - Models: The main models used in this application are the Advance, Advertisement, Employee, leavePermission,Name,Permission, Role, Section, SectionManager, User and Vacation models.
  - Routes: The app has the following routes:
     - GET / admin/get_employees
     - GET / admin/get_employees/:employeeId   [employeeId=1]
     - POST / employee/create_vacation  [Date=2022-05-4 04:33:12, suggestionDate = 2022-05-5, duration=3, reason=” arm surgery", documents=upload surgery report,  status=”wating” Em_name=”muhammad”]
     - POST / admin/create_advertisement [Title= vacation, Date= 2012-01- 27, Content=next weekend will be vacation]
     - DELETE / admin/delete_employees/:employeeId  [employeeId=1]
     - POST / admin/create_advance                  [Type = normal, suggestionDate= 2023-11-2, amount=500, status=waiting]
     - GET / sectionManager/get_section_requests
     - UPDATE / employee/change_password           [Current Password =MustafaPass,  New Password =PassMustafa  , ConfirmPass=PassMustafa]

## Back-end
- The back-end of the application is built using Express js (JS Framework)


## Requirements 🔧
Express 💻
mysql 🗄️
typeorm

## AWS


## License
This project is licensed under the MIT License.

## Conclusion
🎉 Software for employee management systems helps your organization improve workforce productivity and boost overall well-being by tracking and monitoring the daily working activities of every employee.

## Images
![1]()
![2]()

