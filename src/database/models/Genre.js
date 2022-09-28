module.exports = (sequelize, DataTypes) => {
    const alias = "Genre";
    const cols = {
        id : {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey : true,
            allowNull : false,
            autoIncrement : true
        },
        name : {
            type: DataTypes.STRING(100),
            allowNull : false
        },
        ranking : {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull : false,
            unique : true
        },
        active : {
            type: DataTypes.BOOLEAN,
            allowNull : false,
            defaultValue: 1
        }
    }
    const config = {
        tableName: 'genres',
        timetamps : true,
        underscored : true
    }

const Genre = sequelize.define(alias, cols, config)

    return Genre
}