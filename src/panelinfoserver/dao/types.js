
const {Sequelize, Model, DataTypes} = require("sequelize");


const sequelize = new Sequelize('mysql://localhost:3306', {username: "root", password: "root"});

const Panel = sequelize.define("Panel", {
    id: DataTypes.STRING
});

const Capturer = sequelize.define("Capturer", {
    id: DataTypes.STRING
});


const User = sequelize.define("User", {
    id: DataTypes.STRING,
    password: DataTypes.STRING
});

const Node = sequelize.define("Node", {
    id: DataTypes.STRING,
    type: DataTypes.STRING,
    dependencyId: DataTypes.STRING,
    deliversToNodes: {
        type: Sequelize.STRING,
        references: "Node",
        referencesKey: "id"
    }
});

Node.hasMany(Node);


