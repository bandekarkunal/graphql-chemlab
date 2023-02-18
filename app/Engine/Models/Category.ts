import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../Loaders/database';

interface categoryAttributes {
    id?: bigint;
    name?: string;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
}

interface categoryCreationAttributes extends Optional<categoryAttributes, "id"> { }

export class Category extends Model<categoryAttributes, categoryCreationAttributes> implements categoryAttributes {
    public id?: bigint;
    public name?: string;

    public deleted_at?: Date;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

Category.init(
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
        tableName: "categories",
        sequelize: sequelize,
        paranoid: true
    }
)
