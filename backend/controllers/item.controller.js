const Item = require('../models/item.model');

exports.getItems = (req, res) => {
    Item.find()
        .then((items) => {
            res.json(items);
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
};

exports.getItemById = (req, res) => {
    Item.findById(req.params.id)
        .then((item) => {
            if (!item) {
                return res.status(404).json({ message: 'Elemento no encontrado' });
            }
            res.json(item);
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
};

exports.createItem = (req, res) => {
    const newItem = new Item({
        name: req.body.name,
        description: req.body.description,
    });
    newItem.save()
        .then((item) => {
            res.status(201).json(item);
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
};

exports.updateItem = (req, res) => {
    Item.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((item) => {
            if (!item) {
                return res.status(404).json({ message: 'Elemento no encontrado' });
            }
            res.json(item);
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
};

exports.deleteItem = (req, res) => {
    Item.findByIdAndDelete(req.params.id)
        .then((item) => {
            if (!item) {
                return res.status(404).json({ message: 'Elemento no encontrado' });
            }
            res.json({ message: 'Elemento eliminado correctamente' });
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });

};