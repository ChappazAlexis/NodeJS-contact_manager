const express = require("express");
const router = express.Router();
const Contact = require("../../models/contact");

// route pour récupérer la liste des contacts
router.route("/")
    .get((req, res) => {
        Contact.find()
            .then((data) => res.status(200).json(data))
            .catch((error) => res.status(400).json(error))
    });


    // récupère un contact suivant sont id
router.route("/:id")
.get((req, res) => {
    Contact.findOne({_id: req.params.id})
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(400).json(err));
});


    // ajouter un contact
router.route("/")
.post((req, res) => {
    let contact = new Contact(req.body);
    contact.save()
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(400).json(err));
});


// met à jour un contact suivant l'id spécifié dans l'url
router.route("/:id")
    .put((req, res) => {
        Contact.updateOne({_id: req.params.id}, req.body)
            .then((data) => res.status(200).json(data))
            .catch((err) => res.status(400).json(err));
    });

// supprime un contact suivant l'id spécifié dans l'url
router.route("/:id")
    .delete((req, res) => {

        // supprime en bdd le contact suivant sont id
        Contact.deleteOne({_id: req.params.id})
            .then((data) => res.status(200).json(data))
            .catch((err) => res.status(400).json(err));
    });


module.exports = router;