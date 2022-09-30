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
        timetamps : false,
        underscored : true
    }

const Genre = sequelize.define(alias, cols, config);

Genre.associate = function(models) {
    Genre.hasMany(models.Movie,{
       as: 'movies',
       foreignKey : 'genre_id'
   })
}

return Genre
}