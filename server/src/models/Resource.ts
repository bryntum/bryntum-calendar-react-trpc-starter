import { DataTypes } from 'sequelize';
import sequelize from '../config/database';

const Resource = sequelize.define(
    'Resource',
    {
        id : {
            type          : DataTypes.INTEGER,
            primaryKey    : true,
            autoIncrement : true
        },
        name : {
            type      : DataTypes.STRING,
            allowNull : false
        },
        eventColor : {
            type         : DataTypes.STRING,
            defaultValue : null
        },
        readOnly : {
            type         : DataTypes.BOOLEAN,
            defaultValue : false
        }
    },
    {
        tableName  : 'resources',
        timestamps : false
    }
);

export default Resource;
