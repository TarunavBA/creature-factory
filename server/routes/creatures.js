const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");

let creatures = [];

const getCreatures = () => {
  fs.readFile(
    path.resolve(__dirname, "../data/creatures.json"),
    (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      creatures = JSON.parse(data);
    }
  );
};

getCreatures();

const writeCreatures = (data) => {
  fs.writeFileSync(
    path.resolve(__dirname, "../data/creatures.json"),
    JSON.stringify(data)
  );
};

router.get("/", (req, res) => {
  res.json(creatures);
});

router.post("/", (req, res) => {
  const { name, head, body, legs, likes } = req.body;

  if (!name || !head || !body || !legs || likes.length < 1) {
    res.status(400).json({ error: "Missing creature data in request body." });
    return;
  }

  const newCreature = {
    id: uuid.v4(),
    name: name,
    head: head,
    body: body,
    legs: legs,
    likes: likes,
  };

  creatures.push(newCreature);
  writeCreatures(creatures);

  res.json(newCreature);
});

router.put("/:id/upvote", (req, res) => {
  const id = req.params.id;
  let likeCount;

  if (!creatures.some((creature) => creature.id === id)) {
    res.status(400).json({ error: "Creature ID not found." });
    return;
  }

  function addLike(likes) {
    let updatedLikes = likes + 1;
    return updatedLikes;
  }

  creatures = creatures.map((creature) => {
    let likes = creature.likes;

    if (id === creature.id) {
      likes = addLike(likes);
      likeCount = likes;
    }
    return {
      ...creature,
      likes: likes,
    };
  });
  writeCreatures(creatures);

  res.json(likeCount);
});

router.put("/:id/downvote", (req, res) => {
  const id = req.params.id;
  let likeCount;

  if (!creatures.some((creature) => creature.id === id)) {
    res.status(400).json({ error: "Creature ID not found." });
    return;
  }

  function addLike(likes) {
    let updatedLikes = likes - 1;
    return updatedLikes;
  }

  creatures = creatures.map((creature) => {
    let likes = creature.likes;

    if (id === creature.id) {
      likes = addLike(likes);
      likeCount = likes;
    }
    return {
      ...creature,
      likes: likes,
    };
  });

  writeCreatures(creatures);
  res.json(likeCount);
});

module.exports = router;
