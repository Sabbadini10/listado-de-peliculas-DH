module.exports = (sequelize, DataTypes) => {
    const alias = "Actor";
    const cols = {
        id : {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey : true,
            allowNull : false,
            autoIncrement : true
        },
        first_name : {
            type: DataTypes.STRING(100),
            allowNull : false
        },
        last_name : {
            type: DataTypes.STRING(100),
            allowNull : false
        },
        rating : {
            type: DataTypes.DECIMAL(3,1).UNSIGNED,
            allowNull : false
        },
        favorite_movie_id : {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull : true,
            defaultValue : null 
        }
    }
    const config = {
        tableName: 'actors',
        timetamps : true,
        underscored : true
    }

const Actor = sequelize.define(alias, cols, config)

    return Actor
}