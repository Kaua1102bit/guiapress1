const express = require("express");
const router = express.Router();
const Article = require("./Articles");
const Category = require("../categories/Category");
const slugify = require("slugify");

// Rota para listar artigos
router.get("/admin/articles", (req, res) => {
    Article.findAll({
        include: [{ model: Category }]
    }).then(articles => {
        res.render("admin/articles/index", { articles });
    }).catch(err => {
        console.error("Erro ao buscar artigos:", err);
        res.redirect("/");
    });
});

// Rota para formulário de novo artigo
router.get("/admin/articles/new", (req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/articles/new", { categories });
    }).catch(err => {
        console.error("Erro ao buscar categorias:", err);
        res.redirect("/admin/articles");
    });
});

// Rota para salvar artigo
router.post("/articles/save", (req, res) => {
    const { title, body, category } = req.body;

    if (title && body && category) {
        Article.create({
            title: title,
            slug: slugify(title),
            body: body,
            categoryId: category
        }).then(() => {
            res.redirect("/admin/articles");
        }).catch(err => {
            console.error("Erro ao salvar artigo:", err);
            res.redirect("/admin/articles/new");
        });
    } else {
        res.redirect("/admin/articles/new");
    }
});

module.exports = router;