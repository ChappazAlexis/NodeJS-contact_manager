const express = require("express");
const router = express.Router();
const Contact = require("../models/contact");

// récupère la liste des contacts
router.route("/")
    .get((req, res) => {
        // récupère la liste des taches
        Contact.find()
            .then((data) => {
                res.render("home", {
                    contacts: data
                });
            })
            .catch((erreur) => console.log(error))
    });

// create contact
router.route("/contact/new")
    .get((req, res) => {
        res.render("add-item", {
            errors: ""
        });
    })
    .post((req, res) => {
        let lastName = req.body.lastName;
        let firstName = req.body.firstName;
        let company = req.body.company;
        let address = req.body.address;
        let phone = req.body.phone;
        let email = req.body.email;
        let sector = req.body.sector;

        let erreur = "";

        if (lastName == "" || firstName == "" || company == "" || address == "" || phone == "" || email == "" || sector == "") {
            erreur = "Ces champs ne peuvent pas être vide : "

            if (lastName == "") {
                erreur += 'Nom '
            }
            if (firstName == "") {
                erreur += 'Prénom '
            }
            if (company == "") {
                erreur += 'Société '
            }
            if (address == "") {
                erreur += 'Adresse '
            }
            if (phone == "") {
                erreur += 'Telephone '
            }
            if (email == "") {
                erreur += 'Mail '
            }
            if (sector == "") {
                erreur += 'Secteur '
            }
            res.render("add-item", {
                erreurs: erreur
            })
        } else {
            let contact = new Contact(req.body);
            contact.dateNew = new Date()
            contact.save()
                .then((data) => res.status(200), res.redirect("/"))
                .catch((err) => res.status(404))
        }
    });

//read
router.route("/contact/:id")
    .get((req, res) => {
        Contact.findOne({ _id: req.params.id })
            .then((data) => {
                res.status(200), res.render("item", {
                    contact: data,
                })
            })
            .catch((error) => res.status(400))
    })

//update
router.route("/contact/edit/:id")
    .get((req, res) => {
        Contact.findOne({ _id: req.params.id })
            .then((data) => {
                res.status(200),
                    res.render("edit-item", {
                        contact: data,
                    })
            })
            .catch((error) => res.status(400))
    })

    .post((req, res) => {
        let lastName = req.body.lastName;
        let firstName = req.body.firstName;
        let company = req.body.company;
        let address = req.body.address;
        let phone = req.body.phone;
        let email = req.body.email;
        let sector = req.body.sector;

        let erreur = "";

        if (lastName == "" || firstName == "" || company == "" || address == "" || phone == "" || email == "" || sector == "") {
            erreur = "Ces champs ne peuvent pas être vide : "

            if (lastName == "") {
                erreur += 'Nom '
            }
            if (firstName == "") {
                erreur += 'Prénom '
            }
            if (company == "") {
                erreur += 'Société '
            }
            if (address == "") {
                erreur += 'Adresse '
            }
            if (phone == "") {
                erreur += 'Telephone '
            }
            if (email == "") {
                erreur += 'Mail '
            }
            if (sector == "") {
                erreur += 'Secteur '
            }
            res.render("add-item", {
                erreurs: erreur
            })
        } else {
            let contact = new Contact(req.body);

            contact.save()
                .then((data) => res.status(200), res.redirect("/"))
                .catch((err) => res.status(404))
        }
    });


//delete 
router.route('/contact/delete/:id')
    .get((req, res) => {
        Contact.deleteOne({ _id: req.params.id })
            .then((data) => res.redirect("/"))
            .catch((error) => console.log(error));
    });


// export des routes contenu dans le router
module.exports = router;