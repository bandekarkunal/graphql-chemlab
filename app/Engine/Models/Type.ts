import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../Loaders/database';

interface typeAttributes {
    id?: bigint;
    name?: string;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
}

interface typeCreationAttributes extends Optional<typeAttributes, "id"> { }

export class Type extends Model<typeAttributes, typeCreationAttributes> implements typeAttributes {
    public id?: bigint;
    public name?: string;

    public deleted_at?: Date;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

Type.init(
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT
        },

        name: {
            allowNull: false,
            type: DataTypes.STRING
        },

        deleted_at: {
            allowNull: true,
            type: DataTypes.DATE
        }

    },
    {
        defaultScope: {},
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        tableName: "types",
        sequelize: sequelize,
        paranoid: true
    }
)
