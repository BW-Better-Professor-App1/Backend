const router = require("express").Router();

const projects = require("./project-model");

const { validateProjectBody } = require("../auth/validate_middleware");
module.exports = router;

router.get("/", (req, res) => {
  projects
    .getLiterallyAll()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(({ name, code, message, stack }) => {
      res.status(500).json({ name, code, message, stack });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  projects
    .findBy(id)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(({ name, code, message, stack }) => {
      res.status(500).json({ name, code, message, stack });
    });
});

router.post("/", (req, res) => {
  const body = req.body;

  projects
    .addProject(body)
    .then(newProject => {
      res.status(201).json(newProject);
    })
    .catch(({ name, code, message, stack }) => {
      res.status(500).json({ name, code, message, stack });
    });
});

router.put("/:id", validateProjectBody, (req, res) => {
  const { id } = req.params;
  const body = req.body;

  projects
    .update(body, id)
    .then(updatedProject => {
      res.status(200).json({ updatedProject });
    })
    .catch(({ name, code, message, stack }) => {
      res.status(500).json({ name, code, message, stack });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  projects
    .remove(id)
    .then(deleted => {
      res
        .status(201)
        .json({ message: `succesfuly deleted ${deleted} project` });
    })
    .catch(({ name, code, message, stack }) => {
      res.status(500).json({ name, code, message, stack });
    });
});
