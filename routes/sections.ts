import express from 'express';
import { authenticate } from '../middlewares/auth/authenticate.js';
import { authorize } from '../middlewares/auth/authorize.js';
import { deleteSection, getSection, getSections, insertSection, updateSection } from '../controllers/section.js';
import { createSectionValidator, deleteSectionValidator, getSectionValidator, updateSectionValidator } from '../middlewares/validation/section.js';

var router = express.Router();

// Route for creating a new section
router.post('/', createSectionValidator, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  insertSection(req.body).then((data) => {
    res.send(data);
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
});

// Route for retrieving a specific section
router.get('/section', getSectionValidator, (req: express.Request, res: express.Response, next: express.NextFunction) => {
getSection(req.body.name).then((data) => {
  if (data === 1) {
    res.send("section not found!");
  } else if (data === 0) {
    res.send("something went wrong");
  } else {
    res.send(data);
  }
}).catch(err => {
  console.log("here");
  console.error(err);
  res.status(500).send(err);
});
});

// Route for retrieving all sections
router.get('/sections', (req: express.Request, res: express.Response, next: express.NextFunction) => {
getSections().then((data) => {
  if (data === 1) {
    res.send("there is no sections");
  } else if (data === 0) {
    res.send("something went wrong");
  } else {
    res.send(data);
  }
}).catch(err => {
  console.error(err);
  res.status(500).send(err);
});
});

// Route for deleting a section
router.delete('/', deleteSectionValidator, (req: express.Request, res: express.Response, next: express.NextFunction) => {
deleteSection(req.body.id).then((data) => {
  if (data === 2) {
    res.send("can't delete section because it has employees");
  } else if (data === 1) {
    res.send("section not found");
  } else {
    res.json({ data: data, message: "section deleted" });
  }
}).catch(err => {
  console.error(err);
  res.status(500).send(err);
});
});

// Route for updating a section
router.put('/', updateSectionValidator, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
updateSection(req.body).then((data) => {
  if (data === 2) {
    res.send("something went wrong, when updating section");
  } else if (data === 1) {
    res.send("section not found");
  } else if (data) {
    res.send(data);
  } else {
    res.send("something went wrong");
  }
}).catch(err => {
  console.error(err);
  res.status(500).send(err);
});
});








export default router;
