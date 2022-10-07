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

Actor.associate = function(models) {
    Actor.belongsToMany(models.Movie,{
        as: 'movies',
        through: 'actor_movie',
        foreingKey: 'actor_id',
        otherKey: 'movie_id',
        timestamps: false
    })
}

    return Actor
}