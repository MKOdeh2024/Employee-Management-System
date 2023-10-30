import './config.js';
import createError from 'http-errors';
import express from 'express';
import cors from 'cors';
import employeesRouter from './routes/employees.js';
import permissionsRouter from './routes/permissions.js';
import rolesRouter from './routes/roles.js';
import sectionsRouter from './routes/sections.js';
import advancesRouter from './routes/advances.js';
import vacationsRouter from './routes/vacations.js';
import advertisementsRouter from './routes/advertisement.js';
import leavePermissionsRouter from './routes/leavePermission.js';
import authRouter from './routes/auth.js'
import adminRouter from './routes/admin.js'
import {setUp} from './middlewares/setup/setup.js'



import './db/dataSource.js';
import { authenticate } from './middlewares/auth/authenticate.js';


var app = express();

const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: "http://localhost:3000"
}));



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/employees', employeesRouter);
app.use('/vacations', vacationsRouter);
app.use('/advances', advancesRouter);
app.use('/sections', sectionsRouter);
app.use('/permissions', permissionsRouter);
app.use('/advertisements', advertisementsRouter);
app.use('/leavePermissions', leavePermissionsRouter);
app.use('/roles', rolesRouter);
app.use('/auth',authRouter );
app.use('/admin',adminRouter );

app.use('*', (req, res, next) => {
  res.status(400).send(`Can't find this route: ${req.originalUrl}`);
});


app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});

export default app;
