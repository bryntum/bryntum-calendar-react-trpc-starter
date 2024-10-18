import { Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';
import sequelize from '../config/database';
import { ResourceSchemaType } from '../types';

// order of InferAttributes & InferCreationAttributes is important
interface ResourceModel extends Model<InferAttributes<ResourceModel>, InferCreationAttributes<ResourceModel, { omit: 'id' }>>, ResourceSchemaType  {}

const Resource = sequelize.define<ResourceModel>(
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
