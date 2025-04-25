const express = require("express");
const router = express.Router();
const Category = require("../categories/Category");
const slugify = require("slugify");

// Rota para listar categorias
router.get("/admin/categories", (req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/categories/index", { categories });
    }).catch(err => {
        console.error("Erro ao buscar categorias:", err);
        res.redirect("/");
    });
});

// Rota para formulário de nova categoria
router.get("/admin/categories/new", (req, res) => {
    res.render("admin/categories/new");
});

// Rota para salvar categoria
router.post("/categories/save", (req, res) => {
    const title = req.body.title;

    if (title != undefined && title.trim() !== "") {
        Category.create({
            title: title,
            slug: slugify(title)
        }).then(() => {
            res.redirect("/admin/categories");
        }).catch(err => {
            console.error("Erro ao salvar categoria:", err);
            res.redirect("/admin/categories/new");
        });
    } else {
        res.redirect("/admin/categories/new");
    }
});

// Rota para deletar categoria
router.post("/categories/delete", (req, res) => {
    const id = req.body.id;

    if (id != undefined && !isNaN(id)) {
        Category.destroy({
            where: { id: id }
        }).then(() => {
            res.redirect("/admin/categories");
        }).catch(err => {
            console.error("Erro ao deletar categoria:", err);
            res.redirect("/admin/categories");
        });
    } else {
        res.redirect("/admin/categories");
    }
});

module.exports = router;